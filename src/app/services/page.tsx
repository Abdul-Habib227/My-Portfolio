"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getDictionary } from "@/lib/i18n";
import { Monitor, Video, Layers } from "lucide-react";

export default function ServicesPage() {
    const dict = getDictionary();

    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".service-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
        });
    }, { scope: containerRef });

    const serviceItems = [
        {
            ...dict.services.graphic_design,
            icon: <Monitor size={48} className="text-primary" />,
        },
        {
            ...dict.services.video_editing,
            icon: <Video size={48} className="text-secondary" />,
        },
        {
            ...dict.services.motion_graphics,
            icon: <Layers size={48} className="text-accent" />,
        },
    ];

    return (
        <div ref={containerRef} className="min-h-screen pt-40 pb-20 px-6 md:px-8 max-w-[1200px] mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-16 gradient-text">{dict.services.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {serviceItems.map((service, index) => (
                    <div
                        key={index}
                        className="service-card group p-8 md:p-12 bg-card border border-muted rounded-3xl transition-all duration-500 hover:-translate-y-4 hover:border-primary hover:shadow-[0_0_50px_rgba(79,172,254,0.1)]"
                    >
                        <div className="mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                        <p className="text-text-muted leading-relaxed">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
