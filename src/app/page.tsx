import Choose from "@/components/Choose";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Jobs from "@/components/Jobs";
import Navbar from "@/components/Nav";
import Personalized from "@/components/Personalized";


export default function Home() {
  return (
        <div className="">
          <Navbar/>
          <Hero/>
          <Choose/>
          <Personalized/>
          <Jobs/>
          <Features/>
        </div>
  );
}
