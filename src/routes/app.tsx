import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AIAssistant } from "@/components/km/AIAssistant";
import { Footer, MobileNav, Navbar } from "@/components/km/Navbar";
import { AnimatedBackground } from "@/components/km/primitives";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 md:pb-16">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <AIAssistant />
    </div>
  );
}
