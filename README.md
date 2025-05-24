# Rasanusa 🇮🇩

RasaNusa adalah suatu aplikasi search engine khusus untuk mencari resep makanan khas Indonesia. Aplikasi ini memungkinkan pengguna untuk mencari resep makanan beserta bahan-bahan dan cara pembuatannya. 

## Teknologi Yang Digunakan

- Next.js — Framework React untuk web modern.
- tRPC — API type-safe antara client dan server.
- NextAuth.js — Autentikasi fleksibel untuk Next.js.
- Prisma — ORM modern untuk TypeScript & Node.js.
- Drizzle ORM — ORM lightweight dan type-safe.
- Tailwind CSS — Utility-first CSS framework.

## Cara Instalasi

### Prasyarat

- Node.js (v18 ke atas direkomendasikan)
- npm atau yarn
- Database (PostgreSQL/MySQL/SQLite sesuai konfigurasi)

### Langkah Implementasi

1. Clone Repository

``` 
git clone https://github.com/rasanusa/rasanusa-web.git
cd rasanusa-web
```

2. Instal dependency

```
npm install
# atau
yarn install
```

3. Konfigurasi environment variable

- Salin file .env.example menjadi .env
- Edit konfigurasi database dan setting authentication di file .env

4. Generate Prisma Client & migrate database

## Cara Menjalankan Sistem

### Mode Dev

```
npm run dev
# atau
yarn dev
```

### Build untuk Production

```
npm run build
npm start
# atau
yarn build
yarn start
```
