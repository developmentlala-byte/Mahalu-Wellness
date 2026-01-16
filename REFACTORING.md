# Refactoring Documentation

## Overview

Codebase telah direfaktor untuk memisahkan data dari code, menggunakan JSON files untuk data management yang lebih mudah, dan direorganisasi struktur folder untuk lebih terorganisir dan mudah di-maintain.

## Struktur File Baru

### Folder Structure

```
Mahalu-Wellness/
├── css/                      # Semua CSS files (NEW)
│   ├── styles.css           # Main stylesheet
│   ├── about.css            # About page styles
│   ├── services.css         # Services page styles
│   └── gallery.css          # Gallery page styles
├── js/                       # Semua JavaScript files (ORGANIZED)
│   ├── layout.js            # Header/footer loader & navigation
│   ├── script.js            # Loading screen & video pause
│   ├── about.js             # About page interactions
│   ├── gallery.js           # Gallery lightbox
│   ├── reviews.js           # Reviews slider
│   ├── services-preview.js  # Services preview on home
│   ├── services.js          # Services modal
│   └── owner.js             # Owner quote
├── data/                     # JSON data files
│   ├── reviews.json
│   ├── services-preview.json
│   ├── services.json
│   └── owner.json
├── partials/                 # HTML partials
│   ├── _header.html
│   └── _footer.html
└── assets/                   # Images, videos, etc.
```

### Data Files (JSON)

Semua data sekarang disimpan di folder `data/`:

- `data/reviews.json` - Data review/ulasan customer
- `data/services-preview.json` - Data services preview di home page
- `data/services.json` - Data services lengkap di services page
- `data/owner.json` - Data owner quote

### JavaScript Files (Refactored)

Semua JavaScript modular sekarang di folder `js/`:

- `js/layout.js` - Header/footer loader, navigation, mobile menu, scroll behavior
- `js/script.js` - Loading screen & video pause functionality
- `js/about.js` - Scroll reveal & parallax effects (navbar behavior removed - handled by layout.js)
- `js/gallery.js` - Gallery lightbox (navbar behavior removed - handled by layout.js)
- `js/reviews.js` - Load dan render reviews dari JSON
- `js/services-preview.js` - Load dan render services preview dari JSON
- `js/services.js` - Load dan render services dari JSON
- `js/owner.js` - Load dan render owner data dari JSON

### CSS Files (Organized)

Semua CSS files sekarang di folder `css/`:

- `css/styles.css` - Main stylesheet dengan semua global styles dan variables
- `css/about.css` - About page specific styles (navbar behavior removed - handled by styles.css)
- `css/services.css` - Services page specific styles (navbar behavior removed - handled by styles.css)
- `css/gallery.css` - Gallery page specific styles (navbar behavior removed - handled by styles.css)

## Perubahan File

### home.html

- Services preview items sekarang di-load dari JSON (via `js/services-preview.js`)
- Review items sekarang di-load dari JSON (via `js/reviews.js`)
- Owner quote sekarang di-load dari JSON (via `js/owner.js`)

### services.html

- Services items sekarang di-load dari JSON (via `js/services.js`)

### script.js

- Dihapus: Review slider code (sudah dipindah ke `js/reviews.js`)
- Tetap: Video pause functionality

## Cara Menambah/Edit Data

### Menambah Review Baru

Edit file `data/reviews.json`:

```json
{
  "reviews": [
    {
      "text": "Review text di sini",
      "name": "Nama Customer"
    }
  ]
}
```

### Menambah Service Baru

Edit file `data/services.json`:

```json
{
  "services": [
    {
      "title": "Modal Title",
      "cardTitle": "Card Title",
      "description": "Description text",
      "image": "path/to/image.jpg",
      "alt": "Alt text"
    }
  ]
}
```

### Edit Services Preview

Edit file `data/services-preview.json`

### Edit Owner Quote

Edit file `data/owner.json`

## Perubahan Refactoring Terbaru

### 1. Reorganisasi Struktur Folder

- **CSS Files**: Semua file CSS dipindahkan ke folder `css/`

  - `styles.css` → `css/styles.css`
  - `about.css` → `css/about.css`
  - `services.css` → `css/services.css`
  - `gallery.css` → `css/gallery.css`

- **JavaScript Files**: Semua file JS dipindahkan ke folder `js/`
  - `layout.js` → `js/layout.js`
  - `script.js` → `js/script.js`
  - `about.js` → `js/about.js`
  - `gallery.js` → `js/gallery.js`

### 2. Penghapusan Duplikasi Kode

- **Navbar Scroll Behavior**:

  - Dihapus dari `about.js` dan `gallery.js` (sudah di-handle oleh `layout.js`)
  - Dihapus dari `about.css`, `services.css`, `gallery.css` (sudah di-handle oleh `styles.css`)
  - Semua navbar scroll behavior sekarang terpusat di `js/layout.js` dan `css/styles.css`

- **Path Updates**:
  - Semua path CSS/JS di HTML files di-update untuk mencerminkan struktur folder baru
  - Relative paths untuk `data/` dan `partials/` tetap sama (relatif dari root)

## Benefits

1. **Data Separation**: Data terpisah dari code, lebih mudah di-maintain
2. **Modularity**: JavaScript code lebih modular dan organized
3. **Maintainability**: Lebih mudah untuk update data tanpa edit HTML/JS
4. **Scalability**: Mudah menambah data baru tanpa mengubah structure code
5. **Organization**: Struktur folder lebih rapi dan terorganisir
6. **DRY Principle**: Duplikasi kode dihilangkan (navbar behavior, CSS variables)
7. **Consistency**: Semua file dengan tipe yang sama berada di folder yang sama

## Catatan

- Semua fungsi dan design tetap sama, hanya struktur code yang berubah
- Data sekarang load via fetch API (async)
- Navbar scroll behavior sekarang terpusat di `layout.js` untuk menghindari konflik
- CSS variables dan global styles tetap di `styles.css`
- Page-specific styles tetap di file CSS masing-masing halaman
