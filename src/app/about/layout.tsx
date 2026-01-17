import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn more about Abdul Habib, a passionate Graphic Designer and Video Editor dedicated to visual excellence.",
    openGraph: {
        title: "About Abdul Habib | Graphic Designer & Video Editor",
        description: "Learn more about Abdul Habib, a passionate Graphic Designer and Video Editor.",
    }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
