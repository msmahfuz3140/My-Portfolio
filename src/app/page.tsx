import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OpenToWork from "@/components/OpenToWork";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import GitHubActivity from "@/components/GitHubActivity";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Qualifications from "@/components/Qualifications";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <OpenToWork />
      <About />
      <Skills />
      <Technologies />
      <Projects />
      <Services />
      <GitHubActivity />
      <Testimonials />
      <Blog />
      <Qualifications />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
