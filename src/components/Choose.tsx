import Image from 'next/image'
import React from 'react'

const Choose = () => {
  return (
    <div className="min-h-screen w-full text-[#2B2B2B] py-12 bg-white">
      <div className="w-[90%] mx-auto bg-white">
        <div className="flex flex-col items-center gap-10 text-center md:text-left bg-white">
          <h1 className="font-bold text-4xl">Why Choose Us?</h1>

          <div className="flex flex-col md:flex-row justify-between mt-10 gap-8 bg-white">
            {/* Image Section */}
            <div className="w-full md:w-[48%]">
              <Image
                src="/choose.jpeg"
                alt="Why choose us"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-[48%] text-[#2B2B2B]">
              <h3 className="font-semibold text-2xl mb-4">
                Detailed Syllabus with Localized Content
              </h3>
              <p className="text-lg leading-loose">
                We’ve got a comprehensive syllabus that leaves nothing untouched. With our localized content and real-world examples, you’re sure to grasp virtual assistant concepts easier and faster — even as a beginner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Choose
