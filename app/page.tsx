import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FolderGit2,
  Trophy,
  Compass,
  GraduationCap,
  Users2,
  Star,
  ExternalLink,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import { HeroSection } from "@/components/dashboard/hero-section";
import { LiveMetricsDashboard } from "@/components/dashboard/live-metrics";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_PROJECTS,
  MOCK_MEMBERS,
  MOCK_OPPORTUNITIES,
  MOCK_FIRST_PR_STORIES,
  MOCK_LEADERBOARD,
} from "@/lib/data/mock-data";

export default function HomePage() {
  const featuredProjects = MOCK_PROJECTS.filter((p) => p.featured).slice(0, 4);
  const spotlightMembers = MOCK_MEMBERS.filter((m) => m.featured).slice(0, 3);
  const featuredOpportunities = MOCK_OPPORTUNITIES.slice(0, 3);
  const topContributors = MOCK_LEADERBOARD.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Metrics Dashboard */}
      <LiveMetricsDashboard />

      {/* 3. Featured Open-Source Projects */}
      <section className="py-16 border-t border-slate-800/60 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                <FolderGit2 className="h-4 w-4" />
                <span>Ecosystem Repositories</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
                Featured Open-Source Projects
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Built and maintained by ZenithenOpen engineers at S-VYASA. Production systems solving real-world challenges.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="outline" size="sm" className="group">
                <span>View All 26 Projects</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="group relative overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-[10px]">
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1 line-clamp-1 text-slate-400">
                        {project.tagline}
                      </CardDescription>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-amber-400 bg-slate-900/90 px-2 py-1 rounded-md border border-slate-800 shrink-0">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-200">{project.stars}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="flex items-center space-x-1 text-xs text-slate-300 mr-2 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: project.languageColor }}
                      />
                      <span className="font-medium">{project.primaryLanguage}</span>
                    </span>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/40">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-slate-400">Maintainers:</span>
                      <div className="flex -space-x-1.5">
                        {project.maintainers.map((m) => (
                          <img
                            key={m.username}
                            src={m.avatarUrl}
                            alt={m.name}
                            title={`${m.name} (@${m.username})`}
                            className="h-5 w-5 rounded-full ring-1 ring-slate-800 object-cover"
                          />
                        ))}
                      </div>
                    </div>

                    {project.goodFirstIssuesCount > 0 && (
                      <Badge variant="beginner" className="text-[10px] font-medium">
                        {project.goodFirstIssuesCount} Good First Issues
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <span>github.com/zenithenopen/{project.slug}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <Link href={`/projects`}>
                    <Button variant="ghost" size="sm" className="text-xs text-blue-400 hover:text-blue-300">
                      Explore Repo →
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Opportunity Board Highlight */}
      <section className="py-16 border-t border-slate-800/60 bg-[#090d16]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Compass className="h-4 w-4" />
                <span>Beginner Friendly Gateway</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
                Curated First Contributions
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Hand-picked GitHub issues with mentor guidance, clear reproduction steps, and friendly reviews.
              </p>
            </div>
            <Link href="/opportunities">
              <Button variant="emerald" size="sm" className="group">
                <span>View All 45+ Issues</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredOpportunities.map((opp) => (
              <Card
                key={opp.id}
                className="p-5 glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-blue-400">
                      {opp.repository} #{opp.issueNumber}
                    </span>
                    <Badge variant="beginner" className="text-[10px] capitalize">
                      {opp.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                    {opp.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {opp.labels.map((l) => (
                      <span
                        key={l.name}
                        className="rounded px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          backgroundColor: `${l.color}20`,
                          color: l.color,
                          border: `1px solid ${l.color}40`,
                        }}
                      >
                        {l.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  {opp.mentorAssigned && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={opp.mentorAssigned.avatarUrl}
                        alt={opp.mentorAssigned.name}
                        className="h-5 w-5 rounded-full object-cover ring-1 ring-emerald-500"
                      />
                      <span className="text-slate-400 text-[11px]">
                        Mentor: <strong className="text-slate-200">{opp.mentorAssigned.name}</strong>
                      </span>
                    </div>
                  )}
                  <a
                    href={opp.issueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-medium"
                  >
                    <span>Start Issue</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Member Spotlights */}
      <section className="py-16 border-t border-slate-800/60 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                <Sparkles className="h-4 w-4" />
                <span>Student Leaders & Maintainers</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
                Member Spotlights
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Highlighting our core project maintainers, GSoC scholars, and active open-source mentors.
              </p>
            </div>
            <Link href="/members">
              <Button variant="outline" size="sm" className="group">
                <span>View All 2,140+ Members</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlightMembers.map((member) => (
              <Card key={member.id} className="p-6 glass-panel glass-panel-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3.5 mb-4">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/60"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        @{member.username} • {member.department}
                      </p>
                    </div>
                  </div>

                  {member.spotlightQuote && (
                    <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs italic text-blue-200 mb-3">
                      &ldquo;{member.spotlightQuote}&rdquo;
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {member.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.skills.slice(0, 3).map((s) => (
                      <span
                        key={s.name}
                        className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 font-medium border border-slate-700/50"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>{member.mergedPrCount} PRs merged</span>
                  <Link href="/members" className="text-blue-400 hover:text-blue-300 font-medium">
                    Profile →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contributor Leaderboard & Spotlight Section */}
      <section className="py-16 border-t border-slate-800/60 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Leaderboard Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                    <Trophy className="h-4 w-4" />
                    <span>Community Leaderboard</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                    Top Contributors This Month
                  </h2>
                </div>
                <Link href="/leaderboard">
                  <Button variant="ghost" size="sm" className="text-xs text-purple-400">
                    Full Standings →
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {topContributors.map((entry) => (
                  <div
                    key={entry.member.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 font-mono text-xs font-bold text-slate-300">
                        #{entry.rank}
                      </div>
                      <img
                        src={entry.member.avatarUrl}
                        alt={entry.member.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-800"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-white">
                            {entry.member.name}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            @{entry.member.username}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <Badge variant="outline" className="text-[10px] py-0">
                            {entry.badge}
                          </Badge>
                          <span className="text-[11px] text-slate-400 flex items-center">
                            <Flame className="h-3 w-3 text-orange-400 mr-1" />
                            {entry.streakDays}d streak
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-blue-400">
                        {entry.prsMerged} PRs
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {entry.codeReviews} reviews
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Spotlight Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  <span>Member Stories</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                  First PR Hall of Fame
                </h2>
              </div>

              {MOCK_FIRST_PR_STORIES.slice(0, 2).map((story) => (
                <Card
                  key={story.id}
                  className="p-5 glass-panel border-l-4 border-l-purple-500 space-y-3"
                >
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={story.memberAvatar}
                        alt={story.memberName}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {story.memberName}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Merged PR #{story.prNumber} in {story.repoName}
                        </p>
                      </div>
                    </div>
                    <Badge variant="beginner" className="text-[10px]">
                      {story.category}
                    </Badge>
                  </div>
                </Card>
              ))}

              <Link href="/achievements" className="block">
                <Button variant="outline" className="w-full text-xs">
                  Read More First PR Journeys →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Learning Paths Teaser */}
      <section className="py-16 border-t border-slate-800/60 bg-[#090d16]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs text-purple-300 mb-4">
            <GraduationCap className="h-3.5 w-3.5 text-purple-400" />
            <span>Structured Open Source Curriculums</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            From First Commit to Google Summer of Code
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300">
            Follow battle-tested learning roadmaps created by S-VYASA alumni who have contributed to global open-source foundations.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-blue-500/40 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-blue-400 mb-3">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-base">React & Next.js</h3>
              <p className="text-xs text-slate-400 mt-1">App router, server actions, design systems & accessibility standards.</p>
              <span className="inline-block mt-3 text-xs text-blue-400 font-medium">6 Weeks • 480 Enrolled</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-purple-500/40 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-purple-400 mb-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Python + Open AI</h3>
              <p className="text-xs text-slate-400 mt-1">PyTorch modules, Hugging Face pipelines, and bio-signal data science.</p>
              <span className="inline-block mt-3 text-xs text-purple-400 font-medium">8 Weeks • 520 Enrolled</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/40 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-3">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-base">DevOps & Cloud</h3>
              <p className="text-xs text-slate-400 mt-1">Docker internals, Kubernetes clusters, and GitHub Actions CI/CD.</p>
              <span className="inline-block mt-3 text-xs text-emerald-400 font-medium">6 Weeks • 310 Enrolled</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/40 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-amber-900/60 border border-amber-700/50 flex items-center justify-center text-amber-400 mb-3">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-base">GSoC Playbook</h3>
              <p className="text-xs text-slate-400 mt-1">Proposal drafting, org selection, maintainer networking, and interview prep.</p>
              <span className="inline-block mt-3 text-xs text-amber-400 font-medium">8 Weeks • 650 Enrolled</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/learning">
              <Button size="lg" variant="default" className="shadow-blue-600/30">
                Explore All Learning Roadmaps
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action */}
      <section className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-slate-950 to-blue-950/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to ship your first commit?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join S-VYASA University&apos;s open-source engineering movement.
            Get paired with a student mentor, pick up an issue, and see your code merged into production.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/opportunities">
              <Button size="lg" variant="emerald" className="gap-2">
                <Compass className="h-5 w-5" />
                <span>Browse Starter Issues</span>
              </Button>
            </Link>
            <Link href="/mentorship">
              <Button size="lg" variant="outline" className="gap-2">
                <Users2 className="h-5 w-5" />
                <span>Request a Mentor</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
