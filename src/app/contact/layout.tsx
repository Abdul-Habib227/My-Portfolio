import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Abdul Habib for collaboration on Graphic Design and Video Editing projects.",
    openGraph: {
        title: "Contact Abdul Habib | Graphic Designer & Video Editor",
        description: "Get in touch with Abdul Habib for collaboration.",
    }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
