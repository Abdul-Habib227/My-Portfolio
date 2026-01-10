"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";
import { Instagram, Linkedin, Github, Twitter, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const dict = getDictionary();
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="border-t border-muted bg-card px-8 pt-20 pb-12 mt-20">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand Section */}
                <div className="md:col-span-2 space-y-6">
                    <Link href="/" className="text-3xl font-black gradient-text">AH</Link>
                    <p className="text-text-muted max-w-sm leading-relaxed">
                        Leading with creativity and precision. Abdul Habib is a Graphic Designer and Video Editor
                        dedicated to crafting visual stories that resonate.
                    </p>
                    <div className="flex gap-4">
                        {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="p-3 bg-background border border-muted rounded-xl hover:border-primary hover:text-primary transition-all"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold uppercase tracking-widest text-primary">Explore</h4>
                    <ul className="space-y-4">
                        {[dict.nav.home, dict.nav.about, dict.nav.services, dict.nav.portfolio, dict.nav.contact].map((item, i) => (
                            <li key={i}>
                                <Link
                                    href={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    {item}
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact info shortcut */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold uppercase tracking-widest text-primary">Inquiries</h4>
                    <div className="space-y-4">
                        <a href="mailto:hello@abdulhabib.com" className="block text-text-muted hover:text-primary transition-colors">
                            hello@abdulhabib.com
                        </a>
                        <p className="text-sm text-text-muted leading-relaxed">
                            Based in Lahore, Pakistan.<br />
                            Available for freelance and permanent opportunities.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
                <div>&copy; {year} Abdul Habib. Built with passion & precision.</div>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
