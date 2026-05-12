import { Hero } from "@/components/sections/Hero";
import ProcessSection from "@/components/sections/ProcessSection";
import { SampleWorks } from "@/components/sections/SampleWorks";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import WorkSection from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <SampleWorks />
      <Services />
      <About />
      <Contact />
      <Footer />
      <WorkSection />
    </>
  );
}
