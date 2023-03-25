# IF3260_Tugas2_K03_G10
> Implementasi WebGL pada 3D Hollow Object
>
>Tugas Besar II IF3260 Grafika Komputer Sem. 2 2022/2023
### 3D WebGL Hollow Object

### Deskripsi singkat
Pada tugas besar 2 mata kuliah IF3260 Grafika Komputer, dilakukan eksplorasi terkait dengan penggunaan WebGL pada hollow objects yang dibuat sendiri secara manual menggunakan konsep matematika terkait dengan konfigurasi titik dari hollow object pada ruang 3 dimensi. Adapun WebGL yang digunakan untuk membuat interaksi pada hollow object tersebut ialah WebGL murni, tanpa library/framework tambahan. Umumnya dalam proyek WebGL, terdapat library yang berisi fungsi utilitas yang umumnya sudah disiapkan oleh WebGL itu sendiri. Namun, pada tugas besar kali ini, kontributor membuat fungsi-fungsi tersebut sendiri. 

Adapun fungsi-fungsi tersebut mengimplementasikan fungsionalitas dalam melakukan berbagai macam interaksi dengan Hollow Objects melalui transformasi objek, proyeksi objek, mengubah konfigurasi view kamera terhadap objek, sampai dengan eksplorasi terkait dengan Shading yang ada pada Computer Graphics. 

Aplikasi yang dibuat harus bisa digunakan untuk menggambar bidang tiga dimensi yaitu kubus, prisma segitiga, dan limas persegi dengan fungsi utilitas untuk mengubah jenis proyeksi (orthographic, oblique  atau perspective), melakukan transformasi objek (rotasi, translasi, dan scaling dari model yang tersedia), mengubah jarak dan radius kamera view, dan me-reset ke default view. Model disimpan pada file dengan ekstensi .json dan dapat diupload pada program. Model yang memiliki warna dasar yang kemudian di-shading, fitur ini dapat dinyalakan atau dimatikan pada saat penggambaran model.

## Requirements
1. _Web browser_ favorit Anda
2. **[RECOMMENDED]** _Extension_ **_Live Server_** pada _Visual Studio Code_

## Cara Menjalankan
_Fork_ repository ini ke komputer Anda terlebih dahulu. Ada 3 cara untuk menjalankan aplikasi:
1. **Membuka file index.html**
2. **Menggunakan Visual Studio Code**
3. **Menggunakan Python HTTP Server**

### Membuka `index.html` langsung
1. Pastikan _repository_ ini sudah di-fork
2. Buka direktori `src`, lalu buka file `index.html` pada _browser_ Anda

### Menggunakan Visual Studio Code
1. Pastikan _extension_ **_Live Server_** sudah terpasang
> Klik menu '_Extensions_' > cari **_Live Server_** > klik _Install_
2. Buka dokumen `index.html` dari _Visual Studio Code_
3. Klik kanan, lalu pilih opsi '**_Open with Live Server_**
4. Akan muncul _link_ menuju aplikasi (biasanya akan di-_redirect_ atau Anda dapat membuka langsung _link tersebut_)

### Jika memiliki kebingungan, silakan gunakan fitur help yang tersedia

### Kontributor
| NIM           | Nama          | 
| ------------- | ------------- |
| 13520113      | Brianaldo Phandiarta |
| 13520114      | Kevin Roni    |
| 13520137      | Muhammad Gilang Ramadhan     |

