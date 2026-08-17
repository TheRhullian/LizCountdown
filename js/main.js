(function () {
  const cfg = babyConfig;

  // ---------- Nomes / pais ----------
  document.getElementById("father-name").textContent = cfg.father;
  document.getElementById("mother-name").textContent = cfg.mother;

  const birthDate = new Date(cfg.birthDate);

  const dateFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  document.getElementById("due-date").textContent =
    "previsão: " + dateFmt.format(birthDate);

  // ---------- Contagem regressiva ----------
  const countdownWrap = document.getElementById("countdown-wrap");
  const arrivedWrap = document.getElementById("arrived-wrap");
  const eyebrow = document.getElementById("eyebrow");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function renderStats() {
    const statsEl = document.getElementById("stats");
    statsEl.innerHTML = "";
    const items = [];
    if (cfg.weight) items.push({ label: "peso", value: cfg.weight });
    if (cfg.height) items.push({ label: "altura", value: cfg.height });
    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "stat";
      div.innerHTML =
        '<span class="stat-value">' + item.value + "</span>" +
        '<span class="stat-label">' + item.label + "</span>";
      statsEl.appendChild(div);
    });
  }

  function showArrived() {
    countdownWrap.classList.add("hidden");
    arrivedWrap.classList.remove("hidden");
    eyebrow.textContent = "já chegou";
    document.getElementById("arrived-date").textContent =
      "nasceu em " + dateFmt.format(birthDate);
    renderStats();
  }

  function tick() {
    const now = new Date();
    const diff = birthDate.getTime() - now.getTime();

    if (diff <= 0) {
      showArrived();
      clearInterval(timer);
      return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
  }

  tick();
  const timer = setInterval(tick, 1000);

  // ---------- Foto principal ----------
  const heroImg = document.getElementById("hero-img");
  heroImg.src = cfg.photos.hero;
  heroImg.addEventListener("load", () => heroImg.classList.add("loaded"));
  heroImg.addEventListener("error", () => heroImg.classList.remove("loaded"));

  // ---------- Galeria (aparece sozinha quando a foto existir) ----------
  const galleryEl = document.getElementById("gallery");
  let loadedCount = 0;

  cfg.photos.gallery.forEach((src) => {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      const item = document.createElement("div");
      item.className = "gallery-item";
      const visibleImg = document.createElement("img");
      visibleImg.src = src;
      visibleImg.alt = "Foto da Liz";
      item.appendChild(visibleImg);
      galleryEl.appendChild(item);
      checkGalleryEmpty();
    };
    img.onerror = checkGalleryEmpty;
    img.src = src;
  });

  function checkGalleryEmpty() {
    if (loadedCount === 0 && !document.getElementById("gallery-empty-msg")) {
      const allChecked = document.createElement("p");
      allChecked.id = "gallery-empty-msg";
      allChecked.className = "gallery-empty";
      allChecked.textContent =
        "as fotos aparecerão aqui assim que forem adicionadas 🌸";
      galleryEl.appendChild(allChecked);
    } else if (loadedCount > 0) {
      const msg = document.getElementById("gallery-empty-msg");
      if (msg) msg.remove();
    }
  }

  // placeholder inicial enquanto as imagens carregam
  checkGalleryEmpty();

  // ---------- Pétalas caindo ----------
  const petalsContainer = document.getElementById("petals");
  const PETAL_COUNT = 16;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement("div");
    petal.className = "petal-item";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 8 + Math.random() * 10 + "s";
    petal.style.animationDelay = Math.random() * 10 + "s";
    petal.style.opacity = 0.4 + Math.random() * 0.4;
    petal.style.transform = "scale(" + (0.6 + Math.random() * 0.8) + ")";
    petalsContainer.appendChild(petal);
  }
})();
