import Image from 'next/image'
import React from 'react'

const Jobs = () => {
  return (
    <div className="min-h-screen w-full text-[#2B2B2B] py-12">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center gap-10 text-center md:text-left">
     

          <div className="flex flex-col md:flex-row justify-between  gap-8">
            {/* Image Section */}
            <div className="w-full md:w-[48%]">
              <Image
                src="/jobs.jpeg"
                alt="Why choose us"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-[48%] text-[#2B2B2B]">
              <h3 className="font-semibold text-2xl mb-4">
              World-Class Learning
              with World-Class Jobs
              </h3>
              <p className="text-lg leading-loose">
              At JP, we impact students with industry-standard skills and trainings. We also support them in getting jobs that are available from around the globe. How cool is that?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
