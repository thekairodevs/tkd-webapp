import React from "react";

type OrnamentProps = {
  x: number | string;
  y: number | string;
  w: number | string;
  h: number | string;
  children?: React.ReactNode;
  label?: string;
  corners?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const Ornament = ({
  x, y, w, h, children, label, corners = false, className = "", style = {},
}: OrnamentProps) => (
  <div
    className={`bp ${className}`}
    style={{ left: x, top: y, width: w, height: h, ...style }}
  >
    {corners && (
      <>
        <span className="bp__corner tl" />
        <span className="bp__corner tr" />
        <span className="bp__corner bl" />
        <span className="bp__corner br" />
      </>
    )}
    {children}
    {label && <span className="bp__label">{label}</span>}
  </div>
);

export const ModDial = ({
  x, y, size = 220, label = "MOD-01 / DIAL", parallax = 0,
}: {
  x: number | string; y: number | string; size?: number;
  label?: string; parallax?: number;
}) => (
  <Ornament
    x={x} y={y} w={size} h={size} label={label} corners
    style={{ "--p": parallax } as React.CSSProperties}
    className="bp-parallax"
  >
    <div style={{ position: "absolute", inset: 18, border: "1px solid var(--line-strong)" }} />
    <div style={{ position: "absolute", inset: 36, borderRadius: "50%", border: "1px solid var(--fg)" }} />
    <div style={{ position: "absolute", inset: "30%", borderRadius: "50%", background: "var(--fg)" }} />
    <div style={{
      position: "absolute", left: "50%", top: "50%", width: 6, height: 6,
      background: "var(--bg)", borderRadius: "50%", transform: "translate(-50%,-50%)",
    }} />
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: "50%", top: "50%",
        width: 1, height: size / 2 - 18,
        background: "var(--line-strong)",
        transformOrigin: "top center",
        transform: `translate(-50%, 0) rotate(${i * 30}deg) translateY(-${size / 2 - 30}px)`,
      }} />
    ))}
    <div style={{ position: "absolute", left: -10, top: "50%", width: 20, height: 14, transform: "translateY(-50%)", background: "var(--bg)", border: "1px solid var(--fg)" }} />
    <div style={{ position: "absolute", right: -10, top: "50%", width: 20, height: 14, transform: "translateY(-50%)", background: "var(--bg)", border: "1px solid var(--fg)" }} />
  </Ornament>
);

export const ModHalftone = ({
  x, y, w = 140, h = 90, label = "FIELD/A", parallax = 0,
}: {
  x: number | string; y: number | string; w?: number; h?: number;
  label?: string; parallax?: number;
}) => (
  <Ornament
    x={x} y={y} w={w} h={h} label={label}
    className="halftone bp-parallax"
    style={{ "--p": parallax } as React.CSSProperties}
  >
    <div style={{
      position: "absolute", left: 8, top: 8, padding: "2px 6px",
      background: "var(--bg)", border: "1px solid var(--line-strong)",
      fontFamily: "var(--mono)", fontSize: 9, letterSpacing: ".12em",
    }}>0.42</div>
  </Ornament>
);

export const ModStripes = ({
  x, y, w = 90, h = 130, label = "STRIPE-D", parallax = 0,
}: {
  x: number | string; y: number | string; w?: number; h?: number;
  label?: string; parallax?: number;
}) => (
  <Ornament
    x={x} y={y} w={w} h={h} label={label}
    className="stripes-d bp-parallax"
    style={{ "--p": parallax } as React.CSSProperties}
  >
    <div style={{ position: "absolute", inset: 10, background: "var(--bg)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 8 }}>
      <div className="mono" style={{ fontSize: 9, color: "var(--muted)" }}>S/01</div>
      <div className="mono" style={{ fontSize: 9, color: "var(--muted)" }}>0—9</div>
    </div>
  </Ornament>
);

export const ModGrid = ({
  x, y, w = 110, h = 110, label = "GRID-MX", parallax = 0,
}: {
  x: number | string; y: number | string; w?: number; h?: number;
  label?: string; parallax?: number;
}) => (
  <Ornament
    x={x} y={y} w={w} h={h} label={label}
    className="bp-parallax"
    style={{ "--p": parallax } as React.CSSProperties}
  >
    <div className="grid-mini" style={{ position: "absolute", inset: 12 }} />
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      transform: "translate(-50%,-50%)",
      width: 22, height: 22, background: "var(--fg)",
    }} />
  </Ornament>
);

