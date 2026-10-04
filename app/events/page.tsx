"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Flame,
  Award,
  Users,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/components/navigation/navigation-context";

export default function EventsPage() {
  const { activeSection } = useNavigation();

  // Default to Upcoming
  const currentTab = activeSection || "upcoming";

  const upcomingEvents = [
    {
      title: "Git & GitHub Masterclass: From Clone to First PR",
      category: "Workshop",
      date: "Saturday, Oct 11, 2026",
      time: "10:00 AM - 1:00 PM IST",
      location: "IST Computer Lab 3 & Online Discord",
      description:
        "Hands-on terminal workshop covering git branches, forks, conventional commits, and submitting pull requests with zero fear.",
      tags: ["Beginner Friendly", "Git", "Hands-on"],
      rsvpLink: "https://github.com/IST-ZenithenLab/ZenithenOpen",
    },
    {
      title: "Open Source Saturday: Weekly Live PR Reviews",
      category: "Community Office Hours",
      date: "Every Saturday",
      time: "4:00 PM - 6:30 PM IST",
      location: "ZenithenOpen Discord #code-review",
      description:
        "Join core maintainers to review open campus pull requests, debug merge conflicts, and collaborate on production issues.",
      tags: ["Weekly", "Code Review", "Mentorship"],
      rsvpLink: "https://github.com/IST-ZenithenLab/ZenithenOpen",
    },
    {
      title: "GSoC 2027 Proposal Drafting & Mentorship Session",
      category: "Fellowship Talk",
      date: "Wednesday, Oct 22, 2026",
      time: "6:00 PM - 8:00 PM IST",
      location: "IST Seminar Hall B",
      description:
        "Past Google Summer of Code scholars break down proposal templates, organization selection strategies, and timeline roadmaps.",
      tags: ["GSoC", "Mentorship", "Global"],
      rsvpLink: "https://github.com/IST-ZenithenLab/ZenithenOpen",
    },
  ];

  const hackathons = [
    {
      name: "ZenithHacks 2026: Campus Flagship Hackathon",
      status: "Registration Open",
      duration: "36 Hours Sprint",
      focus: "Open Source for Campus & Social Impact",
      description:
        "Our marquee student hackathon bringing together cross-disciplinary engineers to build production open-source tools with mentor support.",
      prizes: "₹1,00,000+ Prize Pool + Swag & Cloud Credits",
      highlights: ["36 Hours In-Person", "Hardware & Software Tracks", "Industry Judges"],
    },
    {
      name: "Smart India Hackathon (SIH) Internal Selection",
      status: "Annual Track",
      duration: "Internal Evaluation",
      focus: "Government & Enterprise Problem Statements",
      description:
        "Rigorous campus ideation, prototype vetting, and team mentoring to represent IST at the national Smart India Hackathon.",
      prizes: "National Stage Nomination + Incubation Support",
      highlights: ["Idea Review Panels", "Faculty Mentorship", "Prototype Staging"],
    },
    {
      name: "Hacktoberfest Campus Sprint",
      status: "October Annual",
      duration: "Month-long Sprint",
      focus: "Global Open-Source Pull Requests",
      description:
        "Month-long open-source celebration with dedicated campus issue boards, automated PR verification, and contributor swag.",
      prizes: "Official Hacktoberfest Digital Badges + ZenithenOpen Swag",
      highlights: ["4+ Merged PRs Goal", "Dedicated Mentor Helpdesk", "Swag Tiers"],
    },
  ];

  const achievements = [
    {
      title: "Smart India Hackathon (SIH) National Finalists",
      year: "2025",
      award: "National Finalist",
      description:
        "3 student teams from ZenithenOpen advanced to the national grand finale solving critical healthcare and logistics challenges.",
      icon: Trophy,
    },
    {
      title: "Hacktoberfest 100% Milestone Completion Cohort",
      year: "2025",
      award: "120+ Verified Completers",
      description:
        "Over 120 IST students successfully authored and merged four or more high-quality pull requests during the global sprint.",
      icon: Award,
    },
    {
      title: "Inter-College Code Sprint Podium Champions",
      year: "2025",
      award: "1st Place Winner",
      description:
        "IST developers clinched 1st position in regional algorithmic hackathons utilizing modern distributed architectures.",
      icon: Flame,
    },
    {
      title: "Campus Open-Source Repository Adoption",
      year: "2026",
      award: "1,500+ Campus Daily Users",
      description:
        "Campus projects developed by community members now power course evaluation and automated student notification systems.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-5xl">
        {/* Top Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
            <Calendar className="h-3.5 w-3.5" />
            <span>Sessions & Hackathons</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            ZenithenOpen Events
          </h1>

          <div className="p-4 rounded-xl border border-border bg-card/60">
            <p className="text-base font-semibold text-primary">
              &ldquo;upcoming events&rdquo;
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Explore upcoming coding workshops, weekly hack hours, and celebrate student achievements. Switch between events using the top navbar options.
            </p>
          </div>
        </div>

        {/* ONLY THE SELECTED EVENT SECTION - NO OTHER THINGS */}
        <div className="mt-10">
          {/* Section: Upcoming */}
          {currentTab === "upcoming" && (
            <section className="space-y-6 rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-10 shadow-lg shadow-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2.5 py-0.5 rounded-md bg-muted border border-border">
                      Schedule & Workshops
                    </span>
                    <h2 className="text-2xl font-bold text-foreground mt-1">Upcoming Events</h2>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground hidden sm:inline-block">
                  3 Events Scheduled
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {upcomingEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                          {evt.category}
                        </span>
                        {evt.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-muted border border-border/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-foreground">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                        {evt.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1 font-mono">
                        <span className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-primary" />
                          {evt.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                          {evt.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
                          {evt.location}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 self-start md:self-center">
                      <Link href={evt.rsvpLink} target="_blank" rel="noreferrer">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer">
                          <span>RSVP & Details</span>
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Hackathons */}
          {currentTab === "hackathons" && (
            <section className="space-y-6 rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-10 shadow-lg shadow-primary/5">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2.5 py-0.5 rounded-md bg-muted border border-border">
                    Competitions & Sprints
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mt-1">Hackathons & Sprints</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {hackathons.map((hack, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                          {hack.status}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {hack.duration}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-foreground leading-snug">
                        {hack.name}
                      </h3>

                      <p className="text-xs font-medium text-primary mt-1">
                        {hack.focus}
                      </p>

                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {hack.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-border/80 space-y-1.5">
                        <p className="text-[11px] font-semibold text-foreground font-mono">
                          {hack.prizes}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {hack.highlights.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted/60"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <Link href="https://github.com/IST-ZenithenLab/ZenithenOpen" target="_blank" rel="noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-border text-xs text-foreground hover:bg-muted cursor-pointer"
                        >
                          <span>View Hackathon Track</span>
                          <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Achievements */}
          {currentTab === "achievements" && (
            <section className="space-y-6 rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-10 shadow-lg shadow-primary/5">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2.5 py-0.5 rounded-md bg-muted border border-border">
                    Podiums & Awards
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mt-1">Event Achievements</h2>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border border-border bg-card/60">
                <div className="text-center p-2">
                  <span className="text-2xl font-extrabold text-foreground font-mono">15+</span>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground font-mono mt-0.5">
                    Hackathons Competed
                  </p>
                </div>
                <div className="text-center p-2">
                  <span className="text-2xl font-extrabold text-primary font-mono">8</span>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground font-mono mt-0.5">
                    Podium Finishes
                  </p>
                </div>
                <div className="text-center p-2">
                  <span className="text-2xl font-extrabold text-foreground font-mono">₹2.5L+</span>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground font-mono mt-0.5">
                    Bounties Won
                  </p>
                </div>
                <div className="text-center p-2">
                  <span className="text-2xl font-extrabold text-accent font-mono">350+</span>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground font-mono mt-0.5">
                    Hackathon PRs
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {achievements.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-xs font-bold text-primary font-mono px-2 py-0.5 rounded-md bg-muted border border-border">
                          {item.award}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground mt-3">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
