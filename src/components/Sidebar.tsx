"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, LayoutTemplate, Settings, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Trackers", href: "/trackers", icon: Target },
        { name: "Template Library", href: "/templates", icon: LayoutTemplate },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <aside className="w-64 bg-neutral-950 border-r border-neutral-800 h-screen flex flex-col flex-shrink-0 sticky top-0 hidden md:flex">
            {/* Profile Section */}
            <div className="p-6 border-b border-neutral-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 overflow-hidden shrink-0 border border-neutral-700">
                    {user?.photoURL ? (
                        <Image src={user.photoURL} alt="Avatar" width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                        <User size={24} />
                    )}
                </div>
                <div className="overflow-hidden">
                    <div className="text-sm font-bold text-neutral-100 truncate">{user?.displayName || "Monk"}</div>
                    <div className="text-xs font-mono text-emerald-500 mt-0.5">PRO PLAN</div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
                <div className="text-xs font-bold text-neutral-500 mb-4 px-2 uppercase tracking-wider">
                    Main Menu
                </div>

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                ? "bg-neutral-800 text-neutral-100 shadow-sm"
                                : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                                }`}
                        >
                            <Icon size={18} className={isActive ? "text-emerald-500" : ""} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Footer Settings/Logout */}
            <div className="p-4 border-t border-neutral-800 space-y-2">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Log Out
                </button>
            </div>
        </aside>
    );
}
