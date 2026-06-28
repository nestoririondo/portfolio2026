import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./theme/useTheme";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ScrollHint } from "./components/ui/ScrollHint";
import { Hero } from "./components/sections/Hero";
import { Arbeiten } from "./components/sections/arbeiten/Arbeiten";
import { Software } from "./components/sections/software/Software";
import { Angebot } from "./components/sections/Angebot";
import { Ueber } from "./components/sections/Ueber";
import { Kontakt } from "./components/sections/Kontakt";
import { Legal } from "./components/sections/Legal";
import { getRoutePath } from "./i18n";

export default function App() {
  const { state } = useTheme();
  useReveal();
  const pathname = getRoutePath(window.location.pathname).replace(/\/$/, "") || "/";
  const legalPage =
    pathname === "/impressum"
      ? "impressum"
      : pathname === "/datenschutz"
        ? "datenschutz"
        : null;

  if (legalPage) {
    return (
      <>
        <Header />
        <main>
          <Legal page={legalPage} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero layout={state.heroLayout} />
        <Arbeiten />
        <Software />
        <Angebot />
        <Ueber />
        <Kontakt />
      </main>
      <ScrollHint />
      <Footer />
    </>
  );
}
