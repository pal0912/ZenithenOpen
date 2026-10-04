import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono mb-3">
          <Rocket className="h-4 w-4" />
          <span>Initiatives & Fellowships</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          ZenithenOpen Programs
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          All programs, nothing is big or small.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 sm:p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
            <Rocket className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Programs Registry In Development</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            From first-time documentation sprints to Google Summer of Code cohorts and campus hackathons, every program is treated with equal engineering rigor.
          </p>
          <div className="mt-6">
            <Link href="/learning">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                Explore Current Learning Modules
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
