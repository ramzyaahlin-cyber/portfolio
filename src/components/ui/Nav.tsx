import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { scrollToTop as smoothScrollToTop } from "../../lib/scroll";

const LIGHT_SECTIONS = [
  ".projects-section",
  ".trust",
  ".selected",
  ".big-name",
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Nav() {
  const [light, setLight] = useState(false);
  const [swept, setSwept] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isCompact = useMediaQuery("(max-width: 1023px)");

  const handleScrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothScrollToTop();
    setMenuOpen(false);
  };

  useEffect(() => {
    const update = () => {
      setSwept(window.scrollY > 10);
      setLight(
        LIGHT_SECTIONS.some((sel) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top <= 60 && r.bottom > 60;
        }),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // close menu if viewport grows past compact breakpoint
  useEffect(() => {
    if (!isCompact) setMenuOpen(false);
  }, [isCompact]);

  // body scroll lock only while overlay is actually rendered
  useEffect(() => {
    if (menuOpen && isCompact) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen, isCompact]);

  const closeMenu = () => setMenuOpen(false);
  const navColor =
    menuOpen && isCompact ? "#FFFFFF" : light ? "#1A1A1A" : "#FFFFFF";
  const navHidden = swept && !(menuOpen && isCompact);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 font-sans transition-[color,opacity,transform] duration-300 ease-[cubic-bezier(.4,0,.2,1)] pointer-events-none"
        style={{
          color: navColor,
          opacity: navHidden ? 0 : 1,
          transform: navHidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <a
          href="#"
          onClick={handleScrollToTop}
          className="pointer-events-auto font-semibold hover:underline underline-offset-[6px] decoration-1"
          style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
        >
          Ramzy Aahlin Zaher
        </a>

        {/* desktop links (≥ 1024px) */}
        {!isCompact && (
          <div
            className="flex items-center gap-6 sm:gap-10 pointer-events-auto"
            style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
          >
            <a
              href="#work"
              className="hover:underline underline-offset-[6px] decoration-1"
            >
              Work
            </a>
            <a
              href="#about"
              className="hover:underline underline-offset-[6px] decoration-1"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:underline underline-offset-[6px] decoration-1"
            >
              Contact
            </a>
            <span className="hidden sm:inline opacity-30 mx-1">·</span>
            <a
              href="mailto:ramzy.zaher@gmail.com"
              className="hidden sm:inline hover:underline underline-offset-[6px] decoration-1"
            >
              Mail
            </a>
            <a
              href="https://www.facebook.com/ramzy.aahlin.zaher"
              className="hidden md:inline hover:underline underline-offset-[6px] decoration-1"
            >
              FB
            </a>
            <a
              href="https://www.instagram.com/ramzy.zaher/"
              className="hidden md:inline hover:underline underline-offset-[6px] decoration-1"
            >
              IG
            </a>
            <a
              href="https://github.com/ramzyaahlin-cyber"
              className="hidden md:inline hover:underline underline-offset-[6px] decoration-1"
            >
              GitHub
            </a>
          </div>
        )}

        {/* compact hamburger (< 1024px) */}
        {isCompact && (
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="pointer-events-auto w-7 h-5 relative flex flex-col justify-between"
          >
            <span
              className="block h-[2px] origin-center transition-transform duration-300"
              style={{
                background: "currentColor",
                transform: menuOpen
                  ? "translateY(9px) rotate(45deg)"
                  : undefined,
              }}
            />
            <span
              className="block h-[2px] transition-opacity duration-300"
              style={{
                background: "currentColor",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[2px] origin-center transition-transform duration-300"
              style={{
                background: "currentColor",
                transform: menuOpen
                  ? "translateY(-9px) rotate(-45deg)"
                  : undefined,
              }}
            />
          </button>
        )}
      </nav>

      {/* compact fullscreen menu overlay */}
      <AnimatePresence>
        {isCompact && menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8"
            style={{
              color: "#ffffff",
              background: "rgba(10, 10, 10, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="font-sans font-semibold"
                style={{
                  fontSize: "clamp(40px, 11vw, 72px)",
                  lineHeight: "1",
                  letterSpacing: "-0.03em",
                }}
              >
                {label}
              </a>
            ))}
            <div
              className="mt-6 flex flex-col items-center gap-3"
              style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)" }}
            >
              <a
                href="mailto:ramzy.zaher@gmail.com"
                onClick={closeMenu}
                className="hover:text-white transition-colors"
              >
                Mail
              </a>
              <div className="flex gap-6">
                <a
                  href="https://www.facebook.com/ramzy.aahlin.zaher"
                  onClick={closeMenu}
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/ramzy.zaher/"
                  onClick={closeMenu}
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://github.com/ramzyaahlin-cyber"
                  onClick={closeMenu}
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
