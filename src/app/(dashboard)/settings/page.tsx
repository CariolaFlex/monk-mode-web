"use client";

import { useState } from "react";
import { User, Bell, Shield, Paintbrush, Save } from "lucide-react";

export default function SettingsPage() {
    const [name, setName] = useState("CariolaFlex");
    const [email, setEmail] = useState("hola@cariolaflex.com");
    const [notifications, setNotifications] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(true);

    return (
        <div className="p-6 md:p-10 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mb-2">Configuración</h1>
                <p className="text-neutral-500">Gestiona tu perfil, preferencias y notificaciones.</p>
            </header>

            <div className="space-y-8">
                {/* Profile Section */}
                <section className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="border-b border-neutral-800 p-6 flex items-center gap-4">
                        <div className="p-3 bg-neutral-900 rounded-xl text-neutral-400">
                            <User size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-neutral-200">Perfil Público</h2>
                            <p className="text-sm text-neutral-500">Información visible para otros Monks (próximamente).</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-2xl font-bold border-2 border-dashed border-neutral-700 hover:border-emerald-500 hover:text-emerald-500 cursor-pointer transition-colors shadow-inner">
                                {name.charAt(0)}
                            </div>
                            <div>
                                <button className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-sm font-medium text-neutral-300 transition-colors">
                                    Cambiar Avatar
                                </button>
                                <p className="text-xs text-neutral-600 mt-2">Formatos: JPG, PNG, GIF. Max 5MB.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preferences Section */}
                <section className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="border-b border-neutral-800 p-6 flex items-center gap-4">
                        <div className="p-3 bg-neutral-900 rounded-xl text-neutral-400">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-neutral-200">Notificaciones</h2>
                            <p className="text-sm text-neutral-500">Decide qué correos quieres recibir.</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-200">Recordatorios Diarios</h3>
                                <p className="text-xs text-neutral-500">Recibe un correo si no has marcado tus hábitos a las 8PM.</p>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? 'bg-emerald-500' : 'bg-neutral-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                        <div className="w-full h-px bg-neutral-800" />
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-200">Resumen Semanal</h3>
                                <p className="text-xs text-neutral-500">Un reporte de tu cumplimiento y rachas cada domingo.</p>
                            </div>
                            <button
                                onClick={() => setWeeklyReport(!weeklyReport)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${weeklyReport ? 'bg-emerald-500' : 'bg-neutral-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${weeklyReport ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-8 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2">
                        <Save size={18} />
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
