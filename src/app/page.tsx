import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { YouTube } from "@/components/YouTube";
import { Testimonials } from "@/components/Testimonials";
import { StartHere } from "@/components/StartHere";
import { Forendors } from "@/components/Forendors";
import { About } from "@/components/About";
import { Festival } from "@/components/Festival";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <YouTube />
        <Testimonials />
        <StartHere />
        <Forendors />
        <About />
        <Festival />
      </main>
      <Footer />
    </>
  );
}
