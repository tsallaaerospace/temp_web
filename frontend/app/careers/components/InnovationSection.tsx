"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import FlowingMenu from "./FlowingMenu"

export default function InnovationSection() {
    const items = [
        {
            link: '#',
            text: 'Family First',
            image: '/images/careers/Familyfirst.jpg',
            description: 'Platinum medical, dental, and vision coverage.'
        },
        {
            link: '#',
            text: 'NextGen Care',
            image: '/images/careers/NextGen.jpg',
            description: 'Fertility benefits and future family planning.'
        },
        {
            link: '#',
            text: 'Life Leave',
            image: '/images/careers/lifeleave.jpg',
            description: 'Unlimited paid time off when life happens.'
        },
        {
            link: '#',
            text: 'Mind Support',
            image: '/images/careers/MindSupport.jpg',
            description: '24/7 coaching and mental wellness stipends.'
        },
        {
            link: '#',
            text: 'Career Boost',
            image: '/images/careers/careerboost.jpg',
            description: 'Annual learning budgets and global mentorship.'
        }
    ];

    return (
        <section className="w-full bg-white text-black py-20 md:py-32 relative overflow-hidden">
            <ContentWrapper>
                <div className="flex flex-col items-center justify-center mb-4 md:-mb-19 relative">
                    <h2
                        className="text-5xl md:text-8xl lg:text-[11rem] 2xl:text-[13rem] font-bold uppercase tracking-[0.05em] text-center leading-[1.1] md:leading-[0.85] mb-12 font-orbit"
                    >
                        Innovation<br />
                        in <span className="text-[#5ce1e6]">our</span><br />
                        DNA
                    </h2>


                </div>


            </ContentWrapper>
        </section>
    )
}
