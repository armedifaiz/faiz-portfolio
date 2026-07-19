#!/usr/bin/env node

/**
 * fetch-projects.js
 *
 * Fetches public GitHub repositories for a given username and writes
 * a normalized JSON file consumable by the portfolio React app.
 *
 * Usage:
 *   node scripts/fetch-projects.js
 *
 * Environment variables:
 *   GITHUB_USERNAME  – GitHub username (default: "armedifaiz")
 *   GITHUB_OUTPUT    – output path (default: src/data/projects.json)
 *   GITHUB_TOKEN     – GitHub PAT (auto-available in Actions via ${{ secrets.GITHUB_TOKEN }})
 */

import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'armedifaiz';
const OUTPUT_PATH = process.env.PROJECTS_OUTPUT || 'src/data/projects.json';

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

async function fetchAllRepos(username) {
  const repos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?page=${page}&per_page=100&sort=updated&direction=desc&type=owner`;
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'PortfolioBot/1.0',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API HTTP ${res.status}: ${res.statusText}\n${text.slice(0, 300)}`);
    }

    const data = await res.json();
    repos.push(...data);
    hasMore = data.length === 100;
    page++;
  }

  return repos;
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

function normalizeRepo(raw) {
  return {
    id: raw.name,
    name: raw.name,
    description: raw.description || '',
    githubUrl: raw.html_url,
    demoUrl: raw.homepage && raw.homepage !== '' ? raw.homepage : null,
    language: raw.language || null,
    topics: raw.topics || [],
    stars: raw.stargazers_count || 0,
    updatedAt: raw.updated_at || '',
    thumbnail: null,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.error(`Fetching repos for: ${GITHUB_USERNAME}`);
  const raw = await fetchAllRepos(GITHUB_USERNAME);
  console.error(`  -> ${raw.length} repos found`);

  // Filter: non-fork, non-archived, public
  const repos = raw
    .filter((r) => !r.fork && !r.archived && r.private === false)
    .map(normalizeRepo);

  // Sort by updatedAt descending
  repos.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(repos, null, 2));
  console.error(`\nWrote ${repos.length} projects to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
