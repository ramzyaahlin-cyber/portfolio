import Nav from "./components/ui/Nav";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/ui/CustomCursor";
import StatusBug from "./components/ui/StatusBug";
import LangWipe from "./components/ui/LangWipe";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Footer from "./components/sections/Footer";
import { LangProvider } from "./lib/LangContext";

export default function App() {
  return (
    <LangProvider>
      <main className="bg-white text-black-90 font-sans">
        <ScrollProgress />
        <CustomCursor />
        <LangWipe />
        <Nav />
        <Hero />
        <Work />
        <About />
        <Footer />
        <StatusBug />
      </main>
    </LangProvider>
  );
}
