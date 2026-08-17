# Como criar um álbum de fotos

Cada álbum é uma pasta aqui dentro. Para criar um novo álbum:

1. **Crie a pasta**: `images/albuns/<id>/` — o `<id>` deve ser curto, sem espaços ou acentos (ex: `ensaio-gestante`, `primeira-semana`, `chas-de-bebe`).
2. **Salve a foto de capa** como `capa.jpg` dentro dessa pasta.
3. **Salve as demais fotos numeradas**, na ordem que quiser que apareçam: `1.jpg`, `2.jpg`, `3.jpg`...
4. **Registre o álbum** em `js/config.js`, dentro de `albumsConfig`:

   ```js
   const albumsConfig = [
     {
       id: "ensaio-gestante",
       title: "Ensaio Gestante",
       date: "2026-07-10",
       cover: "images/albuns/ensaio-gestante/capa.jpg",
       maxPhotos: 30,
     },
   ];
   ```

`maxPhotos` é só o **limite máximo** de fotos que o site vai tentar carregar (`1.jpg` até `30.jpg`, por exemplo). Não precisa ter todas — o que não existir simplesmente não aparece. Assim, depois de registrar o álbum uma vez, você pode ir soltando fotos novas na pasta (respeitando a numeração) e elas aparecem sozinhas, sem editar o código de novo.

Exemplo de estrutura com dois álbuns:

```
images/albuns/
├── ensaio-gestante/
│   ├── capa.jpg
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
└── primeira-semana/
    ├── capa.jpg
    ├── 1.jpg
    └── 2.jpg
```
