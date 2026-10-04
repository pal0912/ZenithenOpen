import Link from "next/link";
import { ArrowLeft, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
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
          <Users2 className="h-4 w-4" />
          <span>Student Developers & Mentors</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Community
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          our community :))
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 sm:p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
            <Users2 className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Open-Source Community Directory</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Connect with peer contributors, collaborate on campus repositories, and participate in technical code reviews.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/members">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                View Member Directory
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button size="sm" variant="outline" className="border-border text-xs text-foreground">
                Check Contributor Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
