import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { AnnouncementBarB } from "@/components/AnnouncementBarB";
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
      <AnnouncementBarB />
      <Nav />
      <main>
        <Hero />
        <AnimatedSection>
          <Suspense fallback={null}>
            <YouTube />
          </Suspense>
        </AnimatedSection>
        <AnimatedSection>
          <Events />
        </AnimatedSection>
        {/* StartHere — temporarily hidden, content TBD */}
        {/* <AnimatedSection>
          <StartHere />
        </AnimatedSection> */}
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection>
          <Forendors />
        </AnimatedSection>
        <AnimatedSection>
          <About />
        </AnimatedSection>
        <CTAMarquee />
      </main>
      <Footer />
    </>
  );
}
