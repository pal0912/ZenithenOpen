"use client";

import * as React from "react";
import {
  Users2,
  Sparkles,
  Search,
  CheckCircle2,
  Send,
  MessageSquare,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_MEMBERS } from "@/lib/data/mock-data";

export default function MentorshipPage() {
  const [selectedTopic, setSelectedTopic] = React.useState<string>("All");
  const [requestModalMentor, setRequestModalMentor] = React.useState<string | null>(null);
  const [requestSent, setRequestSent] = React.useState<boolean>(false);

  const mentors = MOCK_MEMBERS.filter((m) => m.isAvailableForMentorship);

  const topics = [
    "All",
    "GSoC Preparation",
    "Distributed Systems",
    "Next.js & React 19",
    "PyTorch Open Source",
    "DevOps Roadmaps",
  ];

  const filteredMentors = mentors.filter((m) => {
    if (selectedTopic === "All") return true;
    return m.mentorshipTopics?.some((t) =>
      t.toLowerCase().includes(selectedTopic.toLowerCase())
    );
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestModalMentor(null);
      setRequestSent(false);
    }, 1800);
  };

  return (
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <Users2 className="h-4 w-4" />
            <span>Peer Mentorship Matching</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            Connect with Open-Source Mentors
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Get 1-on-1 guidance from seniors and alumni who have shipped production code, landed GSoC fellowships, and maintained large repositories.
          </p>

          {/* Topics filter */}
          <div className="mt-6 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-400 mr-2">Focus Topic:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedTopic === topic
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="p-6 glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/40"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        @{mentor.username}
                      </p>
                    </div>
                  </div>
                  <Badge variant="beginner" className="text-[10px]">
                    Available
                  </Badge>
                </div>

                <p className="mt-4 text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Mentorship Specializations
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.mentorshipTopics?.map((topic) => (
                      <span
                        key={topic}
                        className="rounded bg-blue-950/60 border border-blue-900/60 px-2 py-0.5 text-[10px] text-blue-300 font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {mentor.mergedPrCount} PRs Merged
                </span>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => setRequestModalMentor(mentor.name)}
                >
                  Request Mentorship
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal: Mentorship Request */}
        {requestModalMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white">
                Request Mentorship with {requestModalMentor}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Share what you are aiming to learn or the issue you are currently working on.
              </p>

              {requestSent ? (
                <div className="my-8 text-center py-6">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Mentorship Request Sent!
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {requestModalMentor} will review your request and connect on Discord/Email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendRequest} className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300">
                      Topic or Goal
                    </label>
                    <Input
                      required
                      placeholder="e.g., GSoC Apache Proposal Review, First React PR"
                      className="mt-1 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300">
                      Brief Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Introduce yourself and specify your current stage..."
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setRequestModalMentor(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" variant="default">
                      Send Request
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
