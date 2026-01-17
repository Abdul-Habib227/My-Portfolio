import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Explore the creative portfolio of Abdul Habib featuring Graphic Design and Video Editing projects.",
    openGraph: {
        title: "Portfolio | Abdul Habib",
        description: "Explore the creative projects by Abdul Habib.",
    }
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
