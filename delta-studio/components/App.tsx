"use client";

import React from "react";
import {
  TweaksPanel, TweakSection, TweakSlider, TweakToggle,
  TweakRadio, TweakSelect, TweakText, useTweaks,
} from "./TweaksPanel";
import { Hero, Strip, About, Services, Process, Contact, Footer, type Tweaks } from "./Sections";

// ── TWEAK_DEFAULTS ───────────────────────────────────────────────────────────

const TWEAK_DEFAULTS: Tweaks = {
  themeMode: "light",
  fontPair: "newsreader-plex",
  accentHue: 35,
  ornaments: "rich",
  marquee: "on",
  eyebrow: "Available for select work · Q3 2026",
  line1: "Independent design",
  line2: "for ambitious",
  line3: "founders & teams.",
  sub: "Delta is a one-person studio working at the seam between brand, product and code — building the visual systems and interfaces growing companies can grow into.",
  email: "hello@delta.studio",
  stripWords: "Brand identity · Product design · Editorial systems · Design engineering · Front-end · Motion · Type · Strategy",
  intensity: 1,
};

const FONT_PAIRS: Record<string, { serif: string; mono: string; sans: string }> = {
  "newsreader-plex": {
    serif: '"Newsreader", "Cormorant Garamond", serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
    sans: '"Geist", "Inter", system-ui, sans-serif',
  },
  "fraunces-jbm": {
    serif: '"Fraunces", "Times New Roman", serif',
    mono: '"JetBrains Mono", monospace',
    sans: '"Geist", system-ui, sans-serif',
  },
  "instrument-plex": {
    serif: '"Instrument Serif", serif',
    mono: '"IBM Plex Mono", monospace',
    sans: '"Inter Tight", system-ui, sans-serif',
  },
};

// ── Cursor ───────────────────────────────────────────────────────────────────

const Cursor = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [label, setLabel] = React.useState("");
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = (e.target as Element).closest("[data-cursor], a, button, .btn");
      if (t) {
        setHover(true);
        setLabel(t.getAttribute("data-cursor") || "");
      } else {
        setHover(false);
        setLabel("");
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor ${hover ? "cursor--hover" : ""}`}>
      {label && <span className="cursor__label">{label}</span>}
    </div>
  );
};

// ── Nav ──────────────────────────────────────────────────────────────────────

const Nav = () => {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      const s = d.getSeconds().toString().padStart(2, "0");
      setTime(`IN ${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        Delta<span style={{ color: "currentColor" }}>*</span>
      </a>
      <div className="nav__menu">
        <a href="#about" data-cursor="↓">About</a>
        <a href="#services" data-cursor="↓">Services</a>
        <a href="#process" data-cursor="↓">Process</a>
        <a href="#contact" data-cursor="↓">Contact</a>
      </div>
      <span className="nav__time">{time}</span>
    </nav>
  );
};

// ── Scroll effects ───────────────────────────────────────────────────────────

const useScrollEffects = (intensity: number) => {
  React.useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .split-line");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sy = window.scrollY;
        document.querySelectorAll<HTMLElement>(".bp-parallax").forEach((el) => {
          const p = parseFloat(getComputedStyle(el).getPropertyValue("--p")) || 0;
          el.style.transform = `translate3d(0, ${-sy * p * intensity}px, 0)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);
};

// ── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.classList.toggle("is-dark", tweaks.themeMode === "dark");
  }, [tweaks.themeMode]);

  React.useEffect(() => {
    const pair = FONT_PAIRS[tweaks.fontPair] ?? FONT_PAIRS["newsreader-plex"];
    document.documentElement.style.setProperty("--serif", pair.serif);
    document.documentElement.style.setProperty("--mono", pair.mono);
    document.documentElement.style.setProperty("--sans", pair.sans);
  }, [tweaks.fontPair]);

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent",
      `oklch(62% 0.16 ${tweaks.accentHue})`
    );
  }, [tweaks.accentHue]);

  useScrollEffects(tweaks.intensity as number);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero tweaks={tweaks} />
        {tweaks.marquee === "on" && <Strip tweaks={tweaks} />}
        <About tweaks={tweaks} />
        <Services />
        <Process />
        <Contact tweaks={tweaks} />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.themeMode as string}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={(v) => setTweak("themeMode", v)}
          />
          <TweakSelect
            label="Type pairing"
            value={tweaks.fontPair as string}
            options={[
              { value: "newsreader-plex", label: "Newsreader · IBM Plex" },
              { value: "fraunces-jbm", label: "Fraunces · JetBrains" },
              { value: "instrument-plex", label: "Instrument · IBM Plex" },
            ]}
            onChange={(v) => setTweak("fontPair", v)}
          />
          <TweakSlider
            label="Accent hue"
            min={0}
            max={360}
            step={1}
            value={tweaks.accentHue as number}
            onChange={(v) => setTweak("accentHue", v)}
          />
        </TweakSection>

        <TweakSection label="Composition">
          <TweakRadio
            label="Hero ornaments"
            value={tweaks.ornaments as string}
            options={[
              { value: "rich", label: "Rich" },
              { value: "minimal", label: "Minimal" },
              { value: "off", label: "Off" },
            ]}
            onChange={(v) => {
              setTweak("ornaments", v);
              const f = document.querySelector<HTMLElement>(".bp-field");
              if (f)
                f.style.opacity =
                  v === "off" ? "0" : v === "minimal" ? "0.45" : "1";
            }}
          />
          <TweakToggle
            label="Marquee strip"
            value={tweaks.marquee === "on"}
            onChange={(v) => setTweak("marquee", v ? "on" : "off")}
          />
          <TweakSlider
            label="Parallax intensity"
            min={0}
            max={2}
            step={0.05}
            value={tweaks.intensity as number}
            onChange={(v) => setTweak("intensity", v)}
          />
        </TweakSection>

        <TweakSection label="Copy">
          <TweakText
            label="Eyebrow"
            value={tweaks.eyebrow as string}
            onChange={(v) => setTweak("eyebrow", v)}
          />
          <TweakText
            label="Line 1"
            value={tweaks.line1 as string}
            onChange={(v) => setTweak("line1", v)}
          />
          <TweakText
            label="Line 2"
            value={tweaks.line2 as string}
            onChange={(v) => setTweak("line2", v)}
          />
          <TweakText
            label="Line 3"
            value={tweaks.line3 as string}
            onChange={(v) => setTweak("line3", v)}
          />
          <TweakText
            label="Sub"
            value={tweaks.sub as string}
            onChange={(v) => setTweak("sub", v)}
          />
          <TweakText
            label="Email"
            value={tweaks.email as string}
            onChange={(v) => setTweak("email", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
