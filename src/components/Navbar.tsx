"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getDictionary } from "@/lib/i18n";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const dict = getDictionary();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        });
    }, { scope: navRef });

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        }
    }, { dependencies: [isOpen] });

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
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-6 glass"
        >
            <Link href="/" className="text-2xl font-bold gradient-text">
                AH
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
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

            {/* Mobile Toggle */}
            <button
                className="md:hidden text-foreground p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="absolute top-full left-0 w-full bg-card border-b border-muted p-8 flex flex-col gap-6 md:hidden glass"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-lg uppercase tracking-widest hover:text-primary transition-colors ${pathname === item.href ? "text-primary" : "text-text-muted"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
