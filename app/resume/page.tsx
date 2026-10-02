"use client";

import * as React from "react";
import {
  Printer,
  Copy,
  Check,
  Mail,
  MapPin,
  Globe,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { MOCK_RESUME_DATA } from "@/lib/data/mock-data";

export default function ResumeBuilderPage() {
  const [copied, setCopied] = React.useState(false);
  const data = MOCK_RESUME_DATA;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${data.fullName}
**${data.headline}**
${data.email} | ${data.location} | GitHub: @${data.githubUsername}

## Summary
${data.summary}

## Skills
- **Languages:** ${data.skills.languages.join(", ")}
- **Frameworks:** ${data.skills.frameworks.join(", ")}
- **Tools:** ${data.skills.tools.join(", ")}
- **Databases:** ${data.skills.databases.join(", ")}

## Open Source Projects & Impact
${data.highlightedRepos
  .map(
    (r) =>
      `### ${r.name} (${r.language}) - ${r.stars} Stars, ${r.prsAuthored} Merged PRs
${r.description}
* ${r.impactDescription}`
  )
  .join("\n\n")}

## Education
**${data.education.institution}** - ${data.education.degree} in ${data.education.field} (${data.education.graduationYear}) - GPA: ${data.education.gpa}

## Notable Achievements
${data.achievements.map((a) => `- ${a}`).join("\n")}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Screen Controls Header (hidden during print) */}
        <div className="print:hidden border-b border-slate-800/80 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Sparkles className="h-4 w-4" />
              <span>Verified Developer Identity</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
              GitHub-Powered ATS Resume Builder
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Generates a clean, ATS-optimized software engineer resume backed by verified pull requests, commits, and campus contributions.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <Button
              onClick={handleCopyMarkdown}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied Markdown" : "Copy Markdown"}</span>
            </Button>

            <Button
              onClick={handlePrint}
              variant="default"
              size="sm"
              className="gap-1.5 text-xs shadow-blue-600/30"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </Button>
          </div>
        </div>

        {/* The Printable Resume Canvas */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl text-slate-200 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
          {/* Header */}
          <div className="border-b border-slate-800 print:border-black pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white print:text-black">
              {data.fullName}
            </h1>
            <p className="text-sm font-medium text-blue-400 print:text-gray-800 mt-0.5">
              {data.headline}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400 print:text-gray-600">
              <span className="flex items-center space-x-1">
                <Mail className="h-3.5 w-3.5" />
                <span>{data.email}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{data.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <GithubIcon className="h-3.5 w-3.5" />
                <span>github.com/{data.githubUsername}</span>
              </span>
              {data.linkedinUrl && (
                <span className="flex items-center space-x-1">
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  <span>linkedin.com/in/{data.githubUsername}</span>
                </span>
              )}
              {data.portfolioUrl && (
                <span className="flex items-center space-x-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{data.portfolioUrl}</span>
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black border-b border-slate-800 print:border-black pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
              {data.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black border-b border-slate-800 print:border-black pb-1 mb-2">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <p>
                <strong className="text-white print:text-black">Languages:</strong>{" "}
                <span className="text-slate-300 print:text-gray-700">
                  {data.skills.languages.join(", ")}
                </span>
              </p>
              <p>
                <strong className="text-white print:text-black">Frameworks:</strong>{" "}
                <span className="text-slate-300 print:text-gray-700">
                  {data.skills.frameworks.join(", ")}
                </span>
              </p>
              <p>
                <strong className="text-white print:text-black">DevOps & Tools:</strong>{" "}
                <span className="text-slate-300 print:text-gray-700">
                  {data.skills.tools.join(", ")}
                </span>
              </p>
              <p>
                <strong className="text-white print:text-black">Databases & Storage:</strong>{" "}
                <span className="text-slate-300 print:text-gray-700">
                  {data.skills.databases.join(", ")}
                </span>
              </p>
            </div>
          </div>

          {/* Verified Open Source Repositories & Engineering Work */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black border-b border-slate-800 print:border-black pb-1 mb-3">
              Open-Source Engineering & Impact
            </h2>

            <div className="space-y-4">
              {data.highlightedRepos.map((repo) => (
                <div key={repo.name} className="text-xs">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-white print:text-black text-sm">
                      {repo.name}{" "}
                      <span className="font-normal text-slate-400 print:text-gray-600 text-xs">
                        ({repo.language})
                      </span>
                    </span>
                    <span className="text-slate-400 print:text-gray-600 font-mono text-[11px]">
                      ★ {repo.stars} stars • {repo.prsAuthored} Merged PRs
                    </span>
                  </div>
                  <p className="text-slate-400 print:text-gray-600 mt-0.5">
                    {repo.description}
                  </p>
                  <p className="mt-1 text-slate-300 print:text-gray-800 flex items-start space-x-1.5">
                    <span className="text-blue-400 print:text-black">▸</span>
                    <span>{repo.impactDescription}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black border-b border-slate-800 print:border-black pb-1 mb-2">
              Education
            </h2>
            <div className="flex items-start justify-between text-xs">
              <div>
                <p className="font-semibold text-white print:text-black">
                  {data.education.institution}
                </p>
                <p className="text-slate-300 print:text-gray-700">
                  {data.education.degree} in {data.education.field}
                </p>
              </div>
              <div className="text-right text-slate-400 print:text-gray-600 font-mono">
                <p>Graduation: {data.education.graduationYear}</p>
                <p>GPA: {data.education.gpa}</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black border-b border-slate-800 print:border-black pb-1 mb-2">
              Key Achievements & Fellowships
            </h2>
            <ul className="text-xs space-y-1 text-slate-300 print:text-gray-800">
              {data.achievements.map((a, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 print:bg-black" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
