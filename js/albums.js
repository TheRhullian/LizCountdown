(function () {
  const dateFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  function formatDate(dateStr) {
    if (!dateStr) return "";
    return dateFmt.format(new Date(dateStr + "T00:00:00"));
  }

  const grid = document.getElementById("albums-grid");
  if (grid) renderAlbumsGrid(grid);

  const app = document.getElementById("album-app");
  if (app) renderAlbumDetail(app);

  function renderAlbumsGrid(grid) {
    if (!albumsConfig || albumsConfig.length === 0) {
      grid.innerHTML =
        '<p class="albums-empty">nenhum álbum criado ainda — em breve teremos fotos por aqui 🌸</p>';
      return;
    }

    albumsConfig.forEach((album) => {
      const card = document.createElement("a");
      card.className = "album-card";
      card.href = "album.html?id=" + encodeURIComponent(album.id);

      const cover = document.createElement("div");
      cover.className = "album-cover";
      cover.innerHTML =
        '<svg viewBox="0 0 120 120" width="36" height="36" aria-hidden="true"><use href="#heart-flower"/></svg>';

      const coverImg = new Image();
      coverImg.alt = album.title;
      coverImg.addEventListener("load", () => {
        cover.innerHTML = "";
        cover.appendChild(coverImg);
      });
      coverImg.src = album.cover;

      const info = document.createElement("div");
      info.className = "album-info";
      const dateHtml = album.date
        ? '<div class="album-date">' + formatDate(album.date) + "</div>"
        : "";
      info.innerHTML = "<h3></h3>" + dateHtml;
      info.querySelector("h3").textContent = album.title;

      card.appendChild(cover);
      card.appendChild(info);
      grid.appendChild(card);
    });
  }

  function renderAlbumDetail(app) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const album = (albumsConfig || []).find((a) => a.id === id);

    if (!album) {
      app.innerHTML =
        '<p class="albums-empty">álbum não encontrado. <a href="albuns.html">voltar para álbuns</a></p>';
      return;
    }

    document.title = album.title + " · Liz 🌸";
    document.getElementById("album-title").textContent = album.title;
    document.getElementById("album-date").textContent = album.date
      ? formatDate(album.date)
      : "";

    const photoGrid = document.getElementById("photo-grid");
    const folder = "images/albuns/" + album.id + "/";
    const maxPhotos = album.maxPhotos || 20;

    if (maxPhotos <= 0) {
      showEmptyGrid();
      return;
    }

    let checkedCount = 0;

    for (let i = 1; i <= maxPhotos; i++) {
      const src = folder + i + ".jpg";
      const thumb = document.createElement("div");
      thumb.className = "photo-thumb";

      const img = document.createElement("img");
      img.alt = album.title;
      img.loading = "lazy";
      img.addEventListener("load", () => {
        checkedCount++;
      });
      img.addEventListener("error", () => {
        checkedCount++;
        thumb.remove();
        maybeShowEmpty();
      });

      thumb.appendChild(img);
      thumb.addEventListener("click", () => openLightbox(thumb));
      photoGrid.appendChild(thumb);
      img.src = src;
    }

    function maybeShowEmpty() {
      if (
        checkedCount === maxPhotos &&
        photoGrid.querySelectorAll(".photo-thumb").length === 0
      ) {
        showEmptyGrid();
      }
    }

    function showEmptyGrid() {
      photoGrid.innerHTML =
        '<p class="albums-empty">as fotos deste álbum aparecerão aqui assim que forem adicionadas 🌸</p>';
    }

    // ---------- Lightbox ----------
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    let currentIndex = 0;

    function thumbs() {
      return Array.from(photoGrid.querySelectorAll(".photo-thumb"));
    }

    function openLightbox(thumbEl) {
      const list = thumbs();
      currentIndex = list.indexOf(thumbEl);
      showCurrent();
      lightbox.classList.remove("hidden");
    }

    function showCurrent() {
      const list = thumbs();
      if (list.length === 0) return;
      currentIndex = (currentIndex + list.length) % list.length;
      lightboxImg.src = list[currentIndex].querySelector("img").src;
    }

    function closeLightbox() {
      lightbox.classList.add("hidden");
    }

    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    document.getElementById("lightbox-prev").addEventListener("click", () => {
      currentIndex--;
      showCurrent();
    });
    document.getElementById("lightbox-next").addEventListener("click", () => {
      currentIndex++;
      showCurrent();
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        currentIndex--;
        showCurrent();
      }
      if (e.key === "ArrowRight") {
        currentIndex++;
        showCurrent();
      }
    });
  }
})();
