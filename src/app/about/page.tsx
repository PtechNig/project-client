import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Navbar from '@/components/Nav';
import Image from 'next/image';
import React from 'react';

const AboutSection = () => {
    return (
<section className=" bg-[#d9ecf8] ">
    <Navbar/>
  <div className="w-[90%] mx-auto flex flex-col-reverse md:flex-row gap-10 md:gap-5 justify-between items-center min-h-screen py-10">
    
    {/* Text Content */}
    <div className="w-full md:w-1/2 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-6 text-center md:text-left">
        About <br /> 
        <span className="text-[#FF0B80]">
          JP Elite<span className="text-[#0063A4]"> Virtual Solution</span>
        </span>
      </h1>

      <p className="text-lg md:text-xl text-[#2B2B2B] leading-relaxed mb-10 text-center md:text-left">
        JP is an ed-tech platform that trains inquisitive learners in the concepts of virtual assistance and other tech skills to prepare them for the opportunities of the future.
      </p>

      <div className="flex justify-center md:justify-start">
        <button className="px-8 py-2 bg-[#0063A4] text-white rounded-md hover:bg-[#6cc4ff] transition-colors duration-500 cursor-pointer text-lg">
          Explore
        </button>
      </div>
    </div>

    {/* Image */}
    <div className="w-full md:w-1/2">
      <Image
        src="/about-img.jpeg"
        alt="Why choose us"
        width={600}
        height={100}
        className=" rounded-lg"
      />
    </div>

  </div>
  <Features/>
  <Footer/>
</section>

    );
};

export default AboutSection;