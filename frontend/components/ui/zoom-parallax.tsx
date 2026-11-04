'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
    src: string;
    alt?: string;
    rotateOnMobile?: boolean;
}

interface ZoomParallaxProps {
    // PREVIOUS UI: The collage supported seven image positions.
    /** Images displayed in the original seven-slot parallax collage. */
    images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    // PREVIOUS UI: Eighth image at top -30vh, left 33vw, height 30vh, width 17vw.
    // PREVIOUS UI: on phones the third image kept its desktop 20vw x 45vh slot, cropping the 3:4 photo to a thin strip;
    // phones now use a 3:4 slot (33vw x 44vw) so the whole photo shows.
    return (
        <div ref={container} className="zoom-parallax-gallery relative h-[300vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {images.map(({ src, alt, rotateOnMobile }, index) => {
                    const scale = scales[index % scales.length];

                    return (
                        <motion.div
                            key={index}
                            // PREVIOUS UI: Full-viewport layers were scaled, creating oversized GPU tiles.
                            style={{ scale, top: "50%", left: "50%", width: 0, height: 0 }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw] [@media(max-width:767px)]:[&>div]:!-left-[30.5vw] [@media(max-width:767px)]:[&>div]:!h-[44vw] [@media(max-width:767px)]:[&>div]:!w-[33vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
                        >
                            {/* PREVIOUS UI: The photo box could shrink inside its flex layer. */}
                            <div className="zoom-parallax-photo relative h-[25vh] w-[25vw] shrink-0">
                                <img
                                    src={src || '/shared/placeholders/placeholder.svg'}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    // Keep each scaled photo on its own layer to prevent thin tile seams.
                                    // PREVIOUS UI: className="h-full w-full object-cover"
                                    className={`h-full w-full object-cover${rotateOnMobile ? " zoom-parallax-landscape" : ""}`}
                                    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
