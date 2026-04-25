import Nav from './components/ui/Nav'
import ScrollProgress from './components/ui/ScrollProgress'
import Hero from './components/sections/Hero'
import AboutBio from './components/sections/AboutBio'
import Projects from './components/sections/Projects'
import Trust from './components/sections/Trust'
import Selected from './components/sections/Selected'
import Footer from './components/sections/Footer'

export default function App() {
  return (
    <main className="bg-white text-black-90 font-sans overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <Hero />
      <AboutBio />
      <Projects />
      <Trust />
      <Selected />
      <Footer />
    </main>
  )
}
