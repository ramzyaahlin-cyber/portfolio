import { motion } from "framer-motion";
import type { ReactNode } from "react";
import RevealLine from "../../lib/RevealLine";

const VIEW_EASE = [0.2, 0.8, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.9, ease: VIEW_EASE },
};

function CTAButton({
  href,
  label,
  cursor,
  delay = 0,
}: {
  href: string;
  label: string;
  cursor: "send" | "call";
  delay?: number;
}) {
  return (
    <motion.a
      {...fadeIn}
      transition={{ ...fadeIn.transition, delay }}
      href={href}
      data-cursor={cursor}
      className="group relative flex items-center justify-between gap-4 px-6 py-5 sm:py-6 border border-white/55 text-white overflow-hidden transition-colors duration-300 hover:text-white hover:border-[var(--accent)]"
    >
      <span
        aria-hidden
        className="absolute inset-0 z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{ background: "var(--accent)" }}
      />
      <span
        className="relative z-[1] font-sans"
        style={{ fontSize: "20px", letterSpacing: "-0.01em" }}
      >
        {label}
      </span>
      <span className="relative z-[1] font-mono" style={{ fontSize: "18px" }}>
        ↗
      </span>
    </motion.a>
  );
}

function MetaBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div {...fadeIn} className="col-span-6 lg:col-span-3">
      <h4
        className="font-mono uppercase text-white/55 mb-3 font-medium"
        style={{ fontSize: "10px", letterSpacing: "0.22em" }}
      >
        {title}
      </h4>
      <div
        className="font-sans text-white/90"
        style={{ fontSize: "18px", lineHeight: "1.5" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function MetaLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="relative inline-block text-white/90 hover:text-white transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[2px] after:h-px after:bg-[var(--accent)] after:scale-x-0 after:origin-left after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(.2,.8,.2,1)] hover:after:scale-x-100"
    >
      {children}
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-[4] bg-[#0a0a0a] text-[#f4f1ea]"
    >
      <div className="max-w-[1680px] mx-auto px-6 sm:px-10 pt-[clamp(120px,16vw,200px)] pb-[clamp(72px,8vw,120px)]">
        {/* big headline */}
        <h2
          className="font-sans font-medium"
          style={{
            fontSize: "clamp(64px, 12vw, 220px)",
            lineHeight: "0.88",
            letterSpacing: "-0.045em",
          }}
        >
          <RevealLine>Have a</RevealLine>
          <RevealLine delay={0.08}>
            <span
              className="italic font-normal"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--accent)",
              }}
            >
              project?
            </span>
          </RevealLine>
          <RevealLine delay={0.16}>Let’s build.</RevealLine>
        </h2>

        {/* row 2: kicker + lede + cta */}
        <div className="mt-14 grid grid-cols-12 gap-6 pt-6 border-t border-white/30">
          <motion.div
            {...fadeIn}
            className="col-span-12 sm:col-span-2 font-mono uppercase text-white/55"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            — Contact / 04
          </motion.div>
          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.08 }}
            className="col-span-12 sm:col-start-3 sm:col-span-6 font-sans text-white/85"
            style={{
              fontSize: "clamp(18px, 1.4vw, 22px)",
              lineHeight: "1.5",
            }}
          >
            Taking on a small number of briefs for{" "}
            <strong className="font-semibold text-white">Q3 2026</strong>.
            Shopify themes, WooCommerce builds, and full identity → frontend
            work. Say hello — I answer everything.
          </motion.p>
          <div className="col-span-12 lg:col-start-9 lg:col-span-4 flex flex-col gap-3">
            <CTAButton
              href="mailto:ramzy.zaher@gmail.com"
              label="ramzy.zaher@gmail.com"
              cursor="send"
              delay={0.12}
            />
            <CTAButton
              href="tel:+4745277579"
              label="+47 452 77 579"
              cursor="call"
              delay={0.18}
            />
          </div>
        </div>

        {/* contact-meta */}
        <div className="mt-24 grid grid-cols-12 gap-6 pt-6 border-t border-white/15">
          <MetaBlock title="Studio">
            Kirkenes, Norway
            <br />
            69.7257° N, 30.0481° E
          </MetaBlock>
          <MetaBlock title="Live">
            <div className="flex flex-col gap-1">
              <MetaLink href="https://barentsgallery.no" external>
                barentsgallery.no ↗
              </MetaLink>
              <MetaLink href="https://merk-skisse03-ayr6.vercel.app/" external>
                merkbarents.no ↗
              </MetaLink>
            </div>
          </MetaBlock>
          <MetaBlock title="Socials">
            <div className="flex flex-col gap-1">
              <MetaLink href="https://www.instagram.com/ramzy.zaher/" external>
                Instagram ↗
              </MetaLink>
              <MetaLink href="https://github.com/ramzyaahlin-cyber" external>
                GitHub ↗
              </MetaLink>
            </div>
          </MetaBlock>
          <MetaBlock title="Availability">
            Q3 → Q4 2026
            <br />
            <span style={{ color: "var(--accent)" }}>●</span> Booking now
          </MetaBlock>
        </div>
      </div>
    </section>
  );
}
