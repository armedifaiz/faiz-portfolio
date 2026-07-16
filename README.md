# Faiz Portfolio

Portfolio website statis dengan Vite, React, TypeScript, Tailwind CSS, dan Framer Motion. Data diambil dari `src/data/*.json`.

## Quick Start

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

## Data Management

Data bisa diedit langsung di `src/data/`:

| File | Isi |
|------|-----|
| `certificates.json` | Sertifikat (judul, penerbit, tanggal, gambar, kategori) |
| `experience.json` | Pengalaman kerja (posisi, perusahaan, durasi, tipe, deskripsi) |
| `photos.json` | Foto hero (path, caption) |
| `projects.json` | Project GitHub (auto-synced dari GitHub via script) |
| `skills.json` | Skill & tools (nama, slug, icon URL) |
| `socials.json` | Link sosial media (platform, URL, icon key) |
| `site.ts` | Semua teks UI (hero, about, skills, projects, certificates, contact, footer) |

**Semua teks user-facing dikentralisasi di `src/data/site.ts`** — edit di satu tempat tanpa sentuh komponen.

### Sync Projects dari GitHub

```bash
cd ~/Projects/faiz-portfolio
python3 scripts/sync_projects.py
```

Script ini fetch repo dari GitHub (`armedifaiz`) pakai token personal, update `src/data/projects.json`. Bisa dijalankan manual atau cron harian.

### Favicon

Favicon di-generate dari `src/assets/logo-red-white.png` ke berbagai ukuran di `public/`. Untuk ganti: replace file logo, regenerate (python script di memory), rebuild.

## Project Structure

```
faiz-portfolio/
├── public/
│   ├── images/
│   │   ├── certificates/   # Sertifikat (JPEG, compressed)
│   │   └── photos/         # Foto hero
│   ├── favicon*.png        # Favicon sizes
│   ├── favicon.svg
│   └── manifest.json       # PWA manifest
├── src/
│   ├── assets/             # Logo, icons
│   ├── components/         # Reusable components
│   │   ├── cards/          # CertificateCard, ProjectCard
│   │   ├── common/         # Navbar, Footer, Button, SectionTitle
│   │   └── ui/             # FadeIn
│   ├── data/               # JSON data (single source of truth)
│   ├── hooks/              # useRandomPhoto (auto-rotate hero photos)
│   ├── sections/           # Page sections (Hero, About, Skills, Projects, Certificates, Contact)
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Key Features

- **CertificateCard**: No border-radius, natural aspect ratio (`w-full`), no black gaps
- **Hero photos**: Auto-rotate every 8s from `photos.json` (persisted in localStorage)
- **Projects**: Static JSON, synced from GitHub via script
- **Skills icons**: SimpleIcons CDN with `#ef4444` accent color; custom local PNG for Sling
- **Contact/Navbar**: Inline SVG icons (GitHub, LinkedIn, Instagram, Gmail)
- **Responsive**: Mobile-first, breakpoints `sm:`, `md:`, `lg:`
- **Dark mode only**: `bg-base-950` (`#050505`) base

## Deploy ke GitHub Pages

1. Push ke `main` branch di `armedifaiz/faiz-portfolio`
2. Settings → Pages → Source: GitHub Actions
3. Workflow build & deploy otomatis (`.github/workflows/static.yml`)

Vite `base: '/faiz-portfolio/'` sudah dikonfigurasi — semua asset path relative.

## Update Project List (Cron)

Daily cron di 06:00 WIB jalanin:
```bash
python3 scripts/sync_projects.py && git add src/data/projects.json && git commit -m "chore: sync projects" && git push
```

Repo target: `git@github-personal:armedifaiz/faiz-portfolio.git` (SSH `github-personal`).