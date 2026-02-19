import HabitTracker from "@/components/HabitTracker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <HabitTracker />
      </main>
    </div>
  );
}
