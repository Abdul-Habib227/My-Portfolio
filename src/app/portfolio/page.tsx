"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getDictionary } from "@/lib/i18n";
import { getProjects, Project } from "@/lib/projects";
import Link from "next/link";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage() {
    const dict = getDictionary();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const containerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setFilteredProjects(data);
            });
    }, []);

    useEffect(() => {
        if (activeCategory === "all") {
            setFilteredProjects(projects);
        } else if (activeCategory === "graphic") {
            setFilteredProjects(projects.filter(p => p.type === "image"));
        } else if (activeCategory === "video") {
            setFilteredProjects(projects.filter(p => p.type === "video"));
        }

        // Animate grid items when filter changes
        if (gridRef.current) {
            gsap.fromTo(".project-card",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", clearProps: "all" }
            );
        }
    }, [activeCategory, projects]);

    useGSAP(() => {
        if (projects.length > 0) {
            gsap.from(".project-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all" // Ensure no inline styles remain after animation
            });
            // Kill any previous ScrollTriggers to be safe
            ScrollTrigger.refresh();
        }
    }, { dependencies: [projects], scope: containerRef });

    return (
        <div className="min-h-screen pt-40 pb-20 px-8 max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <h1 className="text-5xl font-black gradient-text leading-tight">{dict.portfolio.title}</h1>

                <div className="flex bg-card p-1 rounded-2xl border border-muted w-full md:w-auto overflow-x-auto no-scrollbar">
                    {Object.entries(dict.portfolio.categories).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === key
                                ? "bg-primary text-background shadow-lg"
                                : "text-text-muted hover:text-foreground"
                                }`}
                        >
                            {label as string}
                        </button>
                    ))}
                </div>
            </div>

            <div
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredProjects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="project-card group relative block overflow-hidden rounded-2xl aspect-video bg-card"
                    >
                        {project.type === "image" ? (
                            <div className="w-full h-full flex items-center justify-center bg-black/40">
                                <img
                                    src={`/api/media?file=${encodeURIComponent(project.file)}`}
                                    alt={project.name}
                                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black/40 relative">
                                <video
                                    src={`/api/media?file=${encodeURIComponent(project.file)}`}
                                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    onMouseOver={(e) => e.currentTarget.play()}
                                    onMouseOut={(e) => e.currentTarget.pause()}
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                                    <div className="p-4 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 text-primary">
                                        <Play size={24} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                            <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                            <p className="text-sm text-primary font-medium">{dict.portfolio.view_project} →</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    );
}
