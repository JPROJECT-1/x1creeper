const JSON_URL = "../data/profil.json";

const profilContainer = document.getElementById("profil");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeLightbox");

// Fungsi load JSON
async function loadProfil() {
  try {
    const res = await fetch(JSON_URL);
    if (!res.ok) throw new Error("Gagal memuat JSON");
    const data = await res.json();
    renderProfil(data);
  } catch (err) {
    console.error(err);
    profilContainer.innerHTML = `<p style="color:red">Gagal memuat data profil 😢</p>`;
    profilContainer.style.textAlign = `center`;
  }
}

// Tampilkan galeri dari data JSON
function renderProfil(items) {
  profilContainer.innerHTML = "";
  items.forEach((item, i) => {
    const figure = document.createElement("figure");
    figure.className = "card";
    figure.innerHTML = `
        <img class="media" src="${item.src}" alt="${item.name}" loading="lazy">
        <figcaption class="caption">
          <span class="title font-minecraft">${item.name}</span>
          <span class="tugas font-minecraft">${item.tugas}</span>
        </figcaption>
      `;
    figure.addEventListener("click", () => openLightbox(item.src, item.name));
    profilContainer.appendChild(figure);
  });
}

// Lightbox buka / tutup
function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("active");
}
closeBtn.onclick = () => lightbox.classList.remove("active");
lightbox.onclick = (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
};

// Jalankan saat halaman dimuat
loadProfil();
