import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Qualifications from "@/components/Qualifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Technologies />
      <Projects />
      <Qualifications />
      <Contact />
      <Footer />
    </main>
  );
}
