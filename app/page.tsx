import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { SampleWorks } from "@/components/sections/SampleWorks";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <SampleWorks />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
