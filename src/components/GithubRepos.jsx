"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiGithub, FiExternalLink, FiGitBranch, FiCode } from "react-icons/fi";
import { BsCircleFill } from "react-icons/bs";

// ─── Language colour map ──────────────────────────────────────────────────────
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  Dart:       "#00B4AB",
  Java:       "#b07219",
  Kotlin:     "#A97BFF",
  Swift:      "#F05138",
  Go:         "#00ADD8",
  Rust:       "#dea584",
  "C++":      "#f34b7d",
  C:          "#555555",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Shell:      "#89e051",
  Ruby:       "#701516",
  PHP:        "#4F5D95",
  Jupyter:    "#DA5B0B",
};

const getLangColor = (lang) => LANG_COLORS[lang] ?? "#6b7280";

// ─── Tab definitions ──────────────────────────────────────────────────────────
// "Featured" tab: repos that have the "featured" topic set on GitHub.
// To add a repo → go to its GitHub page → About → Topics → add "featured".
const TABS = [
  {
    id: "featured",
    label: "⭐ Featured",
    filter: (repo) => repo.topics?.includes("featured"),
  },
  {
    id: "all",
    label: "All Projects",
    filter: () => true,
  },
  {
    id: "libraries",
    label: "Libraries & Tools",
    filter: (repo) =>
      repo.topics?.some((t) =>
        ["library", "tool", "cli", "sdk", "package", "api", "plugin", "utility"].includes(t)
      ) ||
      ["lib", "tool", "sdk", "cli", "pkg", "api"].some((kw) =>
        repo.name.toLowerCase().includes(kw)
      ),
  },
];

// ─── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { id: "updated", label: "Last Updated" },
  { id: "stars",   label: "Stars" },
  { id: "name",    label: "Name (A–Z)" },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl p-6 border border-white/5 bg-white/[0.03] animate-pulse">
    <div className="h-5 w-3/5 rounded bg-white/10 mb-3" />
    <div className="h-3 w-full rounded bg-white/5 mb-2" />
    <div className="h-3 w-4/5 rounded bg-white/5 mb-6" />
    <div className="flex gap-3 mt-auto">
      <div className="h-4 w-16 rounded bg-white/10" />
      <div className="h-4 w-10 rounded bg-white/10" />
    </div>
  </div>
);

