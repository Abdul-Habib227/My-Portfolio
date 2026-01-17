export default function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Abdul Habib",
        "jobTitle": "Graphic Designer & Video Editor",
        "url": "https://my-portfolio-eoc1.vercel.app",
        "sameAs": [
            "https://www.instagram.com/habibsohail227?igsh=ZzlxZXZhcGlvNGt3",
            // Add other social links if available
        ],
        "description": "Professional Graphic Designer and Video Editor specialized in high-end visual content creation."
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
