const galleryContainer = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeLightbox");

async function loadGallery() {
  try {
    const data = await ambilData();
    renderGallery(data);
  } catch (err) {
    console.error(err);
    galleryContainer.innerHTML = `<p style="color:red">Gagal memuat data galeri 😢</p>`;
    galleryContainer.style.textAlign = "center";
  }
}

function renderGallery(items) {
  galleryContainer.innerHTML = "";

  const reversedItems = [...items].reverse();

  reversedItems.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "card";
    figure.innerHTML = `
        <img class="media" src="https://admin-x1creeper.ct.ws/source/${item.src}" alt="${item.name}" loading="lazy">
        <figcaption class="caption">
          <span class="title font-minecraft">${item.name}</span>
        </figcaption>
      `;
    figure.addEventListener("click", () =>
      openLightbox(
        "https://admin-x1creeper.ct.ws/source/" + item.src,
        item.name
      )
    );
    galleryContainer.appendChild(figure);
  });
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("active");
}
closeBtn.onclick = () => lightbox.classList.remove("active");
lightbox.onclick = (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
};

loadGallery();
