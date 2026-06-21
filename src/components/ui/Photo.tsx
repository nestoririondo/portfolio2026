import { useState, type CSSProperties } from "react";
import { Placeholder } from "./Placeholder";

interface PhotoProps {
  /** Public path to the image, e.g. "/img/portrait-hero.jpg". */
  src: string;
  alt: string;
  /** Shown on the striped fallback while the real photo is missing. */
  label: string;
  ratio?: string;
  round?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Real photo in a rounded frame, with a graceful fallback: until the file at
 * `src` exists (or if it fails to load) it renders the striped {@link Placeholder}
 * instead, so the page never breaks before the photos are dropped in.
 */
export function Photo({
  src,
  alt,
  label,
  ratio = "4 / 5",
  round = 22,
  style,
  className,
}: PhotoProps) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <Placeholder label={label} ratio={ratio} round={round} style={style} />
    );
  }
  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: ratio,
        width: "100%",
        borderRadius: round,
        overflow: "hidden",
        border: "1px solid var(--line)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}
