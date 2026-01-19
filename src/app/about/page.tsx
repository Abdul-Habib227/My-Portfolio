"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getDictionary } from "@/lib/i18n";

export default function AboutPage() {
    const dict = getDictionary();
    const bioRef = useRef(null);
    const skillsRef = useRef(null);

    useEffect(() => {
        gsap.from(bioRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        });

        gsap.from(".skill-item", {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.5,
        });
    }, []);

    return (
        <div className="min-h-screen pt-40 pb-20 px-6 md:px-8 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div ref={bioRef}>
                    <h1 className="text-4xl md:text-5xl font-black mb-8 gradient-text">{dict.about.title}</h1>
                    <p className="text-xl text-text-muted leading-relaxed mb-8">
                        {dict.about.bio}
                    </p>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">{dict.about.skills_title}</h3>
                        <div ref={skillsRef} className="flex flex-wrap gap-4">
                            {dict.about.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="skill-item px-6 py-3 bg-card border border-muted rounded-full text-sm font-medium hover:border-primary transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                    {/* Add a professional image here if available, otherwise a placeholder gradient */}
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-8xl font-black text-white/10">AH</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
