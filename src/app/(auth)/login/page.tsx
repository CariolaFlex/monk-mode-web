"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
    const handleMockLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login redirect
        window.location.href = "/dashboard";
    };

    return (
        <div className="w-full max-w-md bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl z-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
                    Monk Mode
                </h1>
                <p className="text-neutral-500 mt-2 text-sm">
                    Entra a tu Plataforma Pro
                </p>
            </div>

            <form onSubmit={handleMockLogin} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        placeholder="ejemplo@monkmode.com"
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                    <span>Entrar</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-neutral-950 px-4 text-neutral-500">O</span>
                </div>
            </div>

            <button
                onClick={() => {
                    // Simulate simple Google auth redirect 
                    window.location.href = "/dashboard";
                }}
                className="w-full bg-white hover:bg-neutral-200 text-black font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-3"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                    <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                <span>Continuar con Google</span>
            </button>

            <p className="text-center text-xs text-neutral-600 mt-8">
                Al entrar aceptas nuestros{" "}
                <a href="#" className="underline hover:text-neutral-400">
                    Términos
                </a>{" "}
                y{" "}
                <a href="#" className="underline hover:text-neutral-400">
                    Privacidad
                </a>
                .
            </p>
        </div>
    );
}
