"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
    titleComponent,
    children,
    showFrame = true,
    maxWidth = "max-w-5xl",
    heightClassName = "h-[60rem] md:h-[80rem]",
    mobileOptimized = false,
    contentClassName,
    cardClassName,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
    showFrame?: boolean;
    maxWidth?: string;
    heightClassName?: string;
    mobileOptimized?: boolean;
    contentClassName?: string;
    cardClassName?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            // PREVIOUS UI: setIsMobile(window.innerWidth <= 768);
            setIsMobile(window.innerWidth < (mobileOptimized ? 640 : 769));
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, [mobileOptimized]);

    /* PREVIOUS MOBILE MOTION:
    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
    */
    const useCompactMobileMotion = mobileOptimized && isMobile;
    const rotate = useTransform(scrollYProgress, [0, 1], useCompactMobileMotion ? [6, 0] : [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], useCompactMobileMotion ? [1, 1] : [1.05, 1]);
    const translate = useTransform(scrollYProgress, [0, 1], useCompactMobileMotion ? [0, -32] : [0, -100]);

    return (
        <div
            className={cn(
                heightClassName,
                // PREVIOUS UI: every instance used `p-2 md:p-20`.
                mobileOptimized ? "relative flex items-center justify-center p-4 sm:p-2 md:p-20" : "relative flex items-center justify-center p-2 md:p-20"
            )}
            ref={containerRef}
        >
            <div
                // PREVIOUS UI: className="pt-40 pb-10 md:py-40 w-full relative"
                className={cn("relative w-full pt-40 pb-10 md:py-40", contentClassName)}
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale} showFrame={showFrame} maxWidth={maxWidth} className={cardClassName}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }: any) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="div max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({
    rotate,
    scale,
    children,
    translate,
    showFrame,
    maxWidth,
    className,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
    showFrame?: boolean;
    maxWidth?: string;
    className?: string;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow: showFrame ?
                    "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003" : "none",
            }}
            className={cn(
                " -mt-12 mx-auto w-full overflow-hidden",
                maxWidth,
                showFrame ? "h-[30rem] md:h-[40rem] border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl" : "h-auto border-none p-0 bg-transparent rounded-2xl",
                className
            )}
        >
            <div className={cn(
                "h-full w-full overflow-hidden",
                showFrame ? "rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4" : "rounded-2xl"
            )}>
                {children}
            </div>
        </motion.div>
    );
};
