/** Real Estate in Berlin — long screenshot preview. */

const REB_LONG = "/img/reb/reb_long.png";

function RebLongImage({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        background: "#e8ddd6",
        overflow: "hidden",
      }}
    >
      <img
        src={REB_LONG}
        alt="Real Estate in Berlin website screenshot"
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          minHeight: mobile ? "100%" : undefined,
          objectFit: "cover",
          objectPosition: "top center",
          userSelect: "none",
        }}
      />
    </div>
  );
}

export function RebDesktop() {
  return <RebLongImage />;
}

export function RebMobile() {
  return <RebLongImage mobile />;
}
