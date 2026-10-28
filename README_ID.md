# Contact Management Web Application

Aplikasi web untuk mengelola kontak dan alamat, dengan autentikasi pengguna, pencarian kontak, serta operasi CRUD melalui REST API.

## Fitur

- **Autentikasi pengguna:** registrasi, login, melihat dan memperbarui profil, mengganti kata sandi, serta logout.
- **Manajemen kontak:** menambah, melihat detail, mengubah, menghapus, mencari, dan melakukan pagination daftar kontak.
- **Manajemen alamat:** menambah, melihat daftar/detail, mengubah, dan menghapus alamat yang terhubung dengan kontak.
- **Proteksi halaman:** halaman dashboard menggunakan pemeriksaan autentikasi.
- **Penanganan halaman error:** halaman 401, 404, dan 500.
- **Validasi data API:** validasi request menggunakan Joi.
- **Feedback UI:** notifikasi menggunakan SweetAlert2, loader, dan animasi Lottie untuk halaman error.

## Teknologi

### Frontend

- React 19
- Vite
- React Router 7
- Tailwind CSS 4
- `react-use`
- SweetAlert2
- Lottie React
- JavaScript (ES Modules)

### Backend

- Node.js
- Express 4
- PostgreSQL
- Prisma ORM
- Joi
- bcrypt
- UUID
- Winston
- Jest dan Supertest untuk pengujian API

## Struktur Proyek

```text
Website-Contact-Management/
├── Frontend/
│   ├── public/
│   └── src/
│       ├── components/     # Komponen layout, user, kontak, dan form
│       ├── hooks/          # Hook untuk fetch, CRUD, dan helper UI
│       ├── lib/api/        # Pemanggilan endpoint User, Contact, Address
│       ├── pages/          # Halaman kontak, alamat, dan error
│       └── styles/
└── Backend/
    ├── docs/               # Spesifikasi User, Contact, dan Address API
    ├── prisma/             # Schema dan migration database
    ├── src/
    │   ├── application/    # Konfigurasi Express, database, logging
    │   ├── controller/
    │   ├── middleware/     # Autentikasi dan error handling
    │   ├── route/
    │   ├── service/        # Logika bisnis
    │   └── validation/
    └── test/               # Pengujian API
```

## Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js dan npm
- PostgreSQL
- Git (opsional, jika ingin melakukan clone repository)

## Menjalankan Aplikasi Secara Lokal

Frontend dan backend dijalankan secara terpisah. Jalankan perintah berikut dari direktori masing-masing.

### 1. Siapkan database dan backend

Masuk ke direktori backend:

```bash
cd Backend
npm install
```

Buat database PostgreSQL, misalnya `belajar_reactjs_contact_management`, lalu konfigurasi koneksi database melalui variabel `DATABASE_URL` di file `Backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/belajar_reactjs_contact_management?schema=public"
```

atau gunakan layanan supabase

```env
DATABASE_URL="postgresql://postgres.url_supabase.com:5432/postgres"
```

Ganti `USER` dan `PASSWORD` sesuai konfigurasi PostgreSQL lokal. Jangan commit file `.env` atau membagikan kredensial database.

Generate Prisma Client dan jalankan migration:

```bash
npx prisma generate
npx prisma migrate dev
```

Backend membaca `process.env.PORT` dan menggunakan port `3000` jika variabel `PORT` tidak ditentukan. Kode backend tidak memuat package `dotenv`, jadi pastikan `DATABASE_URL` tersedia di environment proses Node.js. Pada Node.js versi yang mendukung `--env-file`, backend dapat dijalankan dengan:

```bash
node --env-file=.env src/main.js
```

Untuk pengembangan, perintah di atas dapat digunakan dari folder `Backend`. Alternatifnya, atur `DATABASE_URL` pada environment terminal sebelum menjalankan `npm run dev`.

Backend berjalan secara default di:

```text
http://localhost:3000
```

Endpoint pemeriksaan sederhana:

```text
GET http://localhost:3000/ping
```

### 2. Siapkan frontend

Buka terminal baru, lalu masuk ke direktori frontend:

```bash
cd Frontend
npm install
```

Buat file `.env` di folder `Frontend`:

```env
VITE_API_PATH=http://localhost:3000/api
```

