import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "../../lib/LangContext";
import { t } from "../../lib/translations";

const VIEW_EASE = [0.2, 0.8, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.9, ease: VIEW_EASE },
};

type TimelineEntry = {
  year: string;
  role: string;
  place: string;
  num: string;
};

const TIMELINE: readonly TimelineEntry[] = [
  {
    year: "2026 → Present",
    role: "Frontend & Digital Designer",
    place: "Prodata Design · Merk Barents",
    num: "/ 08",
  },
  {
    year: "2023 → 2026",
    role: "Assistant",
    place: "Kirkenes / Bjørnevatn Skole",
    num: "/ 07",
  },
  {
    year: "2022 → 2023",
    role: "Assistant",
    place: "Skytterhus Barnehage",
    num: "/ 06",
  },
  {
    year: "2013 → 2019",
    role: "Founder / Operator",
    place: "Damping AS — Own practice",
    num: "/ 05",
  },
  {
    year: "2005 → 2013",
    role: "Web Designer / Impl.",
    place: "Gan Media · 07 Media",
    num: "/ 04",
  },
  {
    year: "2000 → 2002",
    role: "Web Lead / Designer",
    place: "Brandhouse",
    num: "/ 03",
  },
  {
    year: "1994 → 1999",
    role: "Graphic / Early Web",
    place: "Telenor Media",
    num: "/ 02",
  },
  {
    year: "1993 → 1994",
    role: "Graphic Design",
    place: "Idéfagskolen",
    num: "/ 01",
  },
] as const;

function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <motion.div {...fadeIn} className="group relative border-b border-black-10">
      <span className="absolute inset-0 z-0 bg-black-90 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]" />
      <div className="relative z-[1] grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1.4fr_1fr_64px] gap-4 sm:gap-6 items-baseline py-5 sm:py-6 px-1 transition-colors duration-300 group-hover:text-white">
        <div
          className="font-mono uppercase text-black-60 transition-colors duration-300 group-hover:text-white/60"
          style={{ fontSize: "12px", letterSpacing: "0.06em" }}
        >
          {entry.year}
        </div>
        <div
          className="font-sans font-medium text-black-90 transition-colors duration-300 group-hover:text-[var(--accent)]"
          style={{
            fontSize: "clamp(22px, 2vw, 32px)",
            letterSpacing: "-0.015em",
            lineHeight: "1.05",
          }}
        >
          {entry.role}
        </div>
        <div
          className="hidden sm:block font-sans text-black-80 transition-colors duration-300 group-hover:text-white/85"
          style={{ fontSize: "15px" }}
        >
          {entry.place}
        </div>
        <div
          className="hidden sm:block font-mono uppercase text-black-60 text-right transition-colors duration-300 group-hover:text-white/60"
          style={{ fontSize: "11px", letterSpacing: "0.16em" }}
        >
          {entry.num}
        </div>
      </div>
    </motion.div>
  );
}

