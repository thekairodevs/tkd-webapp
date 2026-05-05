import React from "react";
import Image from "next/image";
import { HeroOrnaments } from "./Ornaments";

export type Tweaks = {
  themeMode: string;
  fontPair: string;
  accentHue: number;
  ornaments: string;
  marquee: string;
  eyebrow: string;
  line1: string;
  line2: string;
  line3: string;
  sub: string;
  email: string;
  stripWords: string;
  intensity: number;
};

// ── Shared ───────────────────────────────────────────────────────────────────

export const Arrow = () => (
  <svg className="arrow" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7H12M12 7L8 3M12 7L8 11"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
    />
  </svg>
);

const SplitLines = ({
  text, delay = 0, muted, italic,
}: {
  text: string; delay?: number; muted?: boolean; italic?: boolean;
}) => (
  <span className="split-line" style={{ display: "block" }}>
    <span style={{
      transitionDelay: `${delay}s`,
      color: muted ? "var(--muted)" : undefined,
      fontStyle: italic ? "italic" : undefined,
    }}>
      {text}
    </span>
  </span>
);

// ── Hero ─────────────────────────────────────────────────────────────────────

export const Hero = ({ tweaks }: { tweaks: Tweaks }) => (
  <section className="hero" data-screen-label="01 Hero">
    <HeroOrnaments />
    <div className="hero__card">
      <span className="corner-tl" />
      <span className="corner-tr" />
      <span className="corner-bl" />
      <span className="corner-br" />

      <div className="hero__eyebrow reveal">
        <span className="dot" />
        <span>{tweaks.eyebrow || "Available for select work · Q3 2026"}</span>
      </div>

      <h1 className="display hero__title">
        <SplitLines text={tweaks.line1 || "Independent design"} delay={0.05} />
        <SplitLines text={tweaks.line2 || "for ambitious"} delay={0.18} muted />
        <SplitLines text={tweaks.line3 || "founders & teams."} delay={0.32} italic />
      </h1>

      <p className="hero__sub reveal" style={{ transitionDelay: ".5s" }}>
        {tweaks.sub ||
          "Delta is a one-person studio working at the seam between brand, product and code — building the visual systems and interfaces growing companies can grow into."}
      </p>

      <div className="hero__ctas reveal" style={{ transitionDelay: ".6s" }}>
        <button className="btn btn--solid" data-cursor="View">
          <span>Start a project</span>
          <Arrow />
        </button>
        <button className="btn" data-cursor="Open">
          <span>Selected work</span>
        </button>
      </div>

      <div className="hero__meta reveal" style={{ transitionDelay: ".75s" }}>
        <div className="hero__meta-item">
          <span className="label">Based</span>
          <span className="val">New Delhi · IN</span>
        </div>
        <div className="hero__meta-item">
          <span className="label">Practice</span>
          <span className="val">Brand · Product · Web</span>
        </div>
        <div className="hero__meta-item">
          <span className="label">Index</span>
          <span className="val">12 of 28 shipped</span>
        </div>
      </div>
    </div>
  </section>
);

// ── Strip ────────────────────────────────────────────────────────────────────

