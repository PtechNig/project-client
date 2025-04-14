import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className=" h-[90vh] flex justify-center items-center box-border px-4 bg-white">
      <div className="w-[90%] max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-white ">
        {/* Text Section */}
        <div className="text-[#0063A4] text-center md:text-left bg-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Learn on your <br /> schedule
          </h1>
          <div className='mt-5 flex gap-3 bg-white'>
            <input type="text" placeholder='Search for your desired courses' className='border border-2-[#0063A4] w-full rounded-md px-3 placeholder-[#0063A4]'/>
            <button type="submit" className='bg-[#FF0B80] p-2 rounded-md hover:bg-[#FF4DA8] duration-500 cursor-pointer'>
            <Image
            src="/search.svg"
            alt="hero"
            width={10}
            height={10}
            className="w-full h-auto max-w-md md:max-w-full  "
            
          />
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex  ">
          <Image
            src="/hero.jpeg"
            alt="hero"
            width={900}
            height={100}
            className="w-full h-auto rounded-lg max-w-md md:max-w-full"
            
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
