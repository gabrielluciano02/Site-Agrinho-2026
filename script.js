/* ============================================================
   AGROFUTURO — script.js
   Agrinho 2026 | "Agro Forte, Futuro Sustentável"
   ============================================================ */

/* ============================================================
   1. BOAS-VINDAS PERSONALIZADA
   Demonstra: variáveis, manipulação de DOM, evento de clique.
   O usuário digita o nome e o site exibe uma saudação dinâmica.
   ============================================================ */

// Variável que guarda o nome do usuário
let nomeUsuario = '';

/**
 * Lê o nome do input, salva na variável e atualiza o texto na tela.
 * Também remove a barra de boas-vindas após 3 segundos.
 */
function saudarUsuario() {
  // Pega o valor digitado no input e remove espaços extras
  const input = document.getElementById('inputNome');
  const nome  = input.value.trim();

  // Valida se o nome foi digitado
  if (!nome) {
    input.style.borderColor = '#e57373';
    input.focus();
    return;
  }

  // Salva o nome na variável global
  nomeUsuario = nome;

  // Atualiza o texto de boas-vindas com o nome do usuário
  document.getElementById('boasVindasTexto').textContent =
    `🌿 Bem-vindo(a), ${nomeUsuario}! Explore o Agro do Futuro.`;

  // Remove o formulário de entrada e mostra apenas o texto
  document.querySelector('.bv-form').style.display = 'none';

  // Esconde a barra após 3 segundos
  setTimeout(() => {
    const bar = document.getElementById('boasVindasBar');
    bar.classList.add('oculto');
    // Remove a classe que empurrava a navbar
    document.body.classList.remove('bv-ativo');
  }, 3000);
}

// Permite submeter o nome com a tecla Enter
document.getElementById('inputNome').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') saudarUsuario();
});

// Ativa o deslocamento da navbar enquanto a barra está visível
document.body.classList.add('bv-ativo');

/* ============================================================
   2. NAVBAR — muda aparência ao rolar
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Adiciona classe 'scrolled' quando rolar mais de 60px
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  atualizarParalaxe();
}, { passive: true });

/* ============================================================
   3. MENU MOBILE — abre e fecha
   ============================================================ */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Alterna abertura do menu ao clicar no botão hamburguer
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('aberto');
});

// Fecha o menu mobile
function fecharMenu() {
  mobileMenu.classList.remove('aberto');
}

// Fecha ao clicar fora do menu
document.addEventListener('click', e => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    fecharMenu();
  }
});

/* ============================================================
   4. PARTÍCULAS ANIMADAS — decoração do hero
   Cria pequenos pontos flutuantes com posição e duração aleatórias
   ============================================================ */
