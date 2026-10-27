"use client"

import type { CSSProperties } from "react"

const features = [
    {
        title: "Unified Perception",
        desc: "Fuses inputs from multiple sensors in real time to generate a coherent and reliable understanding of the operating environment."
    },
    {
        title: "Coordinated Teaming",
        desc: "Enables multiple autonomous systems to collaborate dynamically, share intent, and execute missions as a synchronized unit."
    },
    {
        title: "Autonomous Navigation",
        desc: "Continuously computes and adapts optimal mission paths based on terrain, obstacles, and mission objectives."
    },
    {
        title: "Resilient Denied Ops",
        desc: "Maintains mission continuity in environments where GPS signals are unavailable and communications are degraded or lost."
    }
]

export default function AIHowItWorks() {
    return (
        <section className="ai-how-it-works font-orbit" aria-label="AI Pilot capabilities in action">
            <div className="ai-how-columns">
                {features.map((item, index) => (
                    <article key={item.title} style={{ '--scene-position': `${index * 100 / 3}%` } as CSSProperties}>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </article>
                ))}
            </div>
            <style jsx>{`
                .ai-how-it-works {
                    position: relative;
                    height: 100svh;
                    color: white;
                    background: #111;
                    isolation: isolate;
                }
                .ai-how-columns {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: repeat(4, minmax(0, 1fr));
                    height: 100%;
                }
                article {
                    display: grid;
                    grid-template-rows: auto minmax(0, 1fr) auto;
                    min-height: 0;
                    padding: clamp(8px, 1.5svh, 14px) 5vw;
                    background-image: linear-gradient(180deg, rgba(0,0,0,.65), transparent 35%, transparent 55%, rgba(0,0,0,.85)), url('/ai-pilot/ai-how-it-works-mobile.png');
                    background-size: 100% 100%, 100% 400%;
                    background-position: center, center var(--scene-position);
                    background-repeat: no-repeat;
                }
                h3 { margin: 0; text-align: center; font-size: clamp(12px, 3.8vw, 17px); font-weight: 500; line-height: 1.25; text-wrap: balance; }
                p { grid-row: 3; margin: 0 auto; max-width: 52ch; font-size: clamp(9px, 2.5vw, 11px); line-height: 1.4; color: #efefef; }
                @media (min-width: 768px) {
                    .ai-how-it-works { height: auto; min-height: 100svh; }
                    .ai-how-columns { height: auto; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(2, auto minmax(12rem, 1fr) auto); }
                    article {
                        grid-row: span 3;
                        grid-template-rows: subgrid;
                        min-height: 0;
                        padding: 3rem 3vw;
                        border-right: 1px solid rgba(255,255,255,.18);
                        background-image: linear-gradient(180deg, rgba(0,0,0,.65), transparent 35%, transparent 55%, rgba(0,0,0,.85)), url('/ai-pilot/how_it_works.png');
                        background-size: 100% 100%, 400% 100%;
                        background-position: center, var(--scene-position) center;
                    }
                    h3 { font-size: 22px; }
                    p { font-size: 14px; line-height: 1.8; }
                }
                @media (min-width: 1200px) {
                    .ai-how-it-works { background: #111 url('/ai-pilot/how_it_works.png') center / 100% 100% no-repeat; }
                    .ai-how-it-works::before { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 24%, transparent 45%, rgba(0,0,0,.25) 65%, rgba(0,0,0,.85) 100%); }
                    .ai-how-columns { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: auto minmax(14rem, 1fr) auto; min-height: 100svh; }
                    article { background: none; min-height: 0; padding: clamp(5rem, 12svh, 8rem) 2vw clamp(2rem, 5svh, 4rem); }
                    article:last-child { border-right: 0; }
                    h3 { font-size: clamp(17px, 1.35vw, 25px); }
                    p { margin: 0; max-width: none; font-size: clamp(14px, .95vw, 17px); }
                }
            `}</style>
        </section>
    )
}
