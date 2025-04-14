import Image from 'next/image'
import React from 'react'

const Personalized = () => {
    return (
        <div className="min-h-screen w-full text-[#2B2B2B] py-12">
            <div className="w-[90%] mx-auto">
                <div className="flex flex-col items-center gap-10 text-center md:text-left">


                    <div className="flex flex-col-reverse md:flex-row justify-between mt-10 gap-8">

                        {/* Text Section */}
                        <div className="w-full md:w-[48%] text-[#2B2B2B]">
                            <h3 className="font-semibold text-2xl mb-4">
                            An Interactive Personalized Learning Experience
                            </h3>
                            <p className="text-lg leading-loose">
                            With JP’s flexible learning options and 1-on-1 review with seasoned tutors, your learning is suited just for you. 
                            </p>
                        </div>

                        {/* Image Section */}
                        <div className="w-full md:w-[48%]">
                            <Image
                                src="/personalized.jpeg"
                                alt="Why choose us"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personalized
