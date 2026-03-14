import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { YouTube } from "@/components/YouTube";
import { Testimonials } from "@/components/Testimonials";
import { StartHere } from "@/components/StartHere";
import { Forendors } from "@/components/Forendors";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { CTAMarquee } from "@/components/CTAMarquee";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AnimatedSection>
          <YouTube />
        </AnimatedSection>
        <AnimatedSection>
          <StartHere />
        </AnimatedSection>
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection>
          <Forendors />
        </AnimatedSection>
        <AnimatedSection>
          <About />
        </AnimatedSection>
        <AnimatedSection>
          <Events />
        </AnimatedSection>
        <CTAMarquee />
      </main>
      <Footer />
    </>
  );
}
