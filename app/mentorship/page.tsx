"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users2,
  CheckCircle2,
  Send,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_MEMBERS } from "@/lib/data/mock-data";

export default function MentorshipPage() {
  const [selectedTopic, setSelectedTopic] = React.useState<string>("All");
  const [requestModalOpen, setRequestModalOpen] = React.useState<boolean>(false);
  const [requestSent, setRequestSent] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    topic: "GSoC Preparation",
    goal: "",
  });

  const mentors = MOCK_MEMBERS.filter((m) => m.isAvailableForMentorship);

  const topics = [
    "All",
    "GSoC Preparation",
    "Distributed Systems",
    "Next.js & React 19",
    "PyTorch Open Source",
    "DevOps Roadmaps",
  ];

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestModalOpen(false);
      setRequestSent(false);
      setFormData({ name: "", email: "", topic: "GSoC Preparation", goal: "" });
    }, 1800);
  };

  return (
    <div className="py-16 bg-background text-foreground min-h-screen transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
            <Users2 className="h-4 w-4" />
            <span>Peer Mentorship Matching</span>
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Open-Source Mentorship
              </h1>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Connect with senior students and alumni who have shipped production code, landed GSoC fellowships, and guided newcomers.
              </p>
            </div>
            <Button
              onClick={() => setRequestModalOpen(true)}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md text-xs shrink-0 self-start md:self-auto cursor-pointer"
            >
              <UserCheck className="h-4 w-4" />
              <span>Request a Mentor</span>
            </Button>
          </div>

          {/* Topics filter */}
          <div className="mt-8 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground mr-2">Focus Topic:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Grid or Zero State */}
        {mentors.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-16 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
              <Users2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Mentor Network Initializing</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Are you a senior student or GSoC contributor? Apply to become a founding mentor, review PRs, and guide first-year students.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setRequestModalOpen(true)}
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs cursor-pointer"
              >
                <span>Submit Mentorship Request</span>
              </Button>
              <Link href="/learning">
                <Button variant="outline" className="text-xs border-border">
                  Follow Self-Guided Roadmaps
                </Button>
              </Link>
            </div>
          </div>
        ) : null}

        {/* Request Modal */}
        {requestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl text-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Request Open-Source Mentorship</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Match with an S-VYASA student mentor for 1-on-1 code reviews.
                  </p>
                </div>
                <button
                  onClick={() => setRequestModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground p-1 text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {requestSent ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
                  <p className="text-base font-bold text-foreground">Request Dispatched!</p>
                  <p className="text-xs text-muted-foreground">
                    A mentor will review your topic and contact you via your university email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendRequest} className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs text-foreground font-semibold block mb-1">Your Full Name</label>
                    <Input
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background border-border text-foreground text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-foreground font-semibold block mb-1">University Email</label>
                    <Input
                      required
                      type="email"
                      placeholder="student@svyasa.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background border-border text-foreground text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-foreground font-semibold block mb-1">Target Focus Area</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full rounded-md bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="GSoC Preparation">Google Summer of Code (GSoC) Mentorship</option>
                      <option value="Distributed Systems">Go & Distributed Systems</option>
                      <option value="Next.js & React 19">Next.js & React 19 Web Architecture</option>
                      <option value="PyTorch Open Source">PyTorch AI & Data Science</option>
                      <option value="DevOps Roadmaps">Docker & Cloud DevOps</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-foreground font-semibold block mb-1">What is your primary goal?</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. I want to contribute my first PR to an open-source repo before December..."
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full rounded-md bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setRequestModalOpen(false)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Request</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
