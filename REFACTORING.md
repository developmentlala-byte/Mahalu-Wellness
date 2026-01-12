# Refactoring Documentation

## Overview
Codebase telah direfaktor untuk memisahkan data dari code, menggunakan JSON files untuk data management yang lebih mudah.

## Struktur File Baru

### Data Files (JSON)
Semua data sekarang disimpan di folder `data/`:
- `data/reviews.json` - Data review/ulasan customer
- `data/services-preview.json` - Data services preview di home page
- `data/services.json` - Data services lengkap di services page
- `data/owner.json` - Data owner quote

### JavaScript Files (Refactored)
Semua JavaScript modular sekarang di folder `js/`:
- `js/reviews.js` - Load dan render reviews dari JSON
- `js/services-preview.js` - Load dan render services preview dari JSON
- `js/services.js` - Load dan render services dari JSON (refactored dari services.js lama)
- `js/owner.js` - Load dan render owner data dari JSON
- `script.js` - Main script file (hanya video pause functionality)

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

## Benefits

1. **Data Separation**: Data terpisah dari code, lebih mudah di-maintain
2. **Modularity**: JavaScript code lebih modular dan organized
3. **Maintainability**: Lebih mudah untuk update data tanpa edit HTML/JS
4. **Scalability**: Mudah menambah data baru tanpa mengubah structure code

## Catatan

- Semua fungsi dan design tetap sama, hanya struktur code yang berubah
- Data sekarang load via fetch API (async)
- File `services.js` lama sudah dihapus (digantikan dengan `js/services.js`)
