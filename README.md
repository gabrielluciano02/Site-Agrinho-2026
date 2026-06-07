# 🌿 AgroFuturo — Agrinho 2026
### "Agro Forte, Futuro Sustentável: equilíbrio entre produção e meio ambiente"

> Projeto desenvolvido para o **Agrinho 2026** — Programa Agrinho / Sistema FAEP, Paraná.

---

## 📋 Sobre o Projeto

O **AgroFuturo** é um site educativo e interativo que explora o tema oficial do Agrinho 2026. O objetivo é mostrar ao visitante como o agronegócio brasileiro pode ser ao mesmo tempo produtivo e sustentável, unindo tecnologia, preservação ambiental e responsabilidade com as próximas gerações.

O site foi construído com **HTML, CSS e JavaScript puros**, sem frameworks ou bibliotecas externas, com foco em originalidade, usabilidade e complexidade de código.

---

## 🗂️ Estrutura de Arquivos

```
agrinho/
├── index.html        ← Estrutura e conteúdo da página
├── style.css         ← Todo o design, animações e responsividade
├── script.js         ← Interatividade, lógica e funcionalidades JS
├── README.md         ← Este arquivo
└── imagens/          ← Pasta para as imagens do projeto
    ├── sobre.jpg         (seção Sobre — agricultor ou campo de perto)
    ├── quote-bg.jpg      (seção Citação — paisagem impactante)
    ├── cta-bg.jpg        (seção Contato — campo ao entardecer)
    ├── pilar1.jpg        (Solo — terra fértil ou raiz)
    ├── pilar2.jpg        (Água — irrigação ou gotejamento)
    ├── pilar3.jpg        (Energia — painel solar no campo)
    ├── pilar4.jpg        (Bio — floresta ou mata nativa)
    ├── gal1.jpg          (Galeria — foto grande, lavoura)
    ├── gal2.jpg          (Galeria — irrigação)
    ├── gal3.jpg          (Galeria — energia solar)
    ├── gal4.jpg          (Galeria — foto larga, drone/tecnologia)
    ├── gal5.jpg          (Galeria — floresta preservada)
    └── gal6.jpg          (Galeria — colheita)
```

> ⚠️ **O site funciona mesmo sem as imagens** — as seções exibem fundos coloridos no lugar.

---

## ✨ Funcionalidades

### HTML
- Estrutura semântica com tags `header`, `nav`, `section`, `footer`, `form`, `button`, `input`
- 8 seções bem definidas: Hero, Sobre, Entenda o Tema, Pilares, Dados, Quiz, Galeria e Contato
- Acessibilidade com atributos `aria-label`, `role` e navegação por teclado
- Links externos para o Agrinho Oficial, IDR-Paraná e SEAB Paraná

### CSS
- Design **natural/orgânico** com paleta de verdes, terra e creme
- Tipografia elegante: **Playfair Display** (títulos) + **DM Sans** (texto)
- **Dark Mode** completo com alternância suave de todas as cores
- Animações de entrada com `@keyframes` e `transition`
- **Responsivo** para celular, tablet e desktop via CSS Media Queries
- Efeito **paralaxe** nas seções de citação
- Grid e Flexbox para layouts modernos

### JavaScript
- **Boas-vindas personalizada** — usuário digita o nome, o JS atualiza o DOM dinamicamente
- **localStorage** — salva nome e preferência de tema entre visitas
- **Quiz interativo** com 5 perguntas, feedback imediato, pontuação e resultado final
- **Dark Mode** — alterna classe CSS no `body` via JS, com preferência salva
- **Contadores animados** — números sobem de 0 até o valor com easing
- **Contador regressivo até 2030** — calcula dias restantes com `Date()` em tempo real
- **Frases motivacionais** — exibe frase diferente a cada visita, sem repetição
- **Barra de progresso de leitura** no topo da página
- **Botão "Voltar ao Topo"** que aparece ao rolar 400px
- **Lightbox da galeria** — abre imagens em tela cheia ao clicar
- **Efeito 3D tilt** nos cards de pilares com `perspective` e `rotateX/Y`
- **Partículas animadas** no hero geradas dinamicamente pelo JS
- **Validação de formulário** com feedback visual de erro e sucesso
- **Smooth scroll** para todas as âncoras internas
- Todo o código **comentado** explicando cada função e decisão

---

## 📊 Dados e Fontes

Todos os dados apresentados no site são **verídicos e com fonte citada**:

| Dado | Valor | Fonte |
|------|-------|-------|
| Participação do agro no PIB | 25% | Cepea/CNA, 2025 |
| Produção de grãos safra 2024/25 | 345 mi toneladas | CONAB, 11º Levantamento, 2025 |
| Economia de água com irrigação inteligente | até 35% | Embrapa / Valley, Agrishow 2026 |
| Energia solar gerada por rurais | 3,8 GW | ABSOLAR, 2025 |
| Área em recuperação florestal | 20,4 mi ha | Observatório da Restauração / Abiove, 2024 |
| Área com plantio direto | 81,7 mi ha | CONAB, 2025 |
| Meta carbono zero | 2050 | Acordo de Paris, compromisso do Brasil |
| Meta reflorestamento Planaveg | 12 mi ha até 2030 | Observatório da Restauração, 2024 |

---

## 🖼️ Como Adicionar as Imagens

1. Crie a pasta `imagens/` dentro da pasta do projeto
2. Adicione seus arquivos com os nomes listados na estrutura acima
3. **Formatos aceitos:** JPG ou PNG
4. **Tamanho recomendado:** até 500 KB por imagem (JPG comprimido)
5. **Resolução:** 1920×1080 para hero/quote/cta — 800×600 para os demais

### Sites gratuitos para fotos do campo:
- [Unsplash.com](https://unsplash.com) — busque "sustainable farming", "agriculture brazil"
- [Pexels.com](https://pexels.com) — busque "agricultura", "fazenda", "campo"
- [Pixabay.com](https://pixabay.com) — busque "plantação", "colheita", "campo verde"

---

## 🚀 Como Usar

### No computador:
1. Baixe os arquivos (`index.html`, `style.css`, `script.js`)
2. Coloque todos na mesma pasta
3. Adicione a pasta `imagens/` com suas fotos
4. Abra o `index.html` no navegador — pronto!

### No celular (sem hospedagem):
- **Por cabo USB:** conecte o celular, copie a pasta para o celular e abra o `index.html` pelo gerenciador de arquivos
- **Pelo Google Drive:** faça upload da pasta e abra o `index.html` pelo app Drive
- **Por WhatsApp/Telegram:** compacte em `.zip`, envie para si mesmo, extraia e abra

### Para simular celular no computador:
- Abra o site no **Google Chrome**
- Pressione `F12` para abrir o DevTools
- Clique no ícone de celular (toggle device toolbar)
- Escolha qualquer resolução de dispositivo

---

## 🔗 Links Úteis

- [Agrinho Oficial](https://www.sistemafaep.org.br/agrinho/) — Sistema FAEP
- [IDR-Paraná](https://www.idrparana.pr.gov.br) — Instituto de Desenvolvimento Rural do Paraná
- [SEAB Paraná](https://www.agricultura.pr.gov.br) — Secretaria da Agricultura e Abastecimento

---

## 👨‍💻 Tecnologias Utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- **HTML5** — estrutura semântica e acessível
- **CSS3** — animações, grid, flexbox, media queries, variáveis CSS
- **JavaScript ES6+** — manipulação de DOM, localStorage, Date API, Intersection Observer

---

*© 2026 AgroFuturo — Projeto Agrinho | Paraná*