function criarParticulas() {
  const container = document.getElementById('particles');
  if (!container) return;

  // Cria 30 partículas com posição e tamanho aleatórios
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particula';

    const size  = Math.random() * 4 + 2;        // tamanho entre 2px e 6px
    const left  = Math.random() * 100;           // posição horizontal aleatória
    const bot   = Math.random() * 40;            // posição vertical aleatória
    const dur   = (Math.random() * 6 + 4) + 's';  // duração da animação
    const delay = (Math.random() * 8) + 's';      // atraso inicial

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: ${bot}%;
      --dur: ${dur};
      --delay: ${delay};
    `;
    container.appendChild(p);
  }
}

criarParticulas();

/* ============================================================
   5. REVEAL AO ROLAR (INTERSECTION OBSERVER)
   Aplica animações de entrada nos elementos com classe .reveal
   conforme eles aparecem na tela durante o scroll.
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Adiciona classe que dispara a animação CSS
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Aplica o observer em todos os elementos com .reveal
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ============================================================
   6. CONTADORES ANIMADOS
   Anima os números de 0 até o valor alvo com efeito ease-out.
   Disparado quando o elemento entra na tela.
   ============================================================ */

/**
 * Anima um elemento de número de 0 até o valor alvo.
 * @param {HTMLElement} el       - Elemento que contém o número
 * @param {number}      target   - Valor final
 * @param {number}      duracao  - Duração em ms (padrão: 2000)
 */
function animarContador(el, target, duracao = 2000) {
  let inicio = null;

  function step(timestamp) {
    if (!inicio) inicio = timestamp;
    const progresso = Math.min((timestamp - inicio) / duracao, 1);
    // Easing: ease-out cúbico para desacelerar no final
    const easing = 1 - Math.pow(1 - progresso, 3);
    const valor   = target * easing;

    // Formata com separador de milhar para números grandes
    el.textContent = target >= 1000
      ? Math.round(valor).toLocaleString('pt-BR')
      : Math.round(valor);

    if (progresso < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000
      ? target.toLocaleString('pt-BR')
      : target;
  }

  requestAnimationFrame(step);
}

// Observer para disparar contadores quando visíveis
const contObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseFloat(el.dataset.target);
      // Só anima uma vez (data-animado evita repetição)
      if (!isNaN(target) && !el.dataset.animado) {
        el.dataset.animado = 'true';
        animarContador(el, target);
      }
      contObs.unobserve(el);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-target]').forEach(el => contObs.observe(el));

/* ============================================================
   7. EFEITO PARALAXE SUAVE
   Move as imagens de fundo levemente ao rolar, criando profundidade.
   ============================================================ */
function atualizarParalaxe() {
  const scrollY = window.scrollY;

  // Paralaxe da seção de citação
  const quoteBg  = document.querySelector('.quote-bg img');
  const quoteSec = document.querySelector('.quote-section');
  if (quoteBg && quoteSec) {
    const relY = (scrollY - quoteSec.offsetTop) * 0.15;
    quoteBg.style.transform = `translateY(${relY}px)`;
  }
}

window.addEventListener('scroll', atualizarParalaxe, { passive: true });

/* ============================================================
   8. EFEITO 3D NOS CARDS DE PILARES
   Ao mover o mouse sobre um card, ele inclina levemente (tilt 3D).
   ============================================================ */
document.querySelectorAll('.pilar-card').forEach(card => {
  // Calcula o ângulo de inclinação baseado na posição do mouse
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    card.style.transform = `translateY(-8px) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  // Reseta ao tirar o mouse
  card.addEventListener('mouseleave', () => {
    card.style.transform   = '';
    card.style.transition  = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, box-shadow 0.4s, background 0.4s';
  });
});

/* ============================================================
   9. GALERIA COM LIGHTBOX
   Ao clicar em uma imagem da galeria, ela abre em tela cheia.
   ============================================================ */
