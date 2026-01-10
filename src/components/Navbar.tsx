"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getDictionary } from "@/lib/i18n";

export default function Navbar() {
    const dict = getDictionary();
    const pathname = usePathname();
    const navRef = useRef(null);

    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        });
    }, { scope: navRef });

    const navItems = [
        { label: dict.nav.home, href: "/" },
        { label: dict.nav.about, href: "/about" },
        { label: dict.nav.services, href: "/services" },
        { label: dict.nav.portfolio, href: "/portfolio" },
        { label: dict.nav.contact, href: "/contact" },
    ];

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 glass"
        >
            <Link href="/" className="text-2xl font-bold gradient-text">
                AH
            </Link>
            <div className="flex gap-8">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm uppercase tracking-widest hover:text-primary transition-colors ${pathname === item.href ? "text-primary" : "text-text-muted"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
