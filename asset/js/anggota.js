const anggotaContainer = document.getElementById("anggota");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeLightbox");

// Ambil data dari Firestore
async function loadAnggota() {
  try {
    const data = await ambilData(); // ← ambil dari Firestore milikmu
    renderAnggota(data);
  } catch (err) {
    console.error(err);
    anggotaContainer.innerHTML = `<p style="color:red">Gagal memuat data anggota 😢</p>`;
    anggotaContainer.style.textAlign = `center`;
  }
}

// Render + urutkan by id
function renderAnggota(items) {
  // Urutkan ID ASC
  items = [...items].sort((a, b) => Number(a.id) - Number(b.id));

  anggotaContainer.innerHTML = "";

  items.forEach((it) => {
    const figure = document.createElement("figure");
    figure.className = "card";

    figure.innerHTML = `
      <img class="media" 
           src="https://admin-x1creeper.ct.ws/source/${it.src}" 
           alt="${it.name}" 
           loading="lazy">

      <figcaption class="caption">
        <span class="title font-minecraft">${it.name}</span>
        <span class="tugas font-minecraft">${it.tugas}</span>
      </figcaption>
    `;

    figure.addEventListener("click", () =>
      openLightbox("https://admin-x1creeper.ct.ws/source/" + it.src, it.name)
    );

    anggotaContainer.appendChild(figure);
  });
}

// Lightbox
function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("active");
}
closeBtn.onclick = () => lightbox.classList.remove("active");
lightbox.onclick = (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
};

// Jalankan
loadAnggota();
