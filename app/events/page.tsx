"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/components/navigation/navigation-context";

export default function EventsPage() {
  const { popupSection, closePopup, openPopup, activeSection } = useNavigation();

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
              Explore upcoming coding workshops, weekly open-source hack hours, and celebrate our community&apos;s proud hackathon achievements. Click any option in the top navbar to view details.
            </p>
          </div>
        </div>

        {/* Section Contents - Clean without in-page filter bar */}
        <div className="mt-10 space-y-12">
          {/* Upcoming Section */}
          <section id="upcoming" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openPopup("upcoming")}
                className="border-border text-xs text-foreground cursor-pointer"
              >
                <span>Upcoming Details</span>
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="space-y-4">
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

          {/* Hackathons Section */}
          <section id="hackathons" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Hackathons & Sprints</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openPopup("hackathons")}
                className="border-border text-xs text-foreground cursor-pointer"
              >
                <span>Hackathons Details</span>
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openPopup("hackathons")}
                      className="w-full border-border text-xs text-foreground hover:bg-muted cursor-pointer"
                    >
                      <span>View Hackathon Track</span>
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Section */}
          <section id="achievements" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Event Achievements</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openPopup("achievements")}
                className="border-border text-xs text-foreground cursor-pointer"
              >
                <span>Achievements Details</span>
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-3">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            Have an Event Idea or Want to Host a Workshop?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            We support any student who wants to present a technical session, lead a study sprint, or run a campus hackathon.
          </p>
          <div className="mt-4">
            <Link href="https://github.com/IST-ZenithenLab/ZenithenOpen/issues" target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="border-border text-xs text-foreground cursor-pointer">
                <span>Propose a Session on GitHub</span>
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Events Section Popup Dialog Modal */}
      <AnimatePresence>
        {popupSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              aria-hidden="true"
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-foreground select-none"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-muted border border-border">
                    Events Track
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1 capitalize">
                    {popupSection.replace("-", " ")}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close popup"
                  className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 p-4 rounded-xl border border-border/80 bg-muted/40">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {popupSection === "upcoming" && "Join our scheduled developer sessions, Git workshops, and weekly office hours to collaborate and build together."}
                  {popupSection === "hackathons" && "Compete in ZenithHacks, Smart India Hackathon, and Hacktoberfest sprints with community mentorship and bounties."}
                  {popupSection === "achievements" && "Celebrate student achievements, national finalist selections, and thousands of lines of open-source code shipped into production."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closePopup}
                  className="border-border text-xs text-foreground cursor-pointer"
                >
                  Close
                </Button>
                <Link href={`#${popupSection}`} onClick={closePopup}>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer"
                  >
                    <span>Jump to Section</span>
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