document.querySelectorAll('.gal-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');

  // Abre lightbox ao clicar
  item.addEventListener('click', () => {
    const img     = item.querySelector('img');
    const caption = item.querySelector('.gal-caption');
    if (!img || !img.naturalWidth) return; // ignora se imagem não carregou

    // Cria overlay do lightbox dinamicamente
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9000;
      background: rgba(10,20,10,0.95);
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 16px;
      cursor: zoom-out;
      animation: fadeUp 0.3s ease;
    `;

    const imgClone = document.createElement('img');
    imgClone.src   = img.src;
    imgClone.alt   = img.alt;
    imgClone.style.cssText = `
      max-width: 90vw; max-height: 80vh;
      object-fit: contain; border-radius: 12px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6);
    `;

    const legenda = document.createElement('p');
    legenda.textContent = caption?.textContent || img.alt;
    legenda.style.cssText = `
      color: rgba(255,255,255,0.6); font-size: 0.9rem;
      letter-spacing: 1px; font-family: 'DM Sans', sans-serif;
    `;

    overlay.appendChild(imgClone);
    overlay.appendChild(legenda);
    document.body.appendChild(overlay);

    // Fecha ao clicar no overlay ou pressionar Escape
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') overlay.remove();
    }, { once: true });
  });

  // Suporte a teclado (Enter e Espaço)
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') item.click();
  });
});

/* ============================================================
   10. QUIZ INTERATIVO
   5 perguntas sobre agro sustentável com feedback imediato,
   pontuação e resultado final.
   Demonstra: array de objetos, variáveis de estado, manipulação
   de DOM, eventos de clique e lógica condicional.
   ============================================================ */

// Banco de perguntas do quiz
const perguntas = [
  {
    pergunta: 'O que é "plantio direto" na agricultura sustentável?',
    opcoes: [
      'Plantar sem usar nenhuma tecnologia',
      'Técnica que planta sem revolver o solo, preservando sua estrutura e reduzindo erosão',
      'Plantar diretamente com as mãos, sem máquinas',
      'Irrigar as plantas diretamente nas raízes'
    ],
    correta: 1,
    explicacao: '✅ Correto! O plantio direto é uma técnica que mantém o solo coberto e sem revolvimento, preservando sua vida microbiana, retendo umidade e reduzindo a erosão. O Brasil tem 81,7 mi ha cultivados assim.'
  },
  {
    pergunta: 'Qual percentual do PIB brasileiro o agronegócio representou em 2025?',
    opcoes: [
      'Cerca de 10%',
      'Cerca de 50%',
      'Cerca de 25%',
      'Cerca de 5%'
    ],
    correta: 2,
    explicacao: '✅ Correto! Segundo o Cepea/CNA (2025), o agronegócio representou aproximadamente 25% do PIB brasileiro, sendo um dos pilares da economia nacional.'
  },
  {
    pergunta: 'O que é o programa ABC+ (Agricultura de Baixo Carbono)?',
    opcoes: [
      'Um programa de exportação de alimentos orgânicos',
      'Um aplicativo para agricultores monitorarem o clima',
      'Uma política do governo federal para reduzir emissões de gases de efeito estufa no campo',
      'Um certificado de qualidade para produtos agropecuários'
    ],
    correta: 2,
    explicacao: '✅ Correto! O ABC+ é um plano do governo federal que incentiva práticas agrícolas sustentáveis para reduzir emissões. A meta é diminuir 1,1 bilhão de toneladas de CO₂ equivalente até 2030.'
  },
  {
    pergunta: 'Qual a meta de recuperação florestal do Brasil pelo Planaveg até 2030?',
    opcoes: [
      '1 milhão de hectares',
      '12 milhões de hectares',
      '50 milhões de hectares',
      '500 mil hectares'
    ],
    correta: 1,
    explicacao: '✅ Correto! O Planaveg (Plano Nacional de Recuperação da Vegetação Nativa) estabelece a meta de recuperar 12 milhões de hectares de áreas degradadas até 2030, segundo o Observatório da Restauração (2024).'
  },
  {
    pergunta: 'Sistemas modernos de irrigação por gotejamento reduzem o consumo de água em quanto, em comparação com métodos tradicionais?',
    opcoes: [
      'Cerca de 5%',
      'Cerca de 10%',
      'Cerca de 35%',
      'Cerca de 80%'
    ],
    correta: 2,
    explicacao: '✅ Correto! Segundo a Embrapa e Valley (Agrishow 2026), a irrigação inteligente por gotejamento reduz o consumo de água em até 35% sem perder produtividade, economizando um recurso vital para o agro.'
  }
];

// Variáveis de estado do quiz
let quizAtual    = 0;   // índice da pergunta atual
let quizPontos   = 0;   // pontuação do usuário
let quizRespondeu = false; // evita múltiplas respostas na mesma pergunta

/**
 * Renderiza a pergunta atual na tela.
 * Atualiza barra de progresso, contador e opções de resposta.
 */
function renderizarPergunta() {
  const q = perguntas[quizAtual];

  // Atualiza barra de progresso e contador
  document.getElementById('quizProgressBar').style.width =
    ((quizAtual / perguntas.length) * 100) + '%';
  document.getElementById('quizCounter').textContent =
    `Pergunta ${quizAtual + 1} de ${perguntas.length}`;

  // Atualiza texto da pergunta
  document.getElementById('quizPergunta').textContent = q.pergunta;

  // Gera os botões de opção dinamicamente
  const opcoesEl = document.getElementById('quizOpcoes');
  opcoesEl.innerHTML = '';

  q.opcoes.forEach((opcao, i) => {
    const btn = document.createElement('button');
    btn.className   = 'quiz-opcao';
    btn.textContent = opcao;
    // Ao clicar, chama a função de verificação passando o índice
    btn.addEventListener('click', () => verificarResposta(i, btn));
    opcoesEl.appendChild(btn);
  });

  // Remove feedback e botão "próxima" anteriores
  const feedbackAnterior = document.querySelector('.quiz-feedback');
  if (feedbackAnterior) feedbackAnterior.remove();

  const btnProximo = document.querySelector('.quiz-proximo');
  if (btnProximo) btnProximo.remove();

  quizRespondeu = false;
}

/**
 * Verifica se a resposta selecionada está correta.
 * Exibe feedback visual e textual.
 * @param {number}      indice - Índice da opção clicada
 * @param {HTMLElement} btn    - Botão clicado
 */
function verificarResposta(indice, btn) {
  // Impede responder mais de uma vez por pergunta
  if (quizRespondeu) return;
  quizRespondeu = true;

  const q       = perguntas[quizAtual];
  const acertou = (indice === q.correta);

  // Pontua se acertou
  if (acertou) quizPontos++;

  // Desabilita todos os botões de opção
  document.querySelectorAll('.quiz-opcao').forEach((b, i) => {
    b.disabled = true;
    if (i === q.correta) b.classList.add('correta');
    else if (b === btn && !acertou) b.classList.add('errada');
  });

  // Cria e exibe o feedback textual
  const feedback = document.createElement('div');
  feedback.className = `quiz-feedback ${acertou ? 'certo' : 'errado'}`;
  feedback.textContent = acertou
    ? q.explicacao
    : `❌ Errado. ${q.explicacao.replace('✅ Correto! ', '')}`;
  document.getElementById('quizOpcoes').after(feedback);

  // Cria o botão "Próxima pergunta" ou "Ver resultado"
  const btnProximo = document.createElement('button');
  btnProximo.className   = 'quiz-proximo';
  btnProximo.textContent = quizAtual < perguntas.length - 1
    ? 'Próxima Pergunta →'
    : 'Ver Resultado 🏆';
  btnProximo.style.display = 'block';
  feedback.after(btnProximo);

  btnProximo.addEventListener('click', () => {
    quizAtual++;
    if (quizAtual < perguntas.length) {
      renderizarPergunta();
    } else {
      mostrarResultado();
    }
  });
}

/**
 * Exibe o resultado final do quiz com base na pontuação.
 */
function mostrarResultado() {
  // Esconde a área de pergunta e mostra a área de resultado
  document.getElementById('quizCard').style.display     = 'none';
  document.getElementById('quizResultado').style.display = 'block';

  // Barra de progresso completa
  document.getElementById('quizProgressBar').style.width = '100%';
  document.getElementById('quizCounter').textContent = 'Quiz concluído! 🎉';

  // Define ícone, título e descrição conforme pontuação
  let icon, titulo, desc;

  if (quizPontos === 5) {
    icon   = '🌟';
    titulo = 'Especialista em Agro Sustentável!';
    desc   = 'Parabéns! Você acertou todas as perguntas. Você tem um conhecimento excelente sobre o agro brasileiro e a sustentabilidade. O campo precisa de pessoas como você!';
  } else if (quizPontos >= 3) {
    icon   = '🌿';
    titulo = 'Bom conhecimento!';
    desc   = `Você acertou ${quizPontos} de 5 perguntas. Você já sabe bastante sobre o agro sustentável, mas ainda há descobertas pela frente. Explore mais o site!`;
  } else {
    icon   = '🌱';
    titulo = 'Continue aprendendo!';
    desc   = `Você acertou ${quizPontos} de 5 perguntas. Não desanime — o conhecimento sobre agro sustentável é o primeiro passo para um futuro melhor. Leia as seções do site e tente novamente!`;
  }

  document.getElementById('quizResIcon').textContent    = icon;
  document.getElementById('quizResTexto').textContent   = titulo;
  document.getElementById('quizResDesc').textContent    = desc;
  document.getElementById('quizPontuacao').textContent  = `${quizPontos} / ${perguntas.length} acertos`;
}

/**
 * Reinicia o quiz do zero.
 */
function reiniciarQuiz() {
  quizAtual    = 0;
  quizPontos   = 0;
  quizRespondeu = false;

  // Volta a exibir a área de perguntas
  document.getElementById('quizCard').style.display     = 'block';
  document.getElementById('quizResultado').style.display = 'none';

  renderizarPergunta();
}

// Inicia o quiz ao carregar a página
renderizarQuiz();

function renderizarQuiz() {
  renderizarPergunta();
}

/* ============================================================
   11. FORMULÁRIO DE CONTATO COM VALIDAÇÃO JS
   Demonstra: validação de campos, feedback dinâmico, reset de form.
   ============================================================ */

/**
 * Processa o envio do formulário.
 * Valida os campos, simula envio e exibe mensagem de confirmação.
 * @param {Event} e - Evento de submit
 */
function enviarForm(e) {
  e.preventDefault();

  const nome  = document.getElementById('formNome').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const msg   = document.getElementById('formMsg');
  const btn   = e.target.querySelector('button');

  // Validação básica
  if (nome.length < 2) {
    msg.textContent = '⚠️ Por favor, insira um nome válido.';
    msg.style.color = '#e57373';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    msg.textContent = '⚠️ Por favor, insira um e-mail válido.';
    msg.style.color = '#e57373';
    return;
  }

  // Simula envio com loading
  btn.textContent = 'Enviando...';
  btn.disabled    = true;
  msg.textContent = '';

  setTimeout(() => {
    // Exibe mensagem de sucesso personalizada com o nome
    msg.textContent = `✅ Obrigado, ${nome}! Você foi inscrito com sucesso. Juntos pelo agro sustentável! 🌱`;
    msg.style.color = 'var(--verde-neon)';

    // Reseta o formulário
    e.target.reset();
    btn.textContent = 'Quero Participar 🌱';
    btn.disabled    = false;

    // Remove a mensagem após 6 segundos
    setTimeout(() => { msg.textContent = ''; }, 6000);
  }, 1200);
}

/* ============================================================
   12. SMOOTH SCROLL PARA ÂNCORAS
   Rola suavemente até a seção ao clicar em links internos.
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const alvo = document.querySelector(link.getAttribute('href'));
    if (alvo) {
      const offset = 80; // altura da navbar
      const top    = alvo.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   13. BARRA DE PROGRESSO DO SCROLL
   Mostra quanto da página já foi lida (barra no topo).
   ============================================================ */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; z-index: 2000;
  height: 3px; width: 0%;
  background: linear-gradient(to right, #4caf50, #7ec850, #e8b84b);
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct   = (window.scrollY / total) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ============================================================
   14. ANIMAÇÃO DE ENTRADA DA PÁGINA
   ============================================================ */
window.addEventListener('load', () => {
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// Identificação no console
console.log('%c🌿 AgroFuturo', 'color: #7ec850; font-size: 1.4rem; font-weight: bold;');
console.log('%cAgrinho 2026 — Agro Forte, Futuro Sustentável', 'color: #4a9eca;');

/* ============================================================
   15. DARK MODE
   Alterna entre tema claro e escuro adicionando/removendo a
   classe 'dark' no body. Salva a preferência no localStorage
   para que o site lembre ao reabrir.
   ============================================================ */

const btnDarkMode = document.getElementById('btnDarkMode');

/**
 * Aplica o tema (claro ou escuro) e salva no localStorage.
 * @param {boolean} escuro - true para dark mode, false para claro
 */
function aplicarTema(escuro) {
  if (escuro) {
    document.body.classList.add('dark');
    btnDarkMode.textContent = '☀️';
    btnDarkMode.title       = 'Modo claro';
  } else {
    document.body.classList.remove('dark');
    btnDarkMode.textContent = '🌙';
    btnDarkMode.title       = 'Modo escuro';
  }
  // Salva preferência no localStorage para persistir entre visitas
  localStorage.setItem('temaEscuro', escuro ? 'sim' : 'nao');
}

// Ao carregar a página, verifica se o usuário já escolheu um tema antes
const temaSalvo = localStorage.getItem('temaEscuro');
aplicarTema(temaSalvo === 'sim');

// Alterna o tema ao clicar no botão
btnDarkMode.addEventListener('click', () => {
  const estaEscuro = document.body.classList.contains('dark');
  aplicarTema(!estaEscuro);
});

/* ============================================================
   16. BOTÃO VOLTAR AO TOPO
   Aparece quando o usuário rola mais de 400px.
   Ao clicar, volta suavemente ao início da página.
   ============================================================ */

const btnTopo = document.getElementById('btnTopo');

// Mostra/esconde o botão conforme a posição do scroll
window.addEventListener('scroll', () => {
  btnTopo.classList.toggle('visivel', window.scrollY > 400);
}, { passive: true });

// Ao clicar, volta ao topo com scroll suave
btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   17. FRASE MOTIVACIONAL TEMÁTICA
   Exibe uma frase diferente a cada visita, relacionada ao
   tema do Agrinho — uso criativo de JS ligado ao conteúdo.
   ============================================================ */

// Array de frases autorais sobre o tema
const frases = [
  '"Plantar hoje é garantir o amanhã."',
  '"O solo que cuidamos hoje alimenta quem virá depois."',
  '"Tecnologia e natureza: os dois pilares do agro do futuro."',
  '"Cada gota d\'água economizada é uma semente de futuro."',
  '"O campo forte é aquele que respeita a terra."',
  '"Sustentabilidade não é custo — é investimento no futuro."',
  '"Da raiz ao horizonte: o agro que transforma o Brasil."',
  '"Produzir com responsabilidade é o maior legado do campo."',
];

/**
 * Seleciona e exibe uma frase aleatória no hero.
 * Usa o índice salvo no localStorage para não repetir a mesma
 * frase em visitas consecutivas.
 */
function exibirFraseAleatoria() {
  const elFrase = document.getElementById('heroFrase');
  if (!elFrase) return;

  // Pega o índice da última frase exibida para evitar repetição
  const ultimoIdx = parseInt(localStorage.getItem('ultimaFrase') ?? '-1');

  // Gera índice diferente do anterior
  let idx;
  do { idx = Math.floor(Math.random() * frases.length); }
  while (idx === ultimoIdx && frases.length > 1);

  // Exibe a frase e salva o índice
  elFrase.textContent = frases[idx];
  localStorage.setItem('ultimaFrase', idx);
}

exibirFraseAleatoria();

/* ============================================================
   18. CONTADOR REGRESSIVO ATÉ 2030
   Calcula os dias restantes até 1º de janeiro de 2030,
   data referência da meta de reflorestamento do Planaveg.
   Demonstra uso de Date() e atualização dinâmica do DOM.
   ============================================================ */

/**
 * Calcula e exibe os dias restantes até 01/01/2030.
 * Atualiza a cada hora.
 */
function atualizarContador2030() {
  const elNum = document.getElementById('c2030Num');
  if (!elNum) return;

  const hoje  = new Date();
  const meta  = new Date('2030-01-01T00:00:00');
  const diff  = meta - hoje; // diferença em milissegundos

  if (diff <= 0) {
    elNum.textContent = 'Meta atingida! 🌱';
    return;
  }

  // Converte milissegundos em dias
  const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
  elNum.textContent = dias.toLocaleString('pt-BR') + ' dias';
}

atualizarContador2030();
// Atualiza a cada hora para manter preciso
setInterval(atualizarContador2030, 3600000);

/* ============================================================
   19. SALVAR NOME DO USUÁRIO NO LOCALSTORAGE
   Se o usuário já visitou o site antes e digitou o nome,
   pula a etapa de boas-vindas e mostra direto a saudação.
   ============================================================ */

/**
 * Verifica se há nome salvo do usuário de uma visita anterior.
 * Se sim, pula o formulário e mostra a saudação diretamente.
 */
function verificarNomeSalvo() {
  const nomeSalvo = localStorage.getItem('nomeUsuario');
  if (nomeSalvo) {
    nomeUsuario = nomeSalvo;
    document.getElementById('boasVindasTexto').textContent =
      `🌿 Bem-vindo(a) de volta, ${nomeUsuario}! O campo espera por você.`;
    document.querySelector('.bv-form').style.display = 'none';

    // Esconde a barra após 3 segundos
    setTimeout(() => {
      document.getElementById('boasVindasBar').classList.add('oculto');
      document.body.classList.remove('bv-ativo');
    }, 3000);
  }
}

verificarNomeSalvo();

// Atualiza a função saudarUsuario para salvar o nome no localStorage
const _saudarOriginal = saudarUsuario;
// Redefine para incluir o salvamento
window.saudarUsuario = function() {
  const input = document.getElementById('inputNome');
  const nome  = input.value.trim();
  if (!nome) {
    input.style.borderColor = '#e57373';
    input.focus();
    return;
  }
  nomeUsuario = nome;
  // Salva o nome para visitas futuras
  localStorage.setItem('nomeUsuario', nome);

  document.getElementById('boasVindasTexto').textContent =
    `🌿 Bem-vindo(a), ${nomeUsuario}! Explore o Agro do Futuro.`;
  document.querySelector('.bv-form').style.display = 'none';

  setTimeout(() => {
    document.getElementById('boasVindasBar').classList.add('oculto');
    document.body.classList.remove('bv-ativo');
  }, 3000);
};
