// configuracao das fases
const fases = [
  {
    titulo: "FASE 1",
    enunciado: "Para entrar na Academia Imperial, diga o nome do Lorde Sith " +
               "que usa uma máscara preta: Darth ____",
    resposta: "vader",
    dica: "É o vilão mais famoso de Star Wars: Darth Vader."
  },
  {
    titulo: "FASE 2",
    enunciado: "Existe um texto escondido nesta página (letra preta no fundo preto). " +
               "Selecione a área abaixo com o mouse para revelá-lo.",
    resposta: "morte",
    dica: "A maior arma do Império é a Estrela da Morte.",
    extraHTML: '<div class="pista-fundo">A maior arma do Império é a Estrela da ____</div>'
  },
  {
    titulo: "FASE 3",
    enunciado: "Clique na engrenagem do Império abaixo. " +
               "Ela parece só decoração, mas guarda uma pista.",
    resposta: "sith",
    dica: "São os guerreiros do sabre de luz vermelho: os Sith.",
    extraHTML: '<div class="decoracao" onclick="revelarDecoracao(this)">⚙</div>' +
               '<div id="decoracao-pista">A senha é o nome dos usuários do lado sombrio: ____ (4 letras)</div>'
  },
  {
    titulo: "FASE 4",
    enunciado: "Resolva a sequência lógica: 2, 4, 6, 8, ... Qual é o próximo número?",
    resposta: "10",
    dica: "A sequência aumenta de 2 em 2."
  },
  {
    titulo: "FASE BÔNUS",
    enunciado: "Última missão! A senha final está escondida no console do navegador. " +
               "Aperte F12 e olhe a aba Console.",
    resposta: "devtools",
    dica: "Abra o console (F12) e leia a mensagem vermelha."
  }
];

// fase 
let faseAtual = 0;
let tempoInicio = null;
let intervaloCronometro = null;
let fundoAtivo = false;

// iniciar o jogo
function iniciarJogo() {
  faseAtual = 0;
  tempoInicio = Date.now();
  document.getElementById("tela-final").classList.remove("visivel");
  document.getElementById("jogo").style.display = "block";
  iniciarCronometro();
  carregarFase();
}

function iniciarCronometro() {
  if (intervaloCronometro) clearInterval(intervaloCronometro);
  intervaloCronometro = setInterval(() => {
    const segundos = Math.floor((Date.now() - tempoInicio) / 1000);
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const seg = String(segundos % 60).padStart(2, "0");
    document.getElementById("cronometro").textContent = min + ":" + seg;
  }, 1000);
}

// carrega a fase
function carregarFase() {
  const fase = fases[faseAtual];

  document.getElementById("fase-titulo").textContent = fase.titulo;
  document.getElementById("enunciado").textContent = fase.enunciado;
  document.getElementById("senha").value = "";
  document.getElementById("mensagem").textContent = "";
  document.getElementById("mensagem").className = "";
  document.getElementById("dica").classList.remove("visivel");
  document.getElementById("dica").textContent = "";

  document.getElementById("conteudo-extra").innerHTML = fase.extraHTML || "";

  if (faseAtual === 4) {
    console.log("%c🔓 PISTA SECRETA DO IMPÉRIO: a senha é 'devtools' (sem aspas).",
                "color: #ff0000; background: #000; font-size: 16px; padding: 8px;");
  }

  document.getElementById("senha").focus();
}

// verifica se ta certa a senha
function verificar() {
  const resposta = document.getElementById("senha").value.trim().toLowerCase();
  const fase = fases[faseAtual];

  if (resposta === fase.resposta.toLowerCase()) {
    document.getElementById("mensagem").textContent = "✔ Senha correta!";
    document.getElementById("mensagem").className = "ok";

    setTimeout(() => {
      faseAtual++;
      if (faseAtual < fases.length) {
        carregarFase();
      } else {
        finalizarJogo();
      }
    }, 700);
  } else {
    document.getElementById("mensagem").textContent = "✖ Senha incorreta. Tente novamente.";
    document.getElementById("mensagem").className = "erro";

    const terminal = document.getElementById("terminal");
    terminal.classList.add("shake");
    setTimeout(() => terminal.classList.remove("shake"), 400);
  }
}

// mostra uma dica
function mostrarDica() {
  const dicaEl = document.getElementById("dica");
  dicaEl.textContent = "💡 " + fases[faseAtual].dica;
  dicaEl.classList.add("visivel");
}

// frufru
function revelarDecoracao(elemento) {
  const pista = document.getElementById("decoracao-pista");
  if (pista) {
    pista.classList.add("visivel");
  }
  elemento.classList.add("ativo");
}

// ativa ou desativa o simbolo do immperio
function alternarFundo() {
  fundoAtivo = !fundoAtivo;
  document.getElementById("fundo-imperio").classList.toggle("visivel", fundoAtivo);

  const botao = document.getElementById("btn-fundo");
  if (fundoAtivo) {
    botao.textContent = "Fundo: ATIVO";
  } else {
    botao.textContent = "Fundo: DESLIGADO";
  }
}

// finalizar jogo
function finalizarJogo() {
  clearInterval(intervaloCronometro);
  const segundos = Math.floor((Date.now() - tempoInicio) / 1000);
  const min = String(Math.floor(segundos / 60)).padStart(2, "0");
  const seg = String(segundos % 60).padStart(2, "0");

  document.getElementById("jogo").style.display = "none";
  document.getElementById("tela-final").classList.add("visivel");
  document.getElementById("tempo-final").textContent =
    "Você levou " + min + ":" + seg + " para liberar o sistema.";
}

// reinicia
function reiniciar() {
  iniciarJogo();
}

//teste
document.getElementById("senha").addEventListener("keydown", (e) => {
  if (e.key === "Enter") verificar();
});

// inicia o jogo
iniciarJogo();