import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("recado-form");
const statusEl = document.getElementById("recados-status");
const listEl = document.getElementById("recados-list");
const submitBtn = document.getElementById("recado-submit");
const warningEl = document.getElementById("recados-config-warning");

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

const isConfigured =
  typeof firebaseConfig !== "undefined" &&
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.startsWith("SUA_");

if (!isConfigured) {
  warningEl.textContent =
    "os recados serão habilitados assim que a configuração do Firebase for concluída (veja o README).";
  warningEl.classList.remove("hidden");
  form.classList.add("hidden");
  listEl.innerHTML = "";
} else {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const recadosRef = collection(db, "recados");

  const dateTimeFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const recadosQuery = query(recadosRef, orderBy("criadoEm", "desc"), limit(200));

  onSnapshot(
    recadosQuery,
    (snapshot) => {
      if (snapshot.empty) {
        listEl.innerHTML =
          '<p class="recados-empty">seja a primeira pessoa a deixar um carinho para a Liz 🌸</p>';
        return;
      }

      listEl.innerHTML = "";
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const dateStr = data.criadoEm ? dateTimeFmt.format(data.criadoEm.toDate()) : "agora";

        const card = document.createElement("div");
        card.className = "recado-card";
        card.innerHTML =
          '<div class="recado-header">' +
          '<span class="recado-name">' + escapeHtml(data.nome || "anônimo") + "</span>" +
          '<span class="recado-date">' + escapeHtml(dateStr) + "</span>" +
          "</div>" +
          '<p class="recado-message">' + escapeHtml(data.mensagem || "") + "</p>";
        listEl.appendChild(card);
      });
    },
    (error) => {
      listEl.innerHTML =
        '<p class="recados-empty">não foi possível carregar os recados agora. tente novamente mais tarde.</p>';
      console.error(error);
    }
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nomeInput = document.getElementById("recado-nome");
    const mensagemInput = document.getElementById("recado-mensagem");
    const nome = nomeInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    if (!nome || !mensagem) return;

    submitBtn.disabled = true;
    statusEl.textContent = "enviando...";
    statusEl.classList.remove("error");

    try {
      await addDoc(recadosRef, {
        nome: nome.slice(0, 40),
        mensagem: mensagem.slice(0, 500),
        criadoEm: serverTimestamp(),
      });
      form.reset();
      statusEl.textContent = "recado enviado com carinho! 💌";
      setTimeout(() => {
        statusEl.textContent = "";
      }, 4000);
    } catch (error) {
      console.error(error);
      statusEl.textContent = "não foi possível enviar agora, tente novamente.";
      statusEl.classList.add("error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
