// components/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Since partnering with JP Elite, we have experienced a remarkable transformation in the coordination of our programs, communication processes, and overall administrative efficiency..",
    name: "The Total Child Initiative Team",
  },
  {
    quote:
      "Through JP Elite's dedicated virtual support, our brand visibility and engagement on social media have significantly improved. The contest has gained wider recognition, reaching new audiences, and attracting more schools, participants, and sponsors than ever before. JP Elite’s expert content creation, digital promotion, and administrative management have added great value to our project.",
    name: "Steve Olalekan",
  },
  {
    quote:
      "JP Elite Virtual Solution has consistently demonstrated excellence in service delivery, ensuring our processes are smooth, timely, and stress-free. Their contribution to our program’s visibility and administrative efficiency has strengthened our global impact and reach.",
    name: "Prof. J.E. Tobih",
  },

];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#FF0B80] text-white py-16 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-20">
          What People Are Saying
        </h2>
        {/* <p className="text-lg mb-6 italic">
      {testimonials[current].quote}
    </p> */}

        {testimonials[current] && (
          <>
            <p className="text-lg mb-6 italic">
              {testimonials[current].quote}
            </p>
            <p className="font-semibold">- {testimonials[current].name}</p>
          </>
        )}



        {/* Slider Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${index === current ? "w-6 bg-black" : "w-3 bg-white opacity-60"
                }`}
            ></span>
          ))}
        </div>
      </div>
    </section>

  );
}
