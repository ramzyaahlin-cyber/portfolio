import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLang } from "../../lib/LangContext";
import { t } from "../../lib/translations";
import RevealLine from "../../lib/RevealLine";

const VIEW_EASE = [0.2, 0.8, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.9, ease: VIEW_EASE },
};

type ItemPair = readonly [string, string];

function MetaBlock({
  title,
  items,
  dark,
}: {
  title: string;
  items: readonly ItemPair[];
  dark: boolean;
}) {
  const muted = dark ? "text-white/55" : "text-black-60";
  const border = dark ? "border-white/12" : "border-black-10";
  return (
    <div>
      <h4
        className={`font-mono uppercase mb-3 font-medium ${muted}`}
        style={{ fontSize: "10px", letterSpacing: "0.22em" }}
      >
        {title}
      </h4>
      <ul className="list-none m-0 p-0">
        {items.map(([k, v]) => (
          <li
            key={k}
            className={`font-sans flex justify-between gap-3 py-2 border-b ${border}`}
            style={{ fontSize: "15px" }}
          >
            <span>{k}</span>
            <span
              className={`font-mono ${muted}`}
              style={{ fontSize: "11px", letterSpacing: "0.06em" }}
            >
              {v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ScrubFrameData = {
  label: string;
  image: string;
  position?: string;
};

function ScrubFrame({ frame }: { frame: ScrubFrameData }) {
  return (
    <motion.div
      {...fadeIn}
      className="relative overflow-hidden bg-white"
      style={{ aspectRatio: "3/4" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${frame.image}')`,
          backgroundSize: "cover",
          backgroundPosition: frame.position ?? "top center",
        }}
      />
      <span
        className="absolute top-3 left-3 z-[2] font-mono uppercase"
        style={{
          color: "#1a1a1a",
          fontSize: "10px",
          letterSpacing: "0.20em",
          mixBlendMode: "difference",
        }}
      >
        {frame.label}
      </span>
    </motion.div>
  );
}

type ProjectData = {
  index: string;
  role: string;
  year: string;
  titleA: string;
  titleB: string;
  pitch: string;
  image: string;
  caption: string;
  tagRight: string;
  captionDark: boolean;
  tagRightDark: boolean;
  quote: ReactNode;
  stack: readonly ItemPair[];
  deliverables: readonly ItemPair[];
  frames: readonly ScrubFrameData[];
  notes: readonly ReactNode[];
  href?: string;
};

function ProjectCase({
  data,
  dark = false,
}: {
  data: ProjectData;
  dark?: boolean;
}) {
  const { lang } = useLang();
  const txt = t[lang];
  const ink = dark ? "text-[#f4f1ea]" : "text-black-90";
  const inkSoft = dark ? "text-white/85" : "text-black-80";
  const muted = dark ? "text-white/55" : "text-black-60";
  const border = dark ? "border-white/12" : "border-black-10";
  const bg = dark ? "bg-[#0a0a0a]" : "bg-white";
  const captionColor = data.captionDark ? "rgb(37, 37, 35)" : "#c8c4ba";
  const tagRightColor = data.tagRightDark ? "rgb(37, 37, 35)" : "#c8c4ba";

  return (
    <article className={`${bg} ${ink}`}>
      <div className="max-w-[1680px] mx-auto px-6 sm:px-10 pt-[clamp(64px,7vw,96px)] pb-[clamp(80px,9vw,140px)]">
        {/* head row */}
        <motion.div {...fadeIn} className="grid grid-cols-12 gap-6 items-end">
          <div
            className={`col-span-6 sm:col-span-2 font-mono uppercase ${muted}`}
            style={{ fontSize: "11px", letterSpacing: "0.16em" }}
          >
            {data.index}
          </div>
          <div
            className={`col-span-12 sm:col-span-6 font-mono uppercase ${muted}`}
            style={{ fontSize: "11px", letterSpacing: "0.16em" }}
          >
            {data.role}
          </div>
          <div
            className={`col-span-6 sm:col-start-10 sm:col-span-3 font-mono uppercase sm:text-right ${muted}`}
            style={{ fontSize: "11px", letterSpacing: "0.16em" }}
          >
            {data.year}
          </div>
        </motion.div>

        {/* title + pitch */}
        <div className="mt-8 sm:mt-10 grid grid-cols-12 gap-6 items-start">
          <h3
            className={`col-span-12 lg:col-span-8 font-sans font-medium uppercase ${ink}`}
            style={{
              fontSize: "clamp(56px, 9vw, 160px)",
              lineHeight: "0.9",
              letterSpacing: "-0.04em",
            }}
          >
            <RevealLine>{data.titleA}</RevealLine>
            <RevealLine delay={0.08}>
              <span
                className="italic font-normal normal-case"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--accent)",
                }}
              >
                {data.titleB}
              </span>
            </RevealLine>
          </h3>
          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className={`col-span-12 lg:col-start-9 lg:col-span-4 font-sans ${inkSoft} max-w-[40ch]`}
            style={{
              fontSize: "clamp(16px, 1.1vw, 19px)",
              lineHeight: "1.5",
            }}
          >
            {data.pitch}
          </motion.p>
        </div>

        {/* hero media */}
        <motion.a
          href={data.href ?? "#"}
          target={data.href ? "_blank" : undefined}
          rel={data.href ? "noopener noreferrer" : undefined}
          data-cursor="view"
          data-cursor-label="Open case"
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.15 }}
          className="group relative block mt-10 sm:mt-14 overflow-hidden bg-[#0a0a0a]"
          style={{ aspectRatio: "16/10" }}
        >
          <div
            className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03]"
            style={{
              backgroundImage: `url('${data.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          />
          <div
            className="absolute left-5 bottom-5 z-[2] flex items-center gap-3 font-mono uppercase"
            style={{
              color: captionColor,
              fontSize: "11px",
              letterSpacing: "0.16em",
            }}
          >
            <span
              className="inline-block w-[10px] h-[10px] rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span>{data.caption}</span>
          </div>
          <div
            className="absolute right-5 bottom-5 z-[2] font-mono uppercase"
            style={{
              color: tagRightColor,
              fontSize: "11px",
              letterSpacing: "0.16em",
            }}
          >
            {data.tagRight}
          </div>
        </motion.a>

        {/* details — quote + stack/deliverables */}
        <div className="mt-14 sm:mt-16 grid grid-cols-12 gap-6">
          <motion.p
            {...fadeIn}
            className={`col-span-12 lg:col-span-5 ${ink}`}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.4vw, 48px)",
              lineHeight: "1.08",
              letterSpacing: "-0.015em",
            }}
          >
            {data.quote}
          </motion.p>
          <div className="col-span-12 lg:col-start-7 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            <MetaBlock
              title={txt.work.stackLabel}
              items={data.stack}
              dark={dark}
            />
            <MetaBlock
              title={txt.work.deliverablesLabel}
              items={data.deliverables}
              dark={dark}
            />
          </div>
        </div>

        {/* scrub frames + notes */}
        <div className="mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-4 sm:gap-6">
            {data.frames.map((f) => (
              <ScrubFrame key={f.label} frame={f} />
            ))}
          </div>
          <div className="col-span-12 lg:col-start-10 lg:col-span-3 mt-4 lg:mt-0">
            <span
              className={`font-mono uppercase mb-4 block ${muted}`}
              style={{ fontSize: "10px", letterSpacing: "0.20em" }}
            >
              {txt.work.notesLabel}
            </span>
            {data.notes.map((n, i) => (
              <motion.p
                key={i}
                {...fadeIn}
                transition={{
                  ...fadeIn.transition,
                  delay: 0.05 + i * 0.05,
                }}
                className={`font-sans mb-4 ${inkSoft}`}
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                {n}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
      <div className={`border-b ${border}`} />
    </article>
  );
}

const BASE = import.meta.env.BASE_URL;

function getProjects(lang: "en" | "no"): [ProjectData, ProjectData] {
  const w = t[lang].work;
  const p01: ProjectData = {
    index: "[ P — 01 / 02 ]",
    role: w.p01.role,
    year: "2026 / Kirkenes, NO",
    titleA: "Barents",
    titleB: "Gallery.",
    pitch: w.p01.pitch,
    image: `${BASE}barents-home-desktop.webp`,
    caption: "01 — Storefront, Home",
    tagRight: "Shopify OS 2.0 / Liquid",
    captionDark: true,
    tagRightDark: true,
    href: "https://barentsgallery.no",
    quote: (
      <>
        "{w.p01.quoteStart}
        <span style={{ color: "var(--accent)" }}>{w.p01.quoteAccent1}</span>
        {w.p01.quoteMid}
        <span style={{ color: "var(--accent)" }}>{w.p01.quoteAccent2}</span>
        {w.p01.quoteEnd}"
      </>
    ),
    stack: [
      ["Shopify OS 2.0", "LIQ"],
      ["Theme CLI", "CLI"],
      ["Vanilla JS", "JS"],
      ["Sections / Blocks", "UI"],
    ] as const,
    deliverables: w.p01.deliverables,
    frames: w.p01.frameLabels.map((label, i) => ({
      label,
      image: [
        `${BASE}barents-product.webp`,
        `${BASE}barents-wishlist.webp`,
        `${BASE}barents-chooser.webp`,
      ][i],
    })),
    notes: [...w.p01.notes],
  };
  const p02: ProjectData = {
    index: "[ P — 02 / 02 ]",
    role: w.p02.role,
    year: "2026 / Kirkenes, NO",
    titleA: "Merk",
    titleB: "Barents.",
    pitch: w.p02.pitch,
    image: `${BASE}merk-home.webp`,
    caption: "02 — Storefront, Home",
    tagRight: "WordPress / WooCommerce",
    captionDark: true,
    tagRightDark: false,
    href: "https://merk-skisse03-ayr6.vercel.app/",
    quote: (
      <>
        "{w.p02.quoteStart}
        <span style={{ color: "var(--accent)" }}>{w.p02.quoteAccent1}</span>
        {w.p02.quoteMid}
        <span style={{ color: "var(--accent)" }}>{w.p02.quoteAccent2}</span>
        {w.p02.quoteEnd}"
      </>
    ),
    stack: [
      ["WordPress", "CMS"],
      ["WooCommerce", "COM"],
      ["Custom PHP / JS", "DEV"],
      ["ACF", "UI"],
    ] as const,
    deliverables: w.p02.deliverables,
    frames: w.p02.frameLabels.map((label, i) => ({
      label,
      image: [
        `${BASE}merk-tjenester.webp`,
        `${BASE}merk-prosjekter.webp`,
        `${BASE}merk-bildeproduksjon.webp`,
      ][i],
    })),
    notes: [...w.p02.notes],
  };
  return [p01, p02];
}

export default function Work() {
  const { lang } = useLang();
  const txt = t[lang];
  const [PROJECT_01, PROJECT_02] = getProjects(lang);
  return (
    <section
      id="work"
      className="projects-section relative z-[2] bg-white text-black-90"
    >
      {/* section header */}
      <header className="border-b border-black-10">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10 pt-[clamp(96px,12vw,160px)] pb-10 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-9">
            <motion.div
              {...fadeIn}
              className="font-mono uppercase text-black-60"
              style={{ fontSize: "11px", letterSpacing: "0.18em" }}
            >
              {txt.work.kicker}
            </motion.div>
            <h2
              className="mt-5 font-sans font-medium text-black-90 uppercase"
              style={{
                fontSize: "clamp(56px, 8vw, 132px)",
                lineHeight: "0.92",
                letterSpacing: "-0.04em",
                paddingBottom: "0.15em",
              }}
            >
              <RevealLine>{txt.work.headingA}</RevealLine>
              <RevealLine delay={0.08}>
                <span
                  className="italic font-normal normal-case"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--accent)",
                  }}
                >
                  {txt.work.headingB}
                </span>
              </RevealLine>
            </h2>
          </div>
          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.25 }}
            className="col-span-12 lg:col-span-3 font-mono uppercase text-black-60 lg:text-right"
            style={{ fontSize: "11px", letterSpacing: "0.16em" }}
          >
            {txt.work.metaRight[0]}
            <br />
            {txt.work.metaRight[1]}
          </motion.div>
        </div>
      </header>

      <ProjectCase data={PROJECT_01} />
      <ProjectCase data={PROJECT_02} dark />
    </section>
  );
}
