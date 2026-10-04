import Link from "next/link";
import { ArrowLeft, BookOpen, GitPullRequest, GitFork, Terminal, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
  const steps = [
    {
      title: "1. Fork & Clone Repository",
      description: "Fork any IST-ZenithenLab repository on GitHub, then clone it locally onto your development machine.",
      command: "git clone https://github.com/<your-username>/ZenithenOpen.git",
    },
    {
      title: "2. Create a Feature Branch",
      description: "Always isolate changes into a dedicated branch before writing code.",
      command: "git checkout -b feature/my-first-contribution",
    },
    {
      title: "3. Verify Changes & Commit",
      description: "Ensure linting and tests pass before committing with clear, conventional messages.",
      command: 'git commit -m "feat: my descriptive contribution"',
    },
    {
      title: "4. Open Pull Request",
      description: "Push your feature branch and open a PR targeting the main development branch for peer review.",
      command: "git push -u origin feature/my-first-contribution",
    },
  ];

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
          <BookOpen className="h-4 w-4" />
          <span>Contributor Enablement</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Developer Resources
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Learn to make first PR
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center space-x-2.5 text-xs font-bold text-primary mb-2 font-mono">
                <CheckCircle2 className="h-4 w-4" />
                <span>{step.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>
              <div className="rounded-xl bg-muted/60 border border-border/80 p-3 font-mono text-[11px] text-foreground overflow-x-auto">
                <code>{step.command}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card/60 p-8 text-center">
          <h3 className="text-lg font-bold text-foreground">Looking for Triaged Issues?</h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
            Browse our curated opportunities board to find verified good first issues with mentor support.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/opportunities">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                Explore Good First Issues
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