export const ModRouter = ({
  x, y, w = 200, h = 70, label = "RTR / IO-08", parallax = 0,
}: {
  x: number | string; y: number | string; w?: number; h?: number;
  label?: string; parallax?: number;
}) => (
  <Ornament
    x={x} y={y} w={w} h={h} label={label}
    className="bp-parallax"
    style={{ "--p": parallax } as React.CSSProperties}
  >
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          flex: 1,
          borderRight: i < 7 ? "1px solid var(--line-strong)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 8, height: 8, background: i % 2 ? "var(--fg)" : "transparent", border: "1px solid var(--fg)", borderRadius: "50%" }} />
        </div>
      ))}
    </div>
  </Ornament>
);

export const ModBars = ({
  x, y, w = 80, h = 120, label = "EQ", parallax = 0,
}: {
  x: number | string; y: number | string; w?: number; h?: number;
  label?: string; parallax?: number;
}) => (
  <Ornament
    x={x} y={y} w={w} h={h} label={label}
    className="bp-parallax"
    style={{ "--p": parallax } as React.CSSProperties}
  >
    <div style={{ position: "absolute", inset: 10, display: "flex", alignItems: "flex-end", gap: 4 }}>
      {[0.3, 0.7, 0.45, 0.85, 0.55, 0.92, 0.4].map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${v * 100}%`,
          background: i % 3 === 0 ? "var(--fg)" : "transparent",
          border: "1px solid var(--fg)",
        }} />
      ))}
    </div>
  </Ornament>
);

export const ModDot = ({
  x, y, size = 60, ink = false, label, parallax = 0,
}: {
  x: number | string; y: number | string; size?: number;
  ink?: boolean; label?: string; parallax?: number;
}) => (
  <div
    className="bp-parallax"
    style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      border: "1px solid var(--fg)", borderRadius: "50%",
      background: ink ? "var(--fg)" : "var(--bg)",
      "--p": parallax,
    } as React.CSSProperties}
  >
    {label && <span className="bp__label" style={{ bottom: -22 }}>{label}</span>}
  </div>
);

export const ModBracket = ({
  x, y, w = 160, h = 40, label = "REF/01", parallax = 0,
}: {
  x: number | string; y: number | string; w?: number; h?: number;
  label?: string; parallax?: number;
}) => (
  <div
    className="bp-parallax"
    style={{ position: "absolute", left: x, top: y, width: w, height: h, "--p": parallax } as React.CSSProperties}
  >
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "var(--fg)" }} />
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 1, background: "var(--fg)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, height: 1, width: 8, background: "var(--fg)" }} />
    <div style={{ position: "absolute", left: 0, bottom: 0, height: 1, width: 8, background: "var(--fg)" }} />
    <div style={{ position: "absolute", right: 0, top: 0, height: 1, width: 8, background: "var(--fg)" }} />
    <div style={{ position: "absolute", right: 0, bottom: 0, height: 1, width: 8, background: "var(--fg)" }} />
    <div style={{
      position: "absolute", inset: "0 12px",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".14em",
      textTransform: "uppercase", color: "var(--muted)",
    }}>{label}</div>
  </div>
);

export const Connector = ({
  x, y, w = 80, h = 1, vertical = false,
}: {
  x: number | string; y: number | string; w?: number; h?: number; vertical?: boolean;
}) => (
  <div style={{
    position: "absolute", left: x, top: y,
    width: vertical ? 1 : w,
    height: vertical ? h : 1,
    background: "var(--line-strong)",
  }} />
);

export const HeroOrnaments = () => (
  <div className="bp-field" aria-hidden="true">
    {/* TOP BAND */}
    <ModBracket x={32} y={120} w={140} label="REF / DELTA-001" parallax={0.04} />
    <ModStripes x={200} y={88} w={70} h={88} label="LINE-S" parallax={0.06} />
    <ModHalftone x={296} y={104} w={130} h={70} label="GRAIN/A" parallax={0.05} />
    <ModRouter x={460} y={120} w={150} h={56} label="RTR / IO-06" parallax={0.03} />
    <ModGrid x={640} y={92} w={84} h={84} label="MX-04" parallax={0.07} />
    <div className="mono bp-parallax" style={{ position: "absolute", left: 760, top: 130, fontSize: 9, letterSpacing: ".18em", color: "var(--muted)", "--p": 0.02 } as React.CSSProperties}>
      Δ — 38.9072° N · 77.0369° W
    </div>
    <ModBars x="calc(100% - 360px)" y={92} w={70} h={88} label="EQ-07" parallax={0.05} />
    <ModDot x="calc(100% - 250px)" y={108} size={56} ink label="NODE/01" parallax={0.04} />
    <ModBracket x="calc(100% - 170px)" y={120} w={120} label="REV/04.26" parallax={0.06} />
    <Connector x={172} y={148} w={28} />
    <Connector x={426} y={148} w={34} />
    <Connector x={610} y={148} w={30} />

    {/* LEFT RAIL */}
    <ModDial x={-90} y="46%" size={200} label="MOD-Δ / DIAL" parallax={0.08} />
    <ModHalftone x={-30} y="72%" w={120} h={68} label="FIELD/A" parallax={0.06} />

    {/* RIGHT RAIL */}
    <ModGrid x="calc(100% - 130px)" y="40%" w={110} h={110} label="GRID-MX" parallax={0.09} />
    <ModRouter x="calc(100% - 190px)" y="58%" w={170} h={56} label="IO-08" parallax={0.05} />
    <ModStripes x="calc(100% - 110px)" y="68%" w={80} h={110} label="STRIPE-V" parallax={0.07} />
    <Connector x="calc(100% - 200px)" y="44%" w={70} />
    <div className="mono bp-parallax" style={{ position: "absolute", right: 24, top: "82%", fontSize: 9, letterSpacing: ".18em", color: "var(--muted)", "--p": 0.03 } as React.CSSProperties}>
      ED. III
    </div>

    {/* BOTTOM BAND */}
    <ModGrid x={32} y="calc(100% - 132px)" w={88} h={88} label="MX-04" parallax={0.04} />
    <ModRouter x={156} y="calc(100% - 116px)" w={170} h={52} label="IO-08" parallax={0.03} />
    <ModBracket x={356} y="calc(100% - 110px)" w={130} label="NODE/Δ-2" parallax={0.05} />
    <ModDot x={520} y="calc(100% - 124px)" size={48} ink label="●" parallax={0.06} />
    <ModHalftone x={596} y="calc(100% - 132px)" w={140} h={70} label="FIELD/B" parallax={0.05} />
    <ModBars x={770} y="calc(100% - 146px)" w={70} h={92} label="EQ" parallax={0.04} />
    <ModStripes x="calc(100% - 280px)" y="calc(100% - 144px)" w={80} h={92} label="LINE-V" parallax={0.06} />
    <ModRouter x="calc(100% - 180px)" y="calc(100% - 116px)" w={150} h={50} label="IO-06" parallax={0.03} />
    <div className="mono bp-parallax" style={{ position: "absolute", left: "46%", bottom: 56, fontSize: 9, letterSpacing: ".18em", color: "var(--muted)", "--p": 0.02 } as React.CSSProperties}>
      INDEX  /  001 — 042
    </div>
  </div>
);
