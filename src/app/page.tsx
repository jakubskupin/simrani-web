import { AnnouncementBar } from "@/components/AnnouncementBar";
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

export default function Home() {
  return (
    <>
      {/* <AnnouncementBar /> */}
      <Nav />
      <main>
        <Hero />
        <YouTube />
        <StartHere />
        <Testimonials />
        <Forendors />
        <About />
        <Events />
        <CTAMarquee />
      </main>
      <Footer />
    </>
  );
}
