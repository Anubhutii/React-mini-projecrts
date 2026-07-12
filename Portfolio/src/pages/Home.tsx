import Hero from "../components/sections/Hero";
import About from "./About";
import Skills from "../components/sections/Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";

const Home = () => {
  return (
    <main className="bg-[#050816] text-white overflow-x-hidden">

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
          
    </main>
  );
};

export default Home;