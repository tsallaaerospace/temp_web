"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import FlowingMenu from "./FlowingMenu"

export default function InnovationSection() {
    const items = [
        {
            link: '#',
            text: 'Family First',
            image: '/careers/Familyfirst.jpg',
            description: 'Platinum medical, dental, and vision coverage.'
        },
        {
            link: '#',
            text: 'NextGen Care',
            image: '/careers/NextGen.jpg',
            description: 'Fertility benefits and future family planning.'
        },
        {
            link: '#',
            text: 'Life Leave',
            image: '/careers/lifeleave.jpg',
            description: 'Unlimited paid time off when life happens.'
        },
        {
            link: '#',
            text: 'Mind Support',
            image: '/careers/MindSupport.jpg',
            description: '24/7 coaching and mental wellness stipends.'
        },
        {
            link: '#',
            text: 'Career Boost',
            image: '/careers/careerboost.jpg',
            description: 'Annual learning budgets and global mentorship.'
        }
    ];

    return (
        <section className="w-full min-h-[100svh] flex flex-col justify-center bg-white text-black py-20 md:py-32 relative overflow-hidden">
            <ContentWrapper>
                <div className="flex flex-col items-center justify-center mb-4 md:-mb-19 relative">
                    <h2
                        className="careers-display-title uppercase text-center mb-12"
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
