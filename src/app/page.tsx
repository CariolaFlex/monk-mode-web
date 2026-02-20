import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/20 blur-[120px] rounded-[100%] pointer-events-none" />

            <main className="max-w-3xl text-center z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium mb-8">
                    <span className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></span>
                    Monk Mode Pro 2.0 ya disponible
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-6">
                    Forja tu Disciplina.
                    <br className="hidden md:block" /> Conquista tus Metas.
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
                    La plataforma definitiva de gestión de retos personales basada en el protocolo Monk Mode.
                    Rastrea hábitos, analiza tu rendimiento y mantén el enfoque extremo.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/login"
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] group"
                    >
                        Comenzar Ahora
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </main>

            {/* Grid background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
    );
}
