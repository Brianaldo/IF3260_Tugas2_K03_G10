const button = document.getElementById("help-canvas");

button.addEventListener("click", function() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    
    const popup = document.createElement("div");
    popup.classList.add("popup");
    
    const title = document.createElement("h2");
    title.textContent = "Help Menu";
    
    const points = document.createElement("ul");
    const point1 = document.createElement("li");
    point1.textContent = "Untuk memulai, silahkan pilih file objek yang ingin di load.";
    const point2 = document.createElement("li");
    point2.textContent = "Objek yang dapat di load adalah objek yang memiliki ekstensi .json (object yang tersedia dapat dilihat di folder src/test)";
    const point3 = document.createElement("li");
    point3.textContent = "Setelah objek di load, objek akan muncul di canvas.";
    const point4 = document.createElement("li");
    point4.textContent = "Objek yang akan ditampilkan memiliki warna default yang tertera pada atribut facecolor.";
    const point5 = document.createElement("li");
    point5.textContent = "Untuk mengubah warna objek, silahkan pilih warna yang diinginkan pada color picker.";
    const point6 = document.createElement("li");
    point6.textContent = "Untuk mengubah proyeksi objek, silahkan pilih jenis proyeksi pada bagian Projection.";
    const point7 = document.createElement("li");
    point7.textContent = "Untuk melakukan transformasi objek, silahkan pilih jenis pergeseran pada bagian Translation, Rotation, dan Scaling pada arah sesuai yang diinginkan.";
    const point8 = document.createElement("li");
    point8.textContent = "Untuk mengubah posisi kamera, silahkan atur posisi kamera pada bagian Radiues dan Angle Camera.";
    const point9 = document.createElement("li");
    point9.textContent = "Secara default, shading akan dinyalakan dan idle animation dimatikan. Untuk mengubahnya, silahkan pilih pada bagian Shading dan Idle Animation.";
    const point10 = document.createElement("li");
    point10.textContent = "Untuk mengubah posisi cahaya, silahkan atur posisi cahaya pada bagian Light Position.";
    const point11 = document.createElement("li");
    point11.textContent = "Untuk mengubah warna cahaya, silahkan pilih warna yang diinginkan pada color picker.";
    const point12 = document.createElement("li");
    point12.textContent = "Untuk mengubah koefisien shininess, silahkan atur pada bagian Shininess.";
    const point13 = document.createElement("li");
    point13.textContent = "Reset View akan mengubah objek ke posisi default.";
    const point14 = document.createElement("li");
    point14.textContent = "Klik di luar popup untuk menutup popup.";

    
    points.appendChild(point1);
    points.appendChild(point2);
    points.appendChild(point3);
    points.appendChild(point4);
    points.appendChild(point5);
    points.appendChild(point6);
    points.appendChild(point7);
    points.appendChild(point8);
    points.appendChild(point9);
    points.appendChild(point10);
    points.appendChild(point11);
    points.appendChild(point12);
    points.appendChild(point13);
    points.appendChild(point14);
    
    popup.appendChild(title);
    popup.appendChild(points);
    
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    
    overlay.addEventListener("click", function() {
        document.body.removeChild(overlay);
        document.body.removeChild(popup);
    });
});