`VITE_API_PATH` harus menyertakan `/api`, karena fungsi API frontend menambahkan path seperti `/users`, `/contacts`, dan `/contacts/:contactId/addresses`.

Jalankan development server:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan oleh Vite di terminal (biasanya `http://localhost:5173`).

## Perintah yang Tersedia

### Frontend (`Frontend/`)

| Perintah          | Kegunaan                             |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Menjalankan development server Vite  |
| `npm run build`   | Membuat build produksi               |
| `npm run preview` | Meninjau build produksi secara lokal |
| `npm run lint`    | Menjalankan ESLint                   |

### Backend (`Backend/`)

| Perintah      | Kegunaan                                      |
| ------------- | --------------------------------------------- |
| `npm run dev` | Menjalankan backend dengan `node src/main.js` |
| `npm start`   | Menjalankan backend                           |
| `npm test`    | Menjalankan test menggunakan Jest             |

> Catatan: script `dev` dan `start` backend tidak otomatis memuat file `.env`. Pastikan environment variable tersedia saat proses Node.js dijalankan.

## Ringkasan REST API

Semua endpoint API menggunakan prefix `/api`, kecuali endpoint health check `/ping`.

| Metode   | Endpoint                                        | Akses  | Keterangan                              |
| -------- | ----------------------------------------------- | ------ | --------------------------------------- |
| `POST`   | `/api/users`                                    | Publik | Registrasi pengguna                     |
| `POST`   | `/api/users/login`                              | Publik | Login dan memperoleh token              |
| `GET`    | `/api/users/current`                            | Token  | Melihat profil pengguna                 |
| `PATCH`  | `/api/users/current`                            | Token  | Memperbarui nama atau kata sandi        |
| `DELETE` | `/api/users/logout`                             | Token  | Logout                                  |
| `POST`   | `/api/contacts`                                 | Token  | Membuat kontak                          |
| `GET`    | `/api/contacts`                                 | Token  | Mencari dan melakukan pagination kontak |
| `GET`    | `/api/contacts/:contactId`                      | Token  | Melihat detail kontak                   |
| `PUT`    | `/api/contacts/:contactId`                      | Token  | Memperbarui kontak                      |
| `DELETE` | `/api/contacts/:contactId`                      | Token  | Menghapus kontak                        |
| `POST`   | `/api/contacts/:contactId/addresses`            | Token  | Membuat alamat untuk kontak             |
| `GET`    | `/api/contacts/:contactId/addresses`            | Token  | Melihat daftar alamat                   |
| `GET`    | `/api/contacts/:contactId/addresses/:addressId` | Token  | Melihat detail alamat                   |
| `PUT`    | `/api/contacts/:contactId/addresses/:addressId` | Token  | Memperbarui alamat                      |
| `DELETE` | `/api/contacts/:contactId/addresses/:addressId` | Token  | Menghapus alamat                        |
| `GET`    | `/ping`                                         | Publik | Health check                            |

Endpoint yang membutuhkan autentikasi menggunakan header:

```http
Authorization: <token>
```

Untuk pencarian kontak, endpoint `GET /api/contacts` mendukung query parameter `name`, `email`, `phone`, `page`, dan `size`.

Spesifikasi request dan response lebih lengkap tersedia di:

- [`Backend/docs/user.md`](Backend/docs/user.md)
- [`Backend/docs/contact.md`](Backend/docs/contact.md)
- [`Backend/docs/address.md`](Backend/docs/address.md)

## Model Data

Database terdiri dari tiga model utama:

- **User** — akun pengguna; `username` menjadi primary key.
- **Contact** — data kontak yang terhubung ke user.
- **Address** — data alamat yang terhubung ke contact.

Relasi utama: satu `User` memiliki banyak `Contact`, dan satu `Contact` memiliki banyak `Address`. Detail skema dapat dilihat di `Backend/prisma/schema.prisma`.

## Catatan Konfigurasi

- Backend mengaktifkan CORS agar frontend dan backend dapat berjalan pada port berbeda saat pengembangan.
- Kata sandi pengguna di-hash menggunakan `bcrypt`.
- Endpoint yang dilindungi memeriksa token melalui middleware autentikasi.
- File environment lokal berisi konfigurasi sensitif; gunakan placeholder di dokumentasi dan jangan memasukkan kredensial asli ke repository.
