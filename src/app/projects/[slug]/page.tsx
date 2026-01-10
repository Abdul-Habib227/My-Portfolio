"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Project } from "@/lib/projects";
import { getDictionary } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetail() {
    const { slug } = useParams();
    const router = useRouter();
    const dict = getDictionary();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data: Project[]) => {
                const found = data.find((p) => p.slug === slug);
                setProject(found || null);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!project) return <div className="h-screen flex items-center justify-center">Project not found</div>;

    return (
        <div className="min-h-screen pt-40 pb-20 px-8 max-w-[1200px] mx-auto">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-12"
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="w-full bg-black/20 rounded-3xl overflow-hidden flex items-center justify-center border border-muted min-h-[400px] max-h-[75vh]">
                    {project.type === "image" ? (
                        <img
                            src={`/api/media?file=${encodeURIComponent(project.file)}`}
                            alt={project.name}
                            className="max-w-full max-h-[75vh] object-contain shadow-2xl"
                        />
                    ) : (
                        <video
                            src={`/api/media?file=${encodeURIComponent(project.file)}`}
                            className="max-w-full max-h-[75vh] object-contain shadow-2xl"
                            controls
                            autoPlay
                            muted
                        />
                    )}
                </div>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-black mb-4">{project.name}</h1>
                        <p className="text-text-muted leading-relaxed">
                            This project showcases creative expertise in {project.type === "video" ? "Video Editing" : "Graphic Design"}.
                            Crafted with precision to meet professional standards and visual excellence.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-muted">
                        <h3 className="text-sm uppercase tracking-widest text-primary mb-4">Tools Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Adobe Creative Cloud", "After Effects", "Premiere Pro", "Photoshop"].map(tool => (
                                <span key={tool} className="px-3 py-1 bg-card rounded-md text-sm border border-muted">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
