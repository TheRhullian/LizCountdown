(function () {
  const petalsContainer = document.getElementById("petals");
  if (!petalsContainer) return;

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
