// main.js
window.onload = function () {
  // Ambil semua link <a> dalam dokumen
  const links = document.querySelectorAll("a");

  // Tambahkan event listener untuk setiap link
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // Mencegah perilaku default saat mengklik link
      const href = link.getAttribute("href");

      // Gunakan pushState untuk mengubah URL tanpa reload halaman
      history.pushState(null, null, href);
      handleRouting(href);
    });
  });

  // Event listener saat tombol "Kembali" ditekan
  window.addEventListener("popstate", () => {
    handleRouting(window.location.pathname);
  });

  // Fungsi untuk menangani routing dan memuat konten sesuai URL
  function handleRouting(url) {
    const path = url.split("/")[1]; // Ambil bagian pertama dari path tanpa '/'
    const contentDiv = document.getElementById("content"); // Ganti dengan ID elemen tempat konten akan dimuat

    // Lakukan pemeriksaan URL dan muat konten sesuai dengan path
    if (path === "presensi") {
      loadContent("presensi/presensi.html", contentDiv);
    } else {
      loadContent("index.html", contentDiv);
    }
  }

  // Fungsi untuk memuat konten menggunakan XMLHttpRequest
  function loadContent(url, container) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        container.innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }

  // Pemanggilan fungsi handleRouting saat halaman pertama kali dimuat
  handleRouting(window.location.pathname);
};
