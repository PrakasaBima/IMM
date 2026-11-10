# Situs PT Inti Mas Mulia

Situs profil perusahaan PT Inti Mas Mulia (React + Vite) dengan panel admin di `/admin` untuk mengubah konten tanpa menyentuh kode. Panduan ini mencakup semuanya: menjalankan di komputer sendiri, menyimpan perubahan ke GitHub, sampai situs live di Vercel (deploy langsung dari komputer lokal lewat Vercel CLI).

- **Situs**: `src/` (halaman utama, halaman detail layanan `/layanan/<slug>`)
- **Panel admin**: `src/admin/`
- **Backend (API)**: `server/` (Express). Saat development ikut berjalan di `npm run dev`; di Vercel berjalan lewat `api/index.js`
- **Konten bawaan**: `src/data.js`. Konten yang diubah lewat admin disimpan di database dan menimpa konten bawaan per bagian

---

## 1. Yang perlu disiapkan

- [Node.js](https://nodejs.org) **versi 20 atau lebih baru** (cek: `node --version`)
- [Git](https://git-scm.com)
- Akses ke repo GitHub **`PrakasaBima/IMM`** sebagai *collaborator* (minta ke pemilik repo: GitHub → repo → Settings → Collaborators → Add people). Tanpa ini Anda tidak bisa push.
- Akun [Vercel](https://vercel.com) (gratis) — hanya untuk langkah deploy. Situs live akan berada di akun Vercel ini, dan deploy berikutnya juga dilakukan dari akun ini.

---

## 2. Menjalankan di komputer sendiri

```bash
git clone https://github.com/PrakasaBima/IMM.git
cd IMM
npm install
```

Salin file contoh environment, lalu isi password admin:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env
# macOS / Linux
cp .env.example .env
```

Buka `.env` dan isi minimal `ADMIN_PASSWORD`. Variabel lain boleh kosong saat lokal.

Jalankan:

```bash
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`):

- Situs: `http://localhost:5173`
- Admin: `http://localhost:5173/admin` → login dengan `ADMIN_USERNAME` (bawaan `admin`) dan `ADMIN_PASSWORD` dari `.env`

Saat lokal, konten dari admin disimpan di `.data/content.json` dan gambar unggahan di `public/uploads/`. Keduanya **tidak ikut ke Git** dan tidak ikut ke situs live — ini hanya untuk mencoba.

> Setelah mengubah `.env` atau file di `server/`, hentikan server (Ctrl+C) lalu jalankan `npm run dev` lagi. Perubahan di `src/` langsung tampil tanpa restart.

---

## 3. Menyimpan perubahan ke GitHub

Selalu ambil perubahan terbaru sebelum mulai bekerja:

```bash
git pull
npm install          # wajib bila package.json berubah (ada paket baru)
```

Setelah selesai mengubah kode:

```bash
git add .
git commit -m "Jelaskan perubahan singkat"
git push
```

Push ke GitHub **tidak** mengubah situs live — situs live hanya berubah saat seseorang menjalankan `vercel --prod` (langkah 4). GitHub dipakai untuk berbagi kode antar anggota tim.

File `.env`, `.data/`, dan `public/uploads/` sengaja tidak ikut ke Git. Jangan pernah commit `.env` (berisi password).

---

## 4. Deploy ke Vercel dari komputer sendiri

Deploy dilakukan langsung dari folder proyek di komputer Anda memakai **Vercel CLI** — tidak lewat GitHub. Vercel mengunggah isi folder, lalu menjalankan `npm install` dan `npm run build` di servernya.

> File yang tercantum di `.vercelignore` (`.env`, `.data/`, `public/uploads/`, `node_modules`, `dist`) tidak ikut terunggah, jadi password lokal dan data uji coba aman.

### 4.1 Pasang dan login Vercel CLI (sekali per komputer)

```bash
npm install -g vercel
vercel login
```

Ikuti instruksi login di browser.

### 4.2 Siapkan kode terbaru

Pastikan yang di-deploy adalah kode terbaru tim, bukan versi lama di komputer Anda:

```bash
git pull
npm install
npm run build        # cek dulu: harus selesai tanpa error
```

### 4.3 Buat project di Vercel (deploy pertama)

Dari folder proyek:

```bash
vercel
```

Jawab pertanyaannya:

| Pertanyaan | Jawaban |
|---|---|
| Set up and deploy? | `Y` |
| Which scope? | pilih akun Vercel Anda |
| Link to existing project? | `N` |
| Project name | mis. `imm` |
| In which directory is your code located? | `./` (tekan Enter) |
| Want to modify these settings? | `N` (Vite terdeteksi otomatis) |

Ini membuat project dan satu deployment *preview*. Folder `.vercel/` yang muncul menandai folder ini sudah terhubung ke project tersebut (tidak ikut ke Git).

### 4.4 Isi environment variables

Buat dulu nilai `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Lalu tambahkan tiga variabel ke environment **Production**. Setiap perintah akan meminta nilainya:

```bash
vercel env add ADMIN_USERNAME production     # mis. admin
vercel env add ADMIN_PASSWORD production     # password kuat, BERBEDA dari password lokal
vercel env add SESSION_SECRET production     # tempel hasil perintah node di atas
```

(Bisa juga lewat dashboard: project → **Settings** → **Environment Variables**.)

### 4.5 Hubungkan database (Neon Postgres) — lewat dashboard

1. Buka [vercel.com/dashboard](https://vercel.com/dashboard) → pilih project `imm` → tab **Storage** → **Create Database** → pilih **Neon** (Postgres).
2. Pilih paket gratis dan region terdekat (**Singapore**), lalu buat.
3. **Connect** ke project `imm` (centang environment **Production**, **Preview**, dan **Development**).
4. Vercel otomatis menambahkan `DATABASE_URL`. Tabel dibuat otomatis oleh aplikasi saat pertama dipakai — tidak perlu menjalankan SQL apa pun.

### 4.6 Hubungkan penyimpanan gambar (Vercel Blob) — lewat dashboard

1. Masih di tab **Storage** → **Create** → pilih **Blob**.
2. **Connect** ke project `imm`.
3. Vercel otomatis menambahkan `BLOB_READ_WRITE_TOKEN`.

Cek semua variabel sudah ada:

```bash
vercel env ls
```

Harus ada: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`.

### 4.7 Deploy ke production

```bash
vercel --prod
```

Di akhir, terminal menampilkan alamat situs live (mis. `https://imm.vercel.app`).

### 4.8 Cek bahwa semuanya jalan

Buka alamat dari Vercel (mis. `https://imm-xxxx.vercel.app`), lalu cek satu per satu:

- [ ] Halaman utama tampil lengkap
- [ ] Klik salah satu kartu Layanan → halaman detail tampil; tekan **refresh** di halaman itu → tetap tampil (bukan 404)
- [ ] `/api/content` menampilkan `{}` (atau isi konten bila sudah pernah disimpan)
- [ ] `/admin` → login dengan `ADMIN_PASSWORD` produksi berhasil
- [ ] Ubah satu teks kecil di admin → **Simpan** → buka situs di tab lain, tunggu ±10 detik, refresh → perubahan tampil
- [ ] Unggah satu gambar di admin → gambar tampil di pratinjau dan di situs

Bila ada yang gagal, lihat bagian **6. Masalah umum**.

### 4.9 Update situs setelahnya

Setiap ada perubahan kode yang ingin dinaikkan ke situs live:

```bash
git pull             # ambil kode terbaru tim
npm install
npm run build        # pastikan tidak error
vercel --prod
```

- Hanya perubahan **kode** yang perlu deploy ulang. Perubahan **konten** lewat admin langsung tersimpan di database dan tampil tanpa deploy.
- Deploy mengunggah isi folder Anda apa adanya, termasuk perubahan yang belum di-commit. Pastikan yang di-deploy memang versi yang benar, lalu push juga ke GitHub supaya tim punya kode yang sama dengan yang live.
- Bila deploy terbaru bermasalah, kembalikan ke versi sebelumnya: dashboard → **Deployments** → deployment yang masih benar → **⋯** → **Promote to Production** (atau `vercel rollback`).

### 4.10 Domain sendiri (opsional)

Dashboard project → **Settings** → **Domains** → masukkan domain (mis. `intimasmulia.co.id`) → ikuti instruksi DNS yang diberikan Vercel di pengelola domain Anda. HTTPS otomatis.

---

## 5. Mengelola konten lewat admin

Buka `https://<alamat-situs>/admin`.

- Pilih bagian di menu kiri (Perusahaan & Kontak, Hero, Tentang Kami, Struktur Organisasi, Layanan, Proyek, dll.), ubah isinya, lalu **Simpan**.
- Bagian yang punya perubahan belum disimpan diberi titik kuning di menu.
- **Batalkan** membuang perubahan yang belum disimpan. **Kembalikan ke bawaan** menghapus isi tersimpan bagian itu sehingga kembali ke isi `src/data.js`.
- Gambar: JPG, PNG, WEBP, atau GIF, maksimal 4 MB.
- Perubahan tampil di situs dalam ±10 detik (cache CDN).
- Konten di admin tersimpan di database, **bukan di Git** — push kode tidak akan menimpa konten yang sudah diubah lewat admin.

Mengganti password admin: ubah `ADMIN_PASSWORD` di Vercel (dashboard → **Settings** → **Environment Variables**, atau `vercel env rm ADMIN_PASSWORD production` lalu `vercel env add ADMIN_PASSWORD production`), kemudian jalankan `vercel --prod`. Untuk mengeluarkan semua sesi login yang aktif, ganti juga `SESSION_SECRET`.

---

## 6. Masalah umum

| Gejala | Penyebab & solusi |
|---|---|
| `Cannot find package 'express'` (atau paket lain) saat `npm run dev` | Paket belum terpasang. Jalankan `npm install`. |
| Login: *ADMIN_PASSWORD belum diatur di environment variables.* | Lokal: isi `ADMIN_PASSWORD` di `.env` lalu restart `npm run dev`. Vercel: tambahkan (langkah 4.4) lalu `vercel --prod`. |
| Login di Vercel: *SESSION_SECRET belum diatur di environment variables.* | Tambahkan `SESSION_SECRET` (langkah 4.4) lalu `vercel --prod`. |
| Simpan: *Database belum diatur (DATABASE_URL). Konten tidak bisa disimpan.* | Database Neon belum terhubung, atau belum deploy ulang setelah terhubung. Ulangi 4.5 lalu `vercel --prod`. |
| Unggah gambar: *Penyimpanan gambar belum diatur (BLOB_READ_WRITE_TOKEN).* | Blob belum terhubung, atau belum deploy ulang setelah terhubung. Ulangi 4.6 lalu `vercel --prod`. |
| `vercel: command not found` / *tidak dikenali* | Vercel CLI belum terpasang. Jalankan `npm install -g vercel`, lalu buka terminal baru. |
| `vercel --prod` gagal saat build | Jalankan `npm run build` di komputer sendiri untuk melihat errornya, perbaiki, lalu deploy lagi. |
| Deploy dari komputer lain masuk ke project baru | Folder itu belum terhubung. Jalankan `vercel link`, pilih project yang sudah ada (`imm`). Komputer itu harus login dengan akun Vercel yang sama. |
| *Terlalu banyak percobaan login.* | 5 kali salah password → dikunci 10 menit. Tunggu, lalu coba lagi. |
| Perubahan dari admin belum tampil | Tunggu ±10 detik lalu refresh. Pastikan sudah menekan **Simpan** (titik kuning di menu hilang). |
| Halaman `/layanan/...` atau `/admin` 404 saat di-refresh | Pastikan `vercel.json` ada di root folder proyek saat menjalankan `vercel --prod`. |
| Halaman kosong putih | Buka DevTools (F12) → tab Console, catat pesan errornya. |
| `Port 5173 is in use` | Ada `npm run dev` lain yang masih jalan. Tutup, atau pakai alamat port lain yang ditampilkan Vite. |
| Error di server Vercel | Dashboard → **Logs** (atau Deployments → deployment → **Functions**) untuk melihat pesan lengkap. |

---

## Lampiran: environment variables

| Variabel | Wajib di Vercel | Lokal | Keterangan |
|---|---|---|---|
| `ADMIN_USERNAME` | tidak (bawaan `admin`) | opsional | Username login admin |
| `ADMIN_PASSWORD` | **ya** | **ya** | Password login admin |
| `SESSION_SECRET` | **ya** | opsional | Kunci tanda tangan sesi login. Kosong di lokal = sesi hilang tiap restart |
| `DATABASE_URL` | **ya** (otomatis dari Neon) | kosongkan | Kosong = konten disimpan ke `.data/content.json` |
| `BLOB_READ_WRITE_TOKEN` | **ya** (otomatis dari Blob) | kosongkan | Kosong = gambar disimpan ke `public/uploads/` |

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm install` | Pasang semua paket (setelah clone atau setelah `package.json` berubah) |
| `npm run dev` | Jalankan situs + admin + API di komputer sendiri |
| `npm run build` | Buat versi produksi ke folder `dist/` (cek sebelum deploy; Vercel juga menjalankannya saat deploy) |
| `npm run preview` | Coba hasil `build` di komputer sendiri |
| `vercel` | Deploy *preview* (alamat uji coba, tidak mengubah situs live) |
| `vercel --prod` | Deploy ke situs live |
| `vercel env ls` | Lihat environment variables di Vercel |
