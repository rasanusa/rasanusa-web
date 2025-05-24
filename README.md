# 🍜 RasaNusa: Search Engine Resep Masakan Khas Indonesia

**RasaNusa** adalah aplikasi search engine khusus untuk mencari resep makanan khas Indonesia. Aplikasi ini memungkinkan pengguna untuk menelusuri ribuan resep lengkap dengan bahan-bahan, langkah memasak, dan gambar pendukung. Didesain untuk memberikan kemudahan dalam menemukan inspirasi masakan nusantara secara cepat dan akurat.

---

## 📐 Arsitektur Sistem

RasaNusa dibangun dengan arsitektur modern yang memisahkan komponen frontend, backend, search engine, dan AI assistant:

1. **Frontend & Backend**: T3 Stack (Next.js, TypeScript, Tailwind CSS, tRPC)
2. **Search Engine**: Elasticsearch 9.0.0 (dihosting di GCP menggunakan Docker)
3. **AI Integration**: Llama-3.1-8B-Instruct melalui HuggingFace API
4. **Dataset**: 15.000 resep masakan Indonesia dari Kaggle
5. **Deployment**: Vercel untuk aplikasi web, Google Cloud Platform untuk Elasticsearch

---

## 📊 Dataset

- **Sumber**: [Indonesian Food Recipes Dataset dari Kaggle](https://www.kaggle.com/datasets/albertnathaniel12/food-recipes-dataset/data)
- **Jumlah Resep**: ~15.000 resep masakan Indonesia
- **Content**: Nama resep, bahan-bahan, langkah memasak, kategori, URL gambar
- **Preprocessing**: Normalisasi judul, pembersihan data, scraping gambar tambahan

---

## 🛠️ Instalasi dan Setup

### Prerequisites

- Node.js 18+
- npm atau yarn
- Git
- Docker (untuk Elasticsearch lokal)

### 1. Clone Repository

```bash
git clone https://github.com/rasanusa/rasanusa-web.git
cd rasanusa-web
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Environment Configuration

Buat file `.env` di root directory:

```env
# Elasticsearch Configuration
ELASTICSEARCH_USERNAME="YOUR_ELASTIC_USERNAME"
ELASTIC_PASSWORD="YOUR_PASSWORD"
ELASTIC_SEARCH_URL="YOUR_ELASTIC_SEARCH_URL"

# HuggingFace API untuk LLM Integration
HUGGINGFACE_API_TOKEN="your_huggingface_token"
```

### 4. Setup Elasticsearch (Lokal)

Jika ingin menjalankan Elasticsearch secara lokal:

```bash
# Menggunakan Docker
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  elasticsearch:9.0.0
```

### 5. Indexing Data

Jalankan script untuk mengindex data resep ke Elasticsearch:

```bash
# Pastikan Elasticsearch sudah running
python recipe-index.py
```

### 6. Menjalankan Aplikasi

#### Development Mode

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:3000`

#### Production Build

```bash
npm run build
npm run start
# atau
yarn build
yarn start
```

---

## 🌐 Deployment

**Live URL**: [https://rasanusa.vercel.app](https://rasanusa.vercel.app)

### Elasticsearch (Google Cloud Platform)

Instance Elasticsearch tersedia di:

- **URL**: `https://34.101.127.5:9200/`
- **Platform**: Google Cloud Platform
- **Container**: Docker

---

## 🤖 Integrasi AI (LLM)

RasaNusa mengintegrasikan **Llama-3.1-8B-Instruct** melalui HuggingFace API untuk berbagai fitur:

### Fitur AI yang Tersedia:

1. **Deskripsi Makanan** - Generate deskripsi dari search term
2. **Translation** - Translate detail resep ke bahasa Inggris
3. **Recipe Summary** - Ringkasan resep yang mudah dipahami
4. **Cooking Tips** - Tips memasak untuk resep tertentu

### Setup HuggingFace API:

1. Daftar di [HuggingFace](https://huggingface.co/)
2. Generate API token
3. Tambahkan token ke environment variables

---

## 📱 Cara Penggunaan Aplikasi

Berikut adalah panduan langkah demi langkah untuk menggunakan RasaNusa:

### 1. 🔍 Mencari Resep

Pada halaman utama, ketikkan nama makanan khas Indonesia yang ingin Anda ketahui resepnya di kolom pencarian. Contoh:

- "Rendang"
- "Gudeg"
- "Soto Ayam"
- "Nasi Goreng"

### 2. 🎯 Memulai Pencarian

Tekan tombol **Enter** pada keyboard atau klik tombol **Search** untuk memulai pencarian.

### 3. 📋 Melihat Hasil Pencarian

Setelah melakukan pencarian, Anda akan melihat:

- **Deskripsi singkat** tentang makanan yang Anda cari (dihasilkan oleh AI)
- **Daftar resep** yang sesuai dengan query pencarian Anda
- **Filter dan sorting** untuk mempersempit hasil pencarian

### 4. 📖 Memilih Resep

Pilih salah satu resep yang menarik perhatian Anda dengan mengklik card resep tersebut.

### 5. 🍳 Melihat Detail Resep

Di halaman detail resep, Anda dapat melihat:

- **Bahan-bahan** lengkap yang dibutuhkan
- **Langkah-langkah** memasak yang detail
- **AI-powered Summary** - ringkasan resep yang mudah dipahami
- **Cooking Tips** - tips memasak dari AI untuk hasil yang optimal

### 6. 🌍 Fitur Multi-bahasa

Jika Anda ingin membaca resep dalam bahasa Inggris, gunakan fitur **translate** yang tersedia di halaman detail resep untuk menerjemahkan konten ke bahasa Inggris.

---

**RasaNusa** - Bringing Indonesian culinary heritage to your fingertips! 🇮🇩✨
