"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
    const dict = getDictionary();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const ctaRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(titleRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        })
            .from(
                subRef.current,
                {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                },
                "-=0.5"
            )
            .from(
                ctaRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
                "-=0.3"
            );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-background">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
            </div>

            <div className="text-center">
                <h1
                    ref={titleRef}
                    className="text-7xl md:text-9xl font-black mb-4 tracking-tighter"
                >
                    {dict.hero.name}
                </h1>
                <p
                    ref={subRef}
                    className="text-xl md:text-2xl text-text-muted mb-16 font-light"
                >
                    {dict.hero.role}
                </p>
                <div ref={ctaRef}>
                    <Link
                        href="/portfolio"
                        className="px-8 py-4 bg-primary text-background font-bold rounded-full hover:scale-105 transition-transform inline-block"
                    >
                        {dict.hero.cta}
                    </Link>
                </div>
            </div>
        </section>
    );
}