// ─── Repo card ────────────────────────────────────────────────────────────────
const RepoCard = ({ repo }) => {
  const langColor = getLangColor(repo.language);
  const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  });

  // Show parent repo name for forks (only available when fetched with ?type=all)
  const forkSource = repo.fork && repo.parent
    ? repo.parent.full_name
    : null;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`group relative flex flex-col rounded-2xl p-6 border
                 backdrop-blur-md overflow-hidden transition-colors duration-300 cursor-default
                 ${
                   repo.fork
                     ? "border-white/[0.05] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                     : "border-white/[0.07] bg-white/[0.04] hover:border-accent/40 hover:bg-white/[0.07]"
                 }`}
    >
      {/* Fork badge – top-right corner */}
      {repo.fork && (
        <div className="absolute top-3 right-3 flex items-center gap-1
                        px-2 py-0.5 rounded-full text-[9px] font-semibold
                        bg-white/5 border border-white/10 text-white/30">
          <FiGitBranch className="text-[8px]" />
          fork
        </div>
      )}

      {/* Top row: name + external link */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <FiCode className={`shrink-0 text-sm ${repo.fork ? "text-white/30" : "text-accent/70"}`} />
          <h3
            className={`font-semibold truncate text-[15px] transition-colors duration-200
                        ${
                          repo.fork
                            ? "text-white/70 group-hover:text-white"
                            : "text-white group-hover:text-accent"
                        }`}
          >
            {repo.name}
          </h3>
        </div>
        {/* Push link button left when fork badge is present */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${repo.name} on GitHub`}
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-lg
                     border border-white/10 text-white/40 transition-all duration-200
                     hover:border-accent/60 hover:text-accent hover:bg-accent/10
                     ${repo.fork ? "mr-10" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <FiExternalLink className="text-sm" />
        </a>
      </div>

      {/* Description */}
      <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">
        {repo.description ? (
          repo.description
        ) : repo.fork && forkSource ? (
          <span className="italic text-white/25">
            Fork of <span className="text-white/35 not-italic">{forkSource}</span>
          </span>
        ) : (
          <span className="italic text-white/25">No description</span>
        )}
      </p>

      {/* Forked-from line (only when description AND parent info exist) */}
      {repo.fork && forkSource && repo.description && (
        <p className="text-[10px] text-white/20 mb-3 italic">
          Forked from {forkSource}
        </p>
      )}

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics
            .filter((t) => t !== "featured") // don't show "featured" as a visible tag
            .slice(0, 4)
            .map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium
                           bg-accent/10 text-accent/70 border border-accent/20"
              >
                {topic}
              </span>
            ))}
        </div>
      )}

      {/* Bottom row: language · stars · forks · updated */}
      <div className="flex items-center gap-4 text-[11px] text-white/35 mt-auto pt-3 border-t border-white/5">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <BsCircleFill style={{ color: langColor }} className="text-[9px]" />
            <span className="text-white/55">{repo.language}</span>
          </span>
        )}

        <span className="flex items-center gap-1">
          <FiStar className="text-yellow-400/70" />
          <span>{repo.stargazers_count}</span>
        </span>

        <span className="flex items-center gap-1">
          <FiGitBranch />
          <span>{repo.forks_count}</span>
        </span>

        <span className="text-white/25 hidden sm:inline ml-auto">{updatedAt}</span>
      </div>
    </motion.div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const GithubRepos = ({ username = "tahaglbz" }) => {
  const [repos,     setRepos]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy,    setSortBy]    = useState("updated");

  // Fetch all repos including forks (pagination-safe)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchAll = async () => {
      try {
        const results = [];
        let page = 1;
        while (true) {
          const res = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
            { headers: { Accept: "application/vnd.github+json" } }
          );
          if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
          const data = await res.json();
          results.push(...data);
          if (data.length < 100) break;
          page++;
        }
        if (!cancelled) setRepos(results);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => { cancelled = true; };
  }, [username]);

  // Filter + sort
  const displayed = useMemo(() => {
    const tab = TABS.find((t) => t.id === activeTab);
    let filtered = repos.filter(tab ? tab.filter : () => true);

    switch (sortBy) {
      case "stars":
        filtered = [...filtered].sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "updated":
      default:
        filtered = [...filtered].sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        break;
    }
    return filtered;
  }, [repos, activeTab, sortBy]);

  // Tab counts
  const tabCounts = useMemo(
    () =>
      TABS.reduce((acc, tab) => {
        acc[tab.id] = repos.filter(tab.filter).length;
        return acc;
      }, {}),
    [repos]
  );

  return (
    <section className="py-16 xl:py-24">
      <div className="container mx-auto px-4">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center xl:text-left"
        >
          <span className="text-accent font-medium text-sm tracking-widest uppercase">
            Open Source
          </span>
          <h2 className="h2 text-white mt-2">
            My GitHub{" "}
            <span className="text-accent">Projects</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-xl text-sm">
            All my repositories including forks — fetched live from the GitHub API.
            Pin a repo with the{" "}
            <code className="text-accent/70 bg-accent/5 px-1 py-0.5 rounded text-[11px]">
              featured
            </code>{" "}
            topic on GitHub to show it in the Featured tab.
          </p>
        </motion.div>

        {/* ── Controls row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Project categories"
            className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.07]"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? "text-primary bg-accent shadow-md shadow-accent/20"
                      : "text-white/40 hover:text-white/70"
                  }`}
              >
                {tab.label}
                {!loading && tabCounts[tab.id] > 0 && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold
                      ${
                        activeTab === tab.id
                          ? "bg-primary/30 text-primary"
                          : "bg-white/10 text-white/30"
                      }`}
                  >
                    {tabCounts[tab.id]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Sort select */}
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort order"
              className="bg-white/[0.04] border border-white/[0.07] text-white/60 text-xs
                         rounded-lg px-3 py-2 outline-none cursor-pointer
                         hover:border-accent/30 focus:border-accent/50
                         transition-colors duration-200
                         [&>option]:bg-[#1c1c22]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Content area ── */}
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <FiGithub className="text-5xl text-white/20" />
            <p className="text-white/40 text-sm">Failed to load repositories.</p>
            <code className="text-xs text-red-400/70 bg-red-400/5 px-3 py-1 rounded-lg">
              {error}
            </code>
          </motion.div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-3 text-center"
          >
            <FiCode className="text-5xl text-white/15" />
            {activeTab === "featured" ? (
              <div className="space-y-2">
                <p className="text-white/35 text-sm">No featured projects yet.</p>
                <p className="text-white/20 text-xs max-w-xs">
                  Add the{" "}
                  <code className="text-accent/50 bg-accent/5 px-1 rounded">featured</code>
                  {" "}topic to any GitHub repo to show it here.
                </p>
              </div>
            ) : (
              <p className="text-white/35 text-sm">No projects in this category.</p>
            )}
          </motion.div>
        ) : (
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${sortBy}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {displayed.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ── Footer link ── */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              id="github-profile-link"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl
                         border border-white/10 text-white/50 text-sm
                         hover:border-accent/50 hover:text-accent hover:bg-accent/5
                         transition-all duration-300"
            >
              <FiGithub />
              <span>View full profile</span>
              <FiExternalLink
                className="text-xs opacity-0 -translate-x-1 group-hover:opacity-100
                           group-hover:translate-x-0 transition-all duration-200"
              />
            </a>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default GithubRepos;
