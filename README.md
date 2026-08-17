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
index.html        estrutura da página
css/style.css      estilo (paleta rosa e dourado, florais)
js/config.js        dados editáveis (nome, data, pais, fotos)
js/main.js           contagem regressiva + carregamento das fotos
images/              fotos da Liz
```

## Fase 2

Espaço reservado para os próximos recursos combinados.
