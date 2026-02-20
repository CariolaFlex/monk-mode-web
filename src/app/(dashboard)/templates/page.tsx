import { Flame, BrainCircuit, Droplets, Zap, ChevronRight } from "lucide-react";

export default function TemplatesPage() {
    const templates = [
        {
            id: "t-1",
            name: "Detox Digital Absoluto",
            duration: "7 Días",
            focus: "Mindfulness",
            icon: BrainCircuit,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            description: "Cero redes sociales, cero entretenimiento basura. Solo tú y tus pensamientos.",
            habits: 5
        },
        {
            id: "t-2",
            name: "Monk Mode Clásico",
            duration: "30 Días",
            focus: "Productividad",
            icon: Flame,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            description: "La estructura original diseñada para lograr tus metas financieras y personales más grandes.",
            habits: 12
        },
        {
            id: "t-3",
            name: "75 Hard Adaptado",
            duration: "75 Días",
            focus: "Disciplina Física",
            icon: Droplets,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            description: "Dieta estricta, mucha agua, lectura y dos entrenamientos al día sin excusas.",
            habits: 6
        },
        {
            id: "t-4",
            name: "Acelerador de Proyectos",
            duration: "14 Días",
            focus: "Focus Extremo",
            icon: Zap,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            description: "Diseñado para lanzar ese proyecto que llevas procrastinando meses.",
            habits: 4
        }
    ];

    return (
        <div className="p-6 md:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mb-2">Librería de Plantillas</h1>
                <p className="text-neutral-500">Elige un camino predefinido y comienza un nuevo reto con un solo clic.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map((tpl) => {
                    const Icon = tpl.icon;
                    return (
                        <div key={tpl.id} className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all group flex flex-col justify-between shadow-xl">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${tpl.bg} ${tpl.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                                            {tpl.duration}
                                        </span>
                                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{tpl.habits} Hábitos</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-neutral-100 mb-2">{tpl.name}</h3>
                                <p className="text-sm text-neutral-500 line-clamp-2">{tpl.description}</p>
                            </div>

                            <div className="p-4 bg-neutral-900/50 border-t border-neutral-800 flex items-center justify-between">
                                <span className="text-xs font-medium text-neutral-400">Enfoque: {tpl.focus}</span>
                                <button className="flex items-center gap-1 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                                    Usar Plantilla
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
