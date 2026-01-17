import { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import ProjectDetailView from "@/components/ProjectDetailView";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const projects = getProjects();
    const project = projects.find((p) => p.slug === slug);

    if (!project) return { title: "Project Not Found" };

    return {
        title: project.name,
        description: `Project details for ${project.name} - Graphic Design & Video Editing by Abdul Habib.`,
        openGraph: {
            title: `${project.name} | Abdul Habib`,
            description: `Check out the ${project.type} project: ${project.name}.`,
            images: [`/api/media?file=${encodeURIComponent(project.file)}`],
        }
    };
}

export default async function ProjectDetail({ params }: Props) {
    const { slug } = await params;
    const projects = getProjects();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailView project={project} />;
}
