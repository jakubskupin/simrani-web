import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { YouTube } from "@/components/YouTube";
import { Testimonials } from "@/components/Testimonials";
import { StartHere } from "@/components/StartHere";
import { Forendors } from "@/components/Forendors";
import { About } from "@/components/About";
import { Festival } from "@/components/Festival";
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
        <Testimonials />
        <StartHere />
        <Forendors />
        <About />
        <Festival />
        <CTAMarquee />
      </main>
      <Footer />
    </>
  );
}
