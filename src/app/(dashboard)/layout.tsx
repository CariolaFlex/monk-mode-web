"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, LayoutTemplate, Settings } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Trackers", href: "/trackers", icon: Target },
        { name: "Template Library", href: "/templates", icon: LayoutTemplate },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-black overflow-hidden relative">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Topbar */}
            <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-neutral-950 border-b border-neutral-800 z-40 flex items-center justify-between px-4">
                <div className="font-bold text-neutral-100 flex flex-col">
                    <span>Monk Mode</span>
                    <span className="text-[10px] text-emerald-500 uppercase tracking-widest">
                        Plataforma Pro
                    </span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-neutral-300"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bottom-0 bg-neutral-950 z-30 p-4 border-t border-neutral-800 flex flex-col gap-4 overflow-y-auto">
                    <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                        Main Menu
                    </div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                        ? "bg-neutral-800 text-neutral-100 shadow-sm"
                                        : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                                    }`}
                            >
                                <Icon size={18} className={isActive ? "text-emerald-500" : ""} />
                                {item.name}
                            </Link>
                        )
                    })}

                    <div className="border-t border-neutral-800 mt-4 pt-4">
                        <Link
                            href="/login"
                            className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-sm bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 font-bold transition-colors"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-0 pb-12 custom-scrollbar relative">
                <div className="max-w-[1400px] mx-auto w-full h-full min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