export const Strip = ({ tweaks }: { tweaks: Tweaks }) => {
  const items = (
    tweaks.stripWords ||
    "Brand identity · Product design · Editorial systems · Design engineering · Front-end · Motion · Type · Strategy"
  )
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  const block = (
    <span>
      {items.map((w, i) => (
        <React.Fragment key={i}>
          <em>{w}</em>
          <span className="strip__dot" />
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__track">
        {block}
        {block}
      </div>
    </div>
  );
};

// ── About ────────────────────────────────────────────────────────────────────

export const About = ({ tweaks: _ }: { tweaks: Tweaks }) => (
  <section className="section" id="about" data-screen-label="02 About">
    <div className="shell">
      <div className="section-marker">
        <span className="section-marker__num">01 —</span>
        <span className="section-marker__name">About / Practice</span>
        <span className="section-marker__rule" />
      </div>

      <div className="grid12">
        <div className="about__col-left reveal">
          <div className="about__portrait" data-cursor="Hello">
            <Image
              src="/portrait.jpg"
              alt="Portrait"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 25vw"
            />
          </div>
          <p
            className="mono"
            style={{
              marginTop: 14, fontSize: 11, letterSpacing: ".14em",
              textTransform: "uppercase", color: "var(--muted)",
            }}
          >
            ↓ Fig. 01 — operator
          </p>
        </div>

        <p className="about__lead reveal" style={{ transitionDelay: ".1s" }}>
          I&apos;m <em>Delta</em> — a designer and developer building{" "}
          <em>quiet, durable</em> visual systems for the kind of products people
          return to every day. I think in <em>type, scale, and rhythm</em>; I
          work in Figma and code, end to end.
        </p>

        <div className="about__stats">
          {[
            { num: "07", label: "Years shipping", delay: ".15s" },
            { num: "28", label: "Brands / launches", delay: ".25s" },
            { num: "04", label: "Continents", delay: ".35s" },
            { num: "∞", label: "Iterations", delay: ".45s" },
          ].map(({ num, label, delay }) => (
            <div key={label} className="reveal" style={{ transitionDelay: delay }}>
              <div className="stat__num serif">{num}</div>
              <div className="stat__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── Services ─────────────────────────────────────────────────────────────────

const services = [
  {
    n: "01",
    title: "Brand systems",
    italic: " — identity, type, voice",
    desc: "Wordmarks, type pairings, and the connective tissue that makes a brand feel inevitable across every surface.",
    tags: ["Identity", "Naming", "Type", "Guidelines"],
  },
  {
    n: "02",
    title: "Product design",
    italic: " — surfaces & flows",
    desc: "End-to-end product surfaces — from the first whiteboard to the polished UI kit your engineers will actually use.",
    tags: ["UX", "UI Kit", "Design Systems", "Prototyping"],
  },
  {
    n: "03",
    title: "Marketing sites",
    italic: " — built in code",
    desc: "Editorial websites designed and developed in one head — fast, accessible, hand-crafted, and easy to maintain.",
    tags: ["Web", "Front-end", "Motion", "CMS"],
  },
  {
    n: "04",
    title: "Design engineering",
    italic: " — embedded",
    desc: "Hands-on collaboration with your team for a defined window — bridging design intent and production reality.",
    tags: ["Embedded", "Components", "Tokens", "Audit"],
  },
];

export const Services = () => (
  <section className="section" id="services" data-screen-label="03 Services">
    <div className="shell">
      <div className="section-marker">
        <span className="section-marker__num">02 —</span>
        <span className="section-marker__name">Services / Capabilities</span>
        <span className="section-marker__rule" />
      </div>

      <div className="services">
        {services.map((s, i) => (
          <div
            key={i}
            className="svc reveal"
            style={{ transitionDelay: `${i * 0.08}s` }}
            data-cursor="Inquire"
          >
            <div className="svc__num">/ {s.n}</div>
            <div className="svc__title">
              {s.title}
              <em>{s.italic}</em>
            </div>
            <div className="svc__desc">{s.desc}</div>
            <div className="svc__tags">
              {s.tags.map((t, j) => (
                <span key={j} className="svc__tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Process ──────────────────────────────────────────────────────────────────

const proc = [
  { n: "01", t: "Listen", d: "We start with a long, slow conversation. The brief is a hypothesis — never a contract.", diag: "halftone" },
  { n: "02", t: "Frame", d: "I distill the work into a one-page diagnosis: who, what, why now, and where the leverage sits.", diag: "router" },
  { n: "03", t: "Make", d: "Iterations land on a Monday. We move in two-week sprints with a single shared loom and a single shared file.", diag: "dial" },
  { n: "04", t: "Ship", d: "Production with care. Design tokens, component library, and a handover doc your future hires will thank you for.", diag: "grid" },
];

const ProcDiagram = ({ kind }: { kind: string }) => {
  if (kind === "halftone")
    return <div className="halftone" style={{ width: 56, height: 56, border: "1px solid var(--line-strong)" }} />;
  if (kind === "router")
    return (
      <div style={{ width: 56, height: 28, border: "1px solid var(--line-strong)", display: "flex" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            flex: 1,
            borderRight: i < 3 ? "1px solid var(--line-strong)" : 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 5, height: 5, background: i === 1 ? "var(--fg)" : "transparent", border: "1px solid var(--fg)", borderRadius: "50%" }} />
          </div>
        ))}
      </div>
    );
  if (kind === "dial")
    return (
      <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid var(--fg)", position: "relative" }}>
        <div style={{ position: "absolute", inset: "30%", borderRadius: "50%", background: "var(--fg)" }} />
      </div>
    );
  return <div className="grid-mini" style={{ width: 56, height: 56, border: "1px solid var(--line-strong)" }} />;
};

export const Process = () => (
  <section className="section bg-paper" id="process" data-screen-label="04 Process">
    <div className="shell">
      <div className="section-marker">
        <span className="section-marker__num">03 —</span>
        <span className="section-marker__name">Process / Method</span>
        <span className="section-marker__rule" />
      </div>

      <div className="process">
        {proc.map((p, i) => (
          <div
            key={i}
            className="proc reveal"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div>
              <div className="proc__num">— {p.n}</div>
              <div className="proc__title">{p.t}</div>
              <div className="proc__desc">{p.d}</div>
            </div>
            <div className="proc__diagram">
              <ProcDiagram kind={p.diag} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Contact ──────────────────────────────────────────────────────────────────

export const Contact = ({ tweaks }: { tweaks: Tweaks }) => (
  <section className="contact" id="contact" data-screen-label="05 Contact">
    <div className="shell">
      <div className="label" style={{ marginBottom: 24 }}>
        05 — Contact / Carrier signal
      </div>

      <h2 className="contact__big" data-cursor="Email">
        Let&apos;s <em>build</em> something
        <br />
        worth <em>keeping</em>.
      </h2>

      <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        <button className="btn btn--solid" data-cursor="Copy">
          <span>{tweaks.email || "hello@delta.studio"}</span>
          <Arrow />
        </button>
        <button className="btn" data-cursor="Schedule">
          <span>Book a 20-min call</span>
        </button>
      </div>

      <div className="contact__sub">
        Replies within 48h · UTC+5:30 · Currently booking late Q3
      </div>
    </div>
  </section>
);

// ── Footer ───────────────────────────────────────────────────────────────────

export const Footer = () => (
  <footer className="footer">
    <div className="shell" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <span>© Delta Studio · MMXXVI</span>
      <span className="footer__links">
        <a href="#" data-cursor="↗">Are.na</a>
        <a href="#" data-cursor="↗">Read.cv</a>
        <a href="#" data-cursor="↗">Email</a>
      </span>
      <span>Δ — Edition III</span>
    </div>
  </footer>
);
