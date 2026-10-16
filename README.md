# Portofolio Cahya Hafid Abdillah

Website portofolio statis untuk **Cahya Hafid Abdillah** — Content & Copy Writer, News Writer, dan Prompt Engineer. Mahasiswa S1 Teknologi Pendidikan Universitas Negeri Surabaya (UNESA) & Google Student Ambassador 2026.

## 🌐 Live Website
Situs ini dapat diakses secara publik melalui GitHub Pages:
👉 **[https://riyadiambis.github.io/Cahya-Hafid-Abdillah/](https://riyadiambis.github.io/Cahya-Hafid-Abdillah/)**

---

## 📁 Struktur Folder

```text
Cahya-Hafid-Abdillah/
├── .gitignore                      # Mengabaikan file backup lokal & cache
├── README.md                       # Dokumentasi repositori
├── docs/                           # Folder root website (GitHub Pages source)
│   ├── .nojekyll                   # Menandai bypass Jekyll di GitHub Pages
│   ├── index.html                  # Halaman utama portofolio
│   ├── css/
│   │   └── style.css               # Seluruh styling, tema/skin tokens, dan animasi
│   ├── js/
│   │   └── main.js                 # Logika interaktif, navigasi, dialog pembaca, & registry gambar
│   └── assets/
│       └── img/                    # 62 file gambar WebP yang telah diekstrak
│           ├── portrait_cut.webp
│           ├── portrait_photo.webp
│           ├── ct_*.webp           # Sertifikat & penghargaan
│           ├── gsa_*.webp          # Dokumentasi Google Student Ambassador
│           ├── ig_*.webp           # Konten infografis & carousel Instagram
│           ├── rm_*.webp           # Portofolio artikel & liputan Radar Mojokerto
│           ├── pr_*.webp           # Showcase AI prompt engineering
│           ├── pg*.webp            # Tangkapan layar artikel & publikasi
│           └── ...
└── scripts/
    └── split_portfolio.py          # Script otomasi ekstraksi file HTML single-file
```

---

## 🛠️ Cara Menjalankan Secara Lokal

1. Buka terminal di folder root project.
2. Jalankan HTTP server lokal:
   ```bash
   python -m http.server 8000 --directory docs
   ```
3. Buka browser di [http://localhost:8000](http://localhost:8000).

---

## 🚀 Deployment GitHub Pages

Repositori ini disiapkan untuk di-deploy via GitHub Pages menggunakan folder `/docs`:
- **Source**: Deploy from a branch
- **Branch**: `main`
- **Folder**: `/docs`
