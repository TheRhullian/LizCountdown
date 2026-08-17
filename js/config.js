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
    hero: "images/hero.jpg",
    gallery: [
      "images/foto1.jpg",
      "images/foto2.jpg",
      "images/foto3.jpg",
      "images/foto4.jpg",
      "images/foto5.jpg",
      "images/foto6.jpg",
    ],
  },
};

// ---------------------------------------------------------------------
// Álbuns de fotos (página álbuns.html / album.html)
// ---------------------------------------------------------------------
// Para criar um álbum novo:
// 1. Crie uma pasta em images/albuns/<id>/ (o <id> não pode ter espaços/acentos).
// 2. Salve a foto de capa como capa.jpg dentro dessa pasta.
// 3. Salve as demais fotos numeradas: 1.jpg, 2.jpg, 3.jpg... (na ordem que
//    quiser que apareçam). Não precisa preencher todos os números do
//    "maxPhotos" — o que não existir simplesmente não aparece.
// 4. Adicione um bloco abaixo com o mesmo <id> da pasta.
//
// Exemplo (copie e ajuste):
// {
//   id: "ensaio-gestante",
//   title: "Ensaio Gestante",
//   date: "2026-07-10",
//   cover: "images/albuns/ensaio-gestante/capa.jpg",
//   maxPhotos: 30,
// },
const albumsConfig = [];

// ---------------------------------------------------------------------
// Recados (página recados.html) — mural de mensagens em tempo real.
// ---------------------------------------------------------------------
// Veja o passo a passo no README.md ("Fase 2 · Recados") para criar um
// projeto gratuito no Firebase e preencher os valores abaixo. Até lá, a
// página de recados fica com o formulário desativado e avisa que ainda
// não está configurada.
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};
