import Header from "./components/Header";
import Hero from "./components/Hero";
import Course from "./components/Course";
import About from "./components/About";
import AsanaMarquee from "./components/AsanaMarquee";
import Teacher from "./components/Teacher";
import Classes from "./components/Classes";
import Benefits from "./components/Benefits";
import FAQ from "./components/FAQ";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import HeroPod from "./components/HeroPod";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        {/* <HeroBanner/>
        <HeroPod /> */}
        {/* <Course /> */}
        <About />
        <AsanaMarquee />
        <Teacher />
        <Classes />
        <Pricing />
        <Benefits />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
