import Nav from "./components/ui/Nav";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/ui/CustomCursor";
import StatusBug from "./components/ui/StatusBug";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <main className="bg-white text-black-90 font-sans">
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <Hero />
      <Work />
      <About />
      <Footer />
      <StatusBug />
    </main>
  );
}
