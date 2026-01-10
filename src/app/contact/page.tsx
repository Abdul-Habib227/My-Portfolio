"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getDictionary } from "@/lib/i18n";
import { Mail, Github, Instagram, Linkedin, Send } from "lucide-react";

export default function ContactPage() {
    const dict = getDictionary();
    const containerRef = useRef(null);
    const formRef = useRef(null);

    useGSAP(() => {
        gsap.from(".contact-info", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        });

        gsap.from(formRef.current, {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen pt-40 pb-20 px-8 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="contact-info space-y-12">
                    <div>
                        <h1 className="text-6xl font-black mb-6 gradient-text">{dict.contact.title}</h1>
                        <p className="text-xl text-text-muted">{dict.contact.subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        <a href="mailto:hello@abdulhabib.com" className="flex items-center gap-4 text-xl hover:text-primary transition-colors">
                            <div className="p-4 bg-card rounded-2xl border border-muted">
                                <Mail size={24} />
                            </div>
                            hello@abdulhabib.com
                        </a>
                    </div>

                    <div className="flex gap-4">
                        {[Instagram, Linkedin, Github].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="p-4 bg-card border border-muted rounded-2xl hover:border-primary hover:text-primary transition-all hover:-translate-y-2"
                            >
                                <Icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>

                <form
                    ref={formRef}
                    className="p-12 bg-card border border-muted rounded-3xl space-y-6 shadow-2xl"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-text-muted">{dict.contact.name_label}</label>
                        <input
                            type="text"
                            className="w-full bg-background border border-muted rounded-xl p-4 focus:border-primary outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-text-muted">{dict.contact.email_label}</label>
                        <input
                            type="email"
                            className="w-full bg-background border border-muted rounded-xl p-4 focus:border-primary outline-none transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-text-muted">{dict.contact.message_label}</label>
                        <textarea
                            rows={5}
                            className="w-full bg-background border border-muted rounded-xl p-4 focus:border-primary outline-none transition-colors resize-none"
                            placeholder="Your message..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-5 bg-primary text-background font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Send size={20} />
                        {dict.contact.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}
