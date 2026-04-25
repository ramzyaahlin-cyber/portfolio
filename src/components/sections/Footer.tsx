export default function Footer() {
  return (
    <section className="big-name pt-20 pb-6 bg-white text-center overflow-hidden">
      <h1
        className="font-sans font-extrabold leading-[.9] tracking-[-.05em] text-black-90 whitespace-nowrap"
        style={{ fontSize: 'clamp(60px,13.5vw,260px)' }}
      >
        RAMZY AAHLIN ZAHER
      </h1>

      <div className="max-w-[1060px] mx-auto mt-10 pt-8 pb-[60px] px-6 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black-10">
        <div>
          <h5 className="font-mono text-[10px] tracking-[.22em] uppercase text-black-50 mb-3 font-normal">
            Contact
          </h5>
          <a
            href="mailto:ramzy.zaher@gmail.com"
            className="block font-sans text-[15px] text-black-90 leading-[1.5] hover:text-black-60 transition-colors"
          >
            ramzy.zaher@gmail.com
          </a>
          <a
            href="tel:+4745277579"
            className="block font-sans text-[15px] text-black-90 leading-[1.5] hover:text-black-60 transition-colors"
          >
            +47 452 77 579
          </a>
        </div>
        <div>
          <h5 className="font-mono text-[10px] tracking-[.22em] uppercase text-black-50 mb-3 font-normal">
            Studio
          </h5>
          <p className="font-sans text-[15px] text-black-90 leading-[1.5]">
            Kirkenes, Norway
            <br />
            69.7257° N, 30.0481° E
          </p>
        </div>
        <div>
          <h5 className="font-mono text-[10px] tracking-[.22em] uppercase text-black-50 mb-3 font-normal">
            Live
          </h5>
          <a
            href="https://barentsgallery.no"
            target="_blank"
            rel="noopener"
            className="block font-sans text-[15px] text-black-90 leading-[1.5] hover:text-black-60 transition-colors"
          >
            barentsgallery.no ↗
          </a>
          <a
            href="https://merkbarents.no"
            target="_blank"
            rel="noopener"
            className="block font-sans text-[15px] text-black-90 leading-[1.5] hover:text-black-60 transition-colors"
          >
            merkbarents.no ↗
          </a>
        </div>
        <div>
          <h5 className="font-mono text-[10px] tracking-[.22em] uppercase text-black-50 mb-3 font-normal">
            Socials
          </h5>
          <a
            href="#"
            className="block font-sans text-[15px] text-black-90 leading-[1.5] hover:text-black-60 transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="#"
            className="block font-sans text-[15px] text-black-90 leading-[1.5] hover:text-black-60 transition-colors"
          >
            Instagram ↗
          </a>
        </div>
      </div>

      <div className="max-w-[1060px] mx-auto pt-5 pb-10 px-6 flex justify-between border-t border-black-10 font-mono text-[11px] tracking-[.14em] uppercase text-black-50">
        <div>© 2026 RAMZY AAHLIN ZAHER</div>
        <div>PORTFOLIO V.02</div>
        <div className="hidden md:block">Set in Plus Jakarta Sans &amp; Fragment Mono</div>
      </div>
    </section>
  )
}
