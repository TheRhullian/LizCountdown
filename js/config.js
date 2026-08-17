// Edite este arquivo sempre que quiser atualizar informações da Liz.
// Depois de salvar, é só recarregar a página (ou aguardar o próximo deploy do GitHub Pages).

const babyConfig = {
  // Nome
  firstName: "Liz",
  middleName: "Gabriela de Almeida",
  lastName: "Damião",

  // Data/hora prevista (ou real) do nascimento.
  // Formato: "AAAA-MM-DDTHH:MM:SS" (horário local)
  birthDate: "2026-08-27T00:00:00",

  // Pais
  father: "Rhullian Damião",
  mother: "Bella Damião",

  // Peso e altura — deixe null até termos os dados.
  // Exemplo depois: weight: "3.2 kg", height: "49 cm"
  weight: null,
  height: null,

  // Fotos.
  // Basta salvar a imagem na pasta /images com EXATAMENTE o nome indicado
  // abaixo e ela aparece automaticamente no site (nenhuma foto colocada
  // ainda? sem problema, o site mostra um espaço decorativo no lugar).
  photos: {
    hero: "images/hero.jpeg",
    gallery: [
      "images/foto1.jpeg",
      "images/foto2.jpeg",
      "images/foto3.jpeg",
      "images/foto4.jpeg",
      "images/foto5.jpeg",
      "images/foto6.jpeg",
      "images/foto7.jpeg",
      "images/foto8.jpeg",
      "images/foto9.jpeg",
      "images/foto10.jpeg",
    ],
  },
};


// ---------------------------------------------------------------------
// Recados (página recados.html) — mural de mensagens em tempo real.
// ---------------------------------------------------------------------
// Veja o passo a passo no README.md ("Fase 2 · Recados") para criar um
// projeto gratuito no Firebase e preencher os valores abaixo. Até lá, a
// página de recados fica com o formulário desativado e avisa que ainda
// não está configurada.
const firebaseConfig = {
  apiKey: "AIzaSyC-U4ZsvNtpAZknFbQYGcldwcn8Byj0MM4",
  authDomain: "lizsite-8409a.firebaseapp.com",
  projectId: "lizsite-8409a",
  storageBucket: "lizsite-8409a.firebasestorage.app",
  messagingSenderId: "603402832293",
  appId: "1:603402832293:web:163b550a1dc0d0fabc804c",
  measurementId: "G-WWFKSTRXYL"
};

