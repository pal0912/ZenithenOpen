"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface MilestoneItem {
  prefix: string;
  strongText?: string;
  bodyText: string;
}

interface YearTimelineData {
  year: string;
  headline: string;
  leadParagraph: string;
  bullets: MilestoneItem[];
}

const TIMELINE_DATA: YearTimelineData[] = [
  {
    year: "2025",
    headline: "Year one — founded with the first batch",
    leadParagraph:
      "The college opened its doors in 2025, and ZenithenLab started with it. One batch, a first set of workshops, and the first wins on the board before the year was out.",
    bullets: [
      {
        prefix: "—",
        strongText: "ZenithenLab founded at IST",
        bodyText: "alongside the college's first-ever batch",
      },
      {
        prefix: "—",
        strongText: "First workshops run by members:",
        bodyText:
          "Getting Started with Open Source, Web Development Bootcamp, and Git & GitHub Workflows",
      },
      {
        prefix: "—",
        strongText: "2 first-place hackathon wins in the first year,",
        bodyText:
          "including the campus Ideathon and the launch of the First-PR practice repository",
      },
    ],
  },
  {
    year: "2026",
    headline: "Year two — scaling campus open-source velocity",
    leadParagraph:
      "From first commits to production ecosystems. 2026 marks the launch of ZenithenOpen, genuine USN student verification, and competitive open-source leaderboards.",
    bullets: [
      {
        prefix: "—",
        strongText: "ZenithenOpen platform launched",
        bodyText:
          "powering 80+ student developers across Computer Science, Information Science, and Electronics departments",
      },
      {
        prefix: "—",
        strongText: "Direct campus repository gateways:",
        bodyText:
          "ZenithenOpen and First-PR with curated Good First Issues, live GitHub synchronization, and mentor pairing",
      },
      {
        prefix: "—",
        strongText: "Student competition arena & Hall of Fame:",
        bodyText:
          "automated PR quality scoring, weekly sprints, and verified First-PR milestone badges",
      },
    ],
  },
];

export function CampusEvolutionSection() {
  return (
    <section
      id="campus-evolution"
      className="py-20 sm:py-28 md:py-32 border-t border-border bg-card/20 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 sm:space-y-32 md:space-y-36">
          {TIMELINE_DATA.map((entry, index) => (
            <div
              key={entry.year}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
            >
              {/* Optional Subtle Vertical Connector between 2025 and 2026 on desktop */}
              {index === 0 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute left-[15%] top-full h-24 sm:h-32 w-px bg-gradient-to-b from-border via-border/50 to-transparent pointer-events-none"
                />
              )}

              {/* Left Column: Outlined Slanted Year Numeral (Exact Picture 2 Match) */}
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-5 select-none transform-gpu will-change-transform"
              >
                <div className="sticky top-28">
                  <span
                    className="font-sans font-light italic select-none tracking-tight block text-foreground/75"
                    style={{
                      fontSize: "clamp(5.5rem, 14vw, 10rem)",
                      lineHeight: 0.9,
                      color: "transparent",
                      WebkitTextStroke: "1.5px currentColor",
                    }}
                  >
                    {entry.year}
                  </span>
                </div>
              </motion.div>

              {/* Right Column: Title, Story Paragraph & Dash Bullets */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.75,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-7 space-y-5 transform-gpu will-change-transform"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {entry.headline}
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {entry.leadParagraph}
                </p>

                {/* Dash Bullets (Matching Picture 2's clean typographic dash styling) */}
                <ul className="mt-8 pt-2 space-y-4 max-w-2xl">
                  {entry.bullets.map((bullet, bulletIdx) => (
                    <motion.li
                      key={bulletIdx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + bulletIdx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="text-foreground/60 select-none font-light shrink-0">
                        {bullet.prefix}
                      </span>
                      <span>
                        {bullet.strongText && (
                          <span className="text-foreground font-medium mr-1.5">
                            {bullet.strongText}
                          </span>
                        )}
                        <span>{bullet.bodyText}</span>
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
