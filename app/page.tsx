import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FolderGit2,
  Trophy,
  Compass,
  GraduationCap,
  Users2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { HeroSection } from "@/components/dashboard/hero-section";
import { LiveMetricsDashboard } from "@/components/dashboard/live-metrics";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/icons";
import {
  MOCK_PROJECTS,
  MOCK_OPPORTUNITIES,
  MOCK_LEADERBOARD,
} from "@/lib/data/mock-data";

export default function HomePage() {
  const featuredProjects = MOCK_PROJECTS.slice(0, 4);
  const featuredOpportunities = MOCK_OPPORTUNITIES.slice(0, 3);
  const topContributors = MOCK_LEADERBOARD.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Metrics Dashboard */}
      <LiveMetricsDashboard />

      {/* 3. Featured Open-Source Projects */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                <FolderGit2 className="h-4 w-4" />
                <span>Ecosystem Repositories</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
                Campus Project Catalog
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Open-source software maintained by IST engineers and student contributors.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="outline" size="sm" className="group text-xs border-border">
                <span>View Project Directory</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            /* Clean, high-tech empty state */
            <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
                <FolderGit2 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No Repositories Synced Yet</h3>
              <p className="mt-2 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Connect the <code className="text-primary font-mono bg-primary/10 px-1 py-0.5 rounded border border-primary/20">IST-ZenithenLab</code> GitHub organization or add repository URLs in the admin governance console to populate the catalog.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://github.com/IST-ZenithenLab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="default" className="gap-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>View GitHub Organization</span>
                  </Button>
                </a>
                <Link href="/admin">
                  <Button size="sm" variant="outline" className="text-xs border-border">
                    Open Admin Console
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border-border bg-card"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {project.name}
                          </a>
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground mt-0.5">
                          {project.tagline}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 text-xs font-semibold px-2.5 py-0.5">
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: project.languageColor }}
                      />
                      <span className="font-semibold text-foreground">{project.primaryLanguage}</span>
                    </div>
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="default" className="text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs">
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Opportunity Board Highlight */}
      <section className="py-20 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-accent font-mono">
                <Compass className="h-4 w-4" />
                <span>Beginner Gateway</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
                Good First Issues
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Triaged GitHub issues curated for first-time open-source contributors with mentor assistance.
              </p>
            </div>
            <Link href="/opportunities">
              <Button variant="outline" size="sm" className="group text-xs border-border">
                <span>Browse Opportunities</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {featuredOpportunities.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 text-accent mb-4">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No Open Issues Ingested Yet</h3>
              <p className="mt-2 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Once repositories are connected and issues are labeled with <code className="text-accent bg-accent/10 px-1 py-0.5 rounded border border-accent/20 font-mono">good-first-issue</code> on GitHub, they will appear dynamically here.
              </p>
              <div className="mt-6">
                <Link href="/programs">
                  <Button size="sm" variant="default" className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 5. Contributor Leaderboard & Hall of Fame */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Leaderboard Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-secondary font-mono">
                    <Trophy className="h-4 w-4" />
                    <span>Contributor Standings</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                    Monthly Leaderboard
                  </h2>
                </div>
                <Link href="/leaderboard">
                  <Button variant="ghost" size="sm" className="text-xs text-secondary hover:text-secondary hover:bg-secondary/10">
                    Full Standings →
                  </Button>
                </Link>
              </div>

              {topContributors.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-8 text-center shadow-xs">
                  <Trophy className="mx-auto h-8 w-8 text-secondary mb-2" />
                  <p className="text-sm font-semibold text-foreground">Leaderboard Awaiting First Pull Request</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    Contributions will be ranked automatically by merged PRs and code reviews once GitHub accounts are linked.
                  </p>
                  <Link href="/programs" className="inline-block mt-4">
                    <Button size="sm" variant="outline" className="text-xs border-border">
                      Explore Programs
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>

            {/* Hall of Fame Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-accent font-mono">
                  <Sparkles className="h-4 w-4" />
                  <span>Recognition</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                  First PR Hall of Fame
                </h2>
              </div>

              <div className="rounded-xl border border-border bg-card p-8 text-center shadow-xs">
                <Sparkles className="mx-auto h-8 w-8 text-accent mb-2" />
                <p className="text-sm font-semibold text-foreground">Celebrate Your First Contribution</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Every student who merges their first pull request receives permanent recognition in the community Hall of Fame.
                </p>
                <Link href="/achievements" className="inline-block mt-4">
                  <Button size="sm" variant="outline" className="text-xs border-border">
                    View Hall of Fame
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 7. Bottom Call to Action */}
      <section className="py-24 border-t border-border bg-gradient-to-b from-card/30 via-background to-card/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Ready to ship your first commit?
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Join IST&apos;s open-source engineering chapter.
            Connect with campus mentors, choose a roadmap, and see your code merged into production.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/programs">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <Compass className="h-5 w-5" />
                <span>Explore Programs</span>
              </Button>
            </Link>
            <Link href="/mentorship">
              <Button size="lg" variant="outline" className="gap-2 border-border">
                <Users2 className="h-5 w-5" />
                <span>Mentorship Program</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