function SkillsCol({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <motion.div {...fadeIn}>
      <h4
        className="font-mono uppercase text-black-60 mb-3 font-medium"
        style={{ fontSize: "10px", letterSpacing: "0.22em" }}
      >
        {title}
      </h4>
      <ul className="list-none m-0 p-0">
        {items.map((it) => (
          <li
            key={it}
            className="font-sans py-2 border-b border-black-10"
            style={{ fontSize: "16px" }}
          >
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function About() {
  const base = import.meta.env.BASE_URL;
  const { lang } = useLang();
  const txt = t[lang].about;
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.08]);
  return (
    <section id="about" className="trust relative z-[3] bg-white text-black-90">
      <div className="max-w-[1680px] mx-auto px-6 sm:px-10 pt-[clamp(120px,16vw,200px)] pb-[clamp(96px,12vw,160px)]">
        {/* row 1: kicker + title */}
        <div className="grid grid-cols-12 gap-6 pb-10 border-b border-black-30/40">
          <motion.div
            {...fadeIn}
            className="col-span-12 sm:col-span-2 font-mono uppercase text-black-60"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            {txt.kicker}
          </motion.div>
          <motion.h2
            {...fadeIn}
            className="col-span-12 sm:col-start-3 sm:col-span-10 font-sans font-medium text-black-90 uppercase"
            style={{
              fontSize: "clamp(40px, 5vw, 84px)",
              lineHeight: "1.02",
              letterSpacing: "-0.03em",
            }}
          >
            {txt.headingStart}{" "}
            <span
              className="italic font-normal normal-case"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--accent)",
              }}
            >
              {txt.headingOwnership}
            </span>{" "}
            {txt.headingMid}{" "}
            <span style={{ color: "var(--accent)" }}>{txt.headingCode}</span>{" "}
            {txt.headingEnd}
          </motion.h2>
        </div>

        {/* row 2: portrait + bio */}
        <div className="mt-16 sm:mt-20 grid grid-cols-12 gap-6 items-start">
          <motion.div
            ref={portraitRef}
            {...fadeIn}
            data-cursor="view"
            data-cursor-label="Ramzy"
            className="group col-span-12 lg:col-span-4 relative overflow-hidden bg-[#0a0a0a]"
            style={{ aspectRatio: "3/4" }}
          >
            <motion.img
              src={`${base}ramzy-portrait.jpeg`}
              alt="Ramzy Aahlin Zaher portrait"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                objectPosition: "55% center",
                scale: portraitScale,
              }}
            />
            <span
              className="absolute right-3 top-3 z-[2] font-mono uppercase pointer-events-none"
              style={{
                color: "#c8c4ba",
                fontSize: "10px",
                letterSpacing: "0.20em",
              }}
            >
              IDX-001
            </span>
            <span
              className="absolute left-3 bottom-3 z-[2] font-mono uppercase pointer-events-none"
              style={{
                color: "#c8c4ba",
                fontSize: "10px",
                letterSpacing: "0.20em",
              }}
            >
              Ramzy Aahlin Zaher — 2026
            </span>
          </motion.div>

          <div className="col-span-12 lg:col-start-6 lg:col-span-7 flex flex-col gap-6">
            <motion.p
              {...fadeIn}
              className="font-sans text-black-80"
              style={{
                fontSize: "clamp(18px, 1.4vw, 22px)",
                lineHeight: "1.5",
              }}
            >
              {txt.bio1Pre}
              <strong className="font-semibold">{txt.bio1Name}</strong>
              {txt.bio1Mid}
              <strong className="font-semibold">{txt.bio1Place}</strong>
              {txt.bio1Post}{" "}
              <em
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--accent)",
                  fontStyle: "italic",
                }}
              >
                {txt.bio1Italic}
              </em>
              {txt.bio1Suffix}
            </motion.p>
            <motion.p
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.08 }}
              className="font-sans text-black-80"
              style={{
                fontSize: "clamp(18px, 1.4vw, 22px)",
                lineHeight: "1.5",
              }}
            >
              {txt.bio2}
            </motion.p>
            <motion.p
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.16 }}
              className="font-sans text-black-80"
              style={{
                fontSize: "clamp(18px, 1.4vw, 22px)",
                lineHeight: "1.5",
              }}
            >
              {txt.bio3Pre}
              <em
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--accent)",
                  fontStyle: "italic",
                }}
              >
                {txt.bio3Italic}
              </em>
              {txt.bio3Post}
            </motion.p>
          </div>
        </div>

        {/* timeline */}
        <div
          className="mt-24 border-t border-black-30/40 pt-6"
          data-cursor="read"
        >
          <div className="grid grid-cols-12 gap-6 mb-4">
            <motion.div
              {...fadeIn}
              className="col-span-12 sm:col-span-6 font-mono uppercase text-black-60"
              style={{ fontSize: "11px", letterSpacing: "0.18em" }}
            >
              {txt.timelineKicker}
            </motion.div>
            <motion.div
              {...fadeIn}
              className="hidden sm:block sm:col-start-10 sm:col-span-3 font-mono uppercase text-black-60 text-right"
              style={{ fontSize: "10px", letterSpacing: "0.20em" }}
            >
              {txt.timelineHint}
            </motion.div>
          </div>
          <div>
            {TIMELINE.map((entry) => (
              <TimelineRow key={entry.num} entry={entry} />
            ))}
          </div>
        </div>

        {/* skills */}
        <div className="mt-24 grid grid-cols-12 gap-6">
          <motion.h3
            {...fadeIn}
            className="col-span-12 lg:col-span-3 font-sans font-medium uppercase text-black-90"
            style={{
              fontSize: "clamp(40px, 5vw, 84px)",
              lineHeight: "1.02",
              letterSpacing: "-0.03em",
            }}
          >
            Stack &amp;
            <br />
            <span
              className="italic font-normal normal-case"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--accent)",
              }}
            >
              {txt.skillsHeadingB}
            </span>
          </motion.h3>
          <div className="col-span-12 lg:col-start-5 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            <SkillsCol
              title={txt.platforms}
              items={[
                "Shopify OS 2.0",
                "Liquid · Shopify CLI",
                "WordPress",
                "WooCommerce",
              ]}
            />
            <SkillsCol
              title={txt.frontend}
              items={[
                "HTML · CSS · JS",
                "jQuery",
                "Git · VS Code",
                "Claude · Antigravity",
              ]}
            />
            <SkillsCol
              title={txt.design}
              items={[
                "Figma",
                "Photoshop · Illustrator",
                "InDesign",
                "Pen, paper, whiteboard",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
