# Faiz Portfolio

Portfolio website statis dengan Vite, React, TypeScript, Tailwind CSS, dan Framer Motion. Data project, foto, sertifikat, dan skill dihasilkan lebih dulu lewat script Python, lalu dibaca oleh frontend dari `src/data/*.json`.

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

Semua data portfolio bisa diatur lewat script Python di `scripts/`. Cukup bilang ke saya — nanti saya yang jalanin perintahnya.

### Sertifikat dan Foto

Script utama: `scripts/process_images.py`

Kompres gambar dari `source_images/` ke `public/images/`, update `src/data/certificates.json` dan `src/data/photos.json`.

```bash
# Tambah sertifikat baru (langsung dari source_images atau path mana pun)
python scripts/process_images.py --add-cert source_images/certificates/gcp.jpg \
    --title "Google Cloud Associate" \
    --issuer "Google" \
    --date "2026-06" \
    --description "Professional Data Engineer certification" \
    --category "Cloud"

# Tambah foto
python scripts/process_images.py --add-photo source_images/photos/liburan.jpg \
    --caption "Liburan di Bali"

# Hapus
python scripts/process_images.py --delete-cert google-cloud-associate
python scripts/process_images.py --delete-photo z62_0073

# Lihat daftar
python scripts/process_images.py --list-certs
python scripts/process_images.py --list-photos
```

Metadata yang bisa diisi untuk sertifikat:
- `--title` (wajib)
- `--issuer` — penerbit
- `--date` — tanggal (format bebas, misal "2026-06")
- `--description` — deskripsi
- `--category` — kategori (Cloud, Web, Mobile, DevOps, dll)

### GitHub Projects

```bash
# Sync semua repo dari GitHub
python scripts/github_api.py --sync

# Lihat daftar
python scripts/github_api.py --list

# Hapus
python scripts/github_api.py --delete nama-repo
```

### Skills

```bash
# Tambah
python scripts/skills_api.py --add "Apache Spark"

# Hapus (pakai slug — nama skill tanpa spasi, lowercase)
python scripts/skills_api.py --delete apachespark

# Lihat daftar
python scripts/skills_api.py --list
```

### Sinkronisasi Semua Sekaligus

```bash
python scripts/generate_all.py
```

> Setiap perubahan JSON otomatis dibackup ke `scripts/backup/`.

## Project Structure

```
faiz-portfolio/
├── public/images/         # Output gambar (kompres otomatis)
│   ├── certificates/      # Sertifikat (JPEG, max 1200px, ~80% quality)
│   └── photos/            # Foto profil/hero
├── source_images/         # Source file (taruh gambar asli di sini)
│   ├── certificates/
│   └── photos/
├── src/
│   ├── data/              # JSON data (diupdate otomatis oleh scripts)
│   │   ├── certificates.json
│   │   ├── experience.json
│   │   ├── photos.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── socials.json
│   ├── types/             # TypeScript interfaces
│   ├── sections/          # Section components
│   ├── components/        # Reusable components
│   └── hooks/             # Custom hooks
└── scripts/               # Python data generators
    ├── process_images.py  # Foto & sertifikat
    ├── github_api.py      # GitHub projects
    ├── skills_api.py      # Skills manager
    └── generate_all.py    # Run all generators
```

## Deploy ke GitHub Pages

Push ke branch `main` akan otomatis menjalankan workflow deploy ke GitHub Pages.
