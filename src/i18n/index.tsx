import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANGUAGES, type Language } from "../data/content";
import de from "./de.json";
import en from "./en.json";
import es from "./es.json";

export type Messages = typeof de;

const MESSAGES: Record<Language, Messages> = { de, en, es };
const DEFAULT_LANGUAGE: Language = "de";

type I18nContextValue = {
  lang: Language;
  t: Messages;
  setLanguage: (language: Language) => void;
  localizeHref: (href: string) => string;
  currentPath: string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function normalizePath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const maybeLang = parts[0]?.toLowerCase();
  const hasLang = LANGUAGES.includes(maybeLang as Language);
  return {
    lang: hasLang ? (maybeLang as Language) : null,
    path: `/${(hasLang ? parts.slice(1) : parts).join("/")}`.replace(/\/$/, "") || "/",
  };
}

function detectLanguage(): Language {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const code = candidate.toLowerCase().split("-")[0];
    if (LANGUAGES.includes(code as Language)) return code as Language;
  }
  return DEFAULT_LANGUAGE;
}

function withLanguage(path: string, lang: Language) {
  const cleanPath = path === "/" ? "" : path.replace(/\/$/, "");
  return `/${lang}${cleanPath}`;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => {
    const parsed = normalizePath(window.location.pathname);
    return parsed.lang ?? detectLanguage();
  }, []);
  const [lang, setLang] = useState<Language>(initial);
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname).path);

  const syncUrl = useCallback((nextLang: Language, mode: "push" | "replace" = "push") => {
    const parsed = normalizePath(window.location.pathname);
    const path = parsed.path;
    const nextUrl = `${withLanguage(path, nextLang)}${window.location.search}${window.location.hash}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` === nextUrl) return;
    window.history[mode === "replace" ? "replaceState" : "pushState"](null, "", nextUrl);
    setCurrentPath(path);
  }, []);

  useEffect(() => {
    const parsed = normalizePath(window.location.pathname);
    if (!parsed.lang) {
      syncUrl(lang, "replace");
      return;
    }
    setLang(parsed.lang);
    setCurrentPath(parsed.path);
    document.documentElement.lang = parsed.lang;
  }, [lang, syncUrl]);

  useEffect(() => {
    const onPopState = () => {
      const parsed = normalizePath(window.location.pathname);
      const nextLang = parsed.lang ?? DEFAULT_LANGUAGE;
      setLang(nextLang);
      setCurrentPath(parsed.path);
      document.documentElement.lang = nextLang;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setLanguage = useCallback(
    (language: Language) => {
      setLang(language);
      document.documentElement.lang = language;
      syncUrl(language);
    },
    [syncUrl],
  );

  const localizeHref = useCallback(
    (href: string) => {
      if (href.startsWith("#")) return `/${lang}${href}`;
      if (href.startsWith("/")) return withLanguage(normalizePath(href).path, lang);
      return href;
    },
    [lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      t: MESSAGES[lang] ?? MESSAGES[DEFAULT_LANGUAGE],
      setLanguage,
      localizeHref,
      currentPath,
    }),
    [currentPath, lang, localizeHref, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function getRoutePath(pathname: string) {
  return normalizePath(pathname).path;
}
