import Choose from "@/components/Choose";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Jobs from "@/components/Jobs";
import Navbar from "@/components/Nav";
import Personalized from "@/components/Personalized";
import Testimonials from "@/components/Testimonial";


export default function Home() {
  return (
        <div className="">
          <Navbar/>
          <Hero/>
          <Choose/>
          <Personalized/>
          <Jobs/>
          <Features/>
          <Testimonials/>
          <Footer/>
        </div>
  );
}
