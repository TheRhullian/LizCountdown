# Liz Countdown 🌸

Site de contagem regressiva para o nascimento da Liz Gabriela de Almeida Damião.

## Como publicar no GitHub Pages

1. Suba este repositório para o GitHub (`git push` para o remoto).
2. No GitHub, vá em **Settings → Pages**.
3. Em "Build and deployment", escolha **Deploy from a branch**, selecione a branch `main` (ou `master`) e a pasta `/ (root)`.
4. Salve. Em alguns minutos o site estará no ar em `https://<seu-usuario>.github.io/<nome-do-repo>/`.

Qualquer alteração enviada (`git push`) para essa branch atualiza o site automaticamente.

## Como editar as informações

Tudo que muda com frequência está em **`js/config.js`**:

- Nome da bebê
- Data prevista/real do nascimento
- Nome dos pais
- Peso e altura (deixe `null` até termos os dados)
- Nomes dos arquivos de foto

## Como adicionar fotos

Veja [`images/README.md`](images/README.md) — é só salvar o arquivo com o nome certo na pasta `images/`.

## Estrutura

```
index.html          página inicial (contagem regressiva)
recados.html          mural de recados
css/style.css        estilo (paleta rosa e dourado, florais)
js/config.js          dados editáveis (nome, data, pais, fotos, Firebase)
js/main.js             contagem regressiva + fotos da página inicial
js/recados.js            mural de recados (Firebase)
js/petals.js             animação das pétalas (todas as páginas)
images/                fotos da Liz
```

## Fase 2

### Recados (mural de mensagens)

GitHub Pages é hospedagem estática — sozinho, ele não guarda os recados que as pessoas escreverem. A página `recados.html` usa o **Firebase Firestore** (gratuito) como banco de dados: quando alguém envia um recado, ele aparece na hora para todo mundo que estiver com a página aberta.

Enquanto o Firebase não estiver configurado, a página mostra um aviso e o formulário fica desativado — nada quebra.

**Passo a passo para ativar:**

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e crie um projeto gratuito (plano *Spark*).
2. Dentro do projeto, clique no ícone **`</>`** ("Web") para registrar um app da Web. Dê um nome qualquer e finalize — não precisa do Firebase Hosting.
3. Copie o objeto `firebaseConfig` mostrado na tela (chaves `apiKey`, `authDomain`, `projectId`, etc.) e cole em **`js/config.js`**, substituindo os valores de exemplo (`SUA_API_KEY_AQUI`...).
4. No menu lateral do console, vá em **Build → Firestore Database → Criar banco de dados**. Escolha uma região e inicie em **modo de produção**.
5. Ainda no Firestore, vá na aba **Regras** e substitua o conteúdo por:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /recados/{recadoId} {
         allow read: if true;
         allow create: if request.resource.data.keys().hasOnly(['nome', 'mensagem', 'criadoEm'])
           && request.resource.data.nome is string
           && request.resource.data.nome.size() > 0
           && request.resource.data.nome.size() <= 40
           && request.resource.data.mensagem is string
           && request.resource.data.mensagem.size() > 0
           && request.resource.data.mensagem.size() <= 2000
           && request.resource.data.criadoEm == request.time;
         allow update, delete: if false;
       }
     }
   }
   ```

   Isso permite que qualquer visitante **leia e crie** recados (com nome até 40 caracteres e mensagem até 2000), mas **ninguém** — nem pelo site — pode editar ou apagar um recado já enviado. Isso é proposital: assim ninguém consegue apagar o carinho de outra pessoa. Se algum recado precisar ser removido (spam, por exemplo), isso é feito por você direto no console do Firebase (Firestore Database → coleção `recados`).
6. Salve as regras e publique. Depois de atualizar `js/config.js` com as chaves reais e enviar (`git push`), a página de recados já funciona.

   **Se você já tinha configurado as regras antes com o limite de 500 caracteres**, precisa voltar na aba **Regras** do Firestore e colar o bloco acima de novo (com `2000`) — o site sozinho não consegue atualizar isso, é uma configuração que mora no console do Firebase, não no repositório.

Nenhuma dessas chaves é secreta — é normal (e esperado) que a `apiKey` do Firebase apareça no código do site; quem protege os dados são as regras do passo 5, não o segredo da chave.

Quem escrever um recado pode usar `*assim*` (asterisco antes e depois de um trecho) para deixar esse trecho em **negrito** — igual ao WhatsApp.
