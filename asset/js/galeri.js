const JSON_URL = "../data/galeri.json";

const galleryContainer = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeLightbox");

// Fungsi load JSON
async function loadGallery() {
  try {
    const res = await fetch(JSON_URL);
    if (!res.ok) throw new Error("Gagal memuat JSON");
    const data = await res.json();
    renderGallery(data);
  } catch (err) {
    console.error(err);
    galleryContainer.innerHTML = `<p style="color:red">Gagal memuat data galeri 😢</p>`;
    galleryContainer.style.textAlign = `center`;
  }
}

// Tampilkan galeri dari data JSON
function renderGallery(items) {
  galleryContainer.innerHTML = "";

  // 🔄 Balik urutan data (jadi 5,4,3,2,1)
  const reversedItems = [...items].reverse();

  reversedItems.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "card";
    figure.innerHTML = `
      <img class="media" src="${item.src}" alt="${item.name}" loading="lazy">
      <figcaption class="caption">
        <span class="title font-minecraft">${item.name}</span>
      </figcaption>
    `;
    figure.addEventListener("click", () => openLightbox(item.src, item.name));
    galleryContainer.appendChild(figure);
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
loadGallery();
