// components/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "I took the Python course using the mobile app and I found the videos encouraging and helpful.",
    name: "John Doe",
  },
  {
    quote:
      "StackJunior made learning to code so much fun! The lessons were clear, and the projects helped me build confidence.",
    name: "Sarah M.",
  },
  {
    quote:
      "As a parent, I was impressed with how quickly my child picked up tech skills. Highly recommend it!",
    name: "Mrs. Lillian A.",
  },
  {
    quote:
      "The community and support are amazing. I now have a portfolio and even built my own app!",
    name: "Daniel T.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
<section className="bg-[#FF0B80] text-white py-16 min-h-screen flex items-center justify-center">
  <div className="max-w-2xl w-full px-6 text-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-20">
      What People Are Saying
    </h2>
    <p className="text-lg mb-6 italic">
      {testimonials[current].quote}
    </p>
    <p className="font-semibold">- {testimonials[current].name}</p>

    {/* Slider Indicators */}
    <div className="flex items-center justify-center gap-2 mt-6">
      {testimonials.map((_, index) => (
        <span
          key={index}
          className={`h-1 rounded-full transition-all duration-300 ${
            index === current ? "w-6 bg-black" : "w-3 bg-white opacity-60"
          }`}
        ></span>
      ))}
    </div>
  </div>
</section>

  );
}
