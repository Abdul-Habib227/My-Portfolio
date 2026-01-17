import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services",
    description: "Professional services offered by Abdul Habib, including Graphic Design, Video Editing, and Motion Graphics.",
    openGraph: {
        title: "Services | Abdul Habib",
        description: "Professional Graphic Design and Video Editing services.",
    }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
