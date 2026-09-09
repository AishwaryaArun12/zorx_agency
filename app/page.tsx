import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { WhyZorx } from "@/components/WhyZorx";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyZorx />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
