import fs from "fs";
import path from "path";

export interface Project {
    slug: string;
    name: string;
    file: string;
    type: "image" | "video";
}

export function getProjects(): Project[] {
    const projectsDir = path.join(process.cwd(), "portfolio projects");
    if (!fs.existsSync(projectsDir)) return [];

    const files = fs.readdirSync(projectsDir);

    return files
        .filter((file) => !file.startsWith('.')) // Ignore hidden files
        .map((file) => {
            const name = file.replace(/\.[^/.]+$/, ""); // Remove extension
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const ext = path.extname(file).toLowerCase();
            const type = [".mp4", ".mov", ".webm"].includes(ext) ? "video" : "image";

            return {
                slug,
                name,
                file,
                type,
            } as Project;
        });
}
