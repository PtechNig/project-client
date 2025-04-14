import Image from 'next/image'
import React from 'react'

const Features = () => {
    return (
        <div className="min-h-screen w-full text-[#2B2B2B] py-12 bg-white">
            <div className="w-[90%] mx-auto bg-white">
                <div className="flex flex-col items-center gap-10 text-center md:text-left">
                    <h1 className="font-bold text-4xl">Features</h1>

                    {/* Wrapper for Feature Blocks */}
                    <div className="flex flex-col gap-12 mt-10 bg-white">
                        {/* Feature 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-10  text-center">
                            {/* Image */}
                            <div className="w-full md:w-1/2 align-center flex items-center justify-center flex-col">
                                <Image
                                    src="/tutorial 2.svg"
                                    alt="feature"
                                    width={500}
                                    height={100}
                                   
                                />
                                {/* Text */}
                                <div className=" text-[#2B2B2B] w-[80%]">
                                    <h3 className="font-semibold text-2xl mb-4">
                                        Project Review
                                    </h3>
                                    <p className="text-lg leading-loose">
                                    We don’t just give you assignments, we review your solutions and give you insightful feedbacks on your code to enhance and reinforce your understanding.
                                    </p>
                                </div>
                            </div>


                            <div className="w-full md:w-1/2 text-center flex items-center justify-center flex-col">
                                <Image
                                    src="/tutorial 3.svg"
                                    alt="feature"
                                    width={500}
                                    height={100}
                                    
                                />
                                {/* Text */}
                                <div className=" text-[#2B2B2B] w-[80%] ">
                                    <h3 className="font-semibold text-2xl mb-4">
                                        Mentorship
                                    </h3>
                                    <p className="text-lg leading-loose">
                                    Even without being in a physical class, we make it possible for our students to ask questions and get guidance through our seasoned and qualified mentors.
                                    </p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
