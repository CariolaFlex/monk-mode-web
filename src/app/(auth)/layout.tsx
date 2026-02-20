export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            {children}
        </div>
    );
}
