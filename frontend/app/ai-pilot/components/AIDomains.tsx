"use client"

export default function AIDomains() {
    return (
        <section className="ai-domains font-orbit" aria-labelledby="ai-domains-title">
            <header className="domains-heading">
                <p className="domains-eyebrow">MAVERICK / AI-PILOT</p>
                <h2 id="ai-domains-title">Beyond the <span>signal.</span></h2>
            </header>

            <figure className="domains-image">
                <picture>
                <source media="(max-width: 767px)" srcSet="/ai-pilot/mobile-veiw.png" />
                <img
                    src="/ai-pilot/destop-veiw.png"
                    alt="Autonomous aircraft navigating a coastal island chain at sunset"
                    width={3120}
                    height={1328}
                    loading="lazy"
                    decoding="async"
                />
                </picture>
            </figure>

            <div className="domains-copy">
                <p className="domains-statement">When GPS drops and communications fail, manual control cannot sustain the mission.</p>
                <div className="domains-description">
                    <p>AI Pilot delivers hardware-agnostic autonomy that operates without user input, GPS, or comms — ensuring mission completion.</p>
                    <p className="domains-command">Warfighters remain commanders, not controllers.</p>
                </div>
            </div>

            <style jsx>{`
                .ai-domains {
                    min-height: 100svh;
                    padding: clamp(3rem, 5svh, 5rem) 5vw clamp(4rem, 8svh, 7rem);
                    display: grid;
                    align-content: center;
                    gap: clamp(1.5rem, 3svh, 3rem);
                    background: #080a0b;
                    color: #f5f5f5;
                }
                .domains-heading { text-align: center; }
                .domains-eyebrow { margin-bottom: 1rem; font-size: 11px; letter-spacing: .22em; color: #9aabad; }
                h2 { font-size: clamp(2rem, 4.2vw, 5rem); line-height: 1.1; font-weight: 400; letter-spacing: -.04em; }
                h2 span { color: #5ce1e6; }
                .domains-image { position: relative; width: 100%; height: clamp(18rem, 48svh, 40rem); margin: 0 auto; overflow: hidden; }
                .domains-image picture { display: block; width: 100%; height: 100%; }
                .domains-image img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
                .domains-copy { display: grid; grid-template-columns: 1fr 1fr; gap: 6vw; border-top: 1px solid #ffffff24; padding-top: clamp(1rem, 2.5svh, 2rem); }
                .domains-statement { max-width: 36em; font-size: clamp(16px, 1.2vw, 24px); line-height: 1.5; }
                .domains-description { font-size: clamp(13px, .9vw, 18px); line-height: 1.65; color: #a2a9ac; }
                .domains-command { margin-top: .8rem; color: #e1e7e8; }
                @media (max-width: 1023px) {
                    .domains-image { height: auto; aspect-ratio: 16 / 9; }
                    .domains-copy { grid-template-columns: 1fr; gap: 1.25rem; }
                }
                @media (max-width: 767px) {
                    .ai-domains { padding: 5.5rem 5vw 2.5rem; gap: 1.5rem; }
                    .domains-eyebrow { font-size: 9px; margin-bottom: .8rem; }
                    h2 { font-size: clamp(1.75rem, 7.4vw, 3rem); }
                    .domains-image { height: auto; aspect-ratio: 16 / 9; }
                    .domains-copy { grid-template-columns: 1fr; gap: 1.25rem; padding-top: 1.25rem; }
                    .domains-statement { font-size: 16px; }
                    .domains-description { font-size: 13px; }
                }
            `}</style>
        </section>
    )
}
