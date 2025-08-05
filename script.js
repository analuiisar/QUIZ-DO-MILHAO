// DEIXEI AS QUESTÕES COMENTADAS AQUI CASO NÃO CONSEGUISSE RODAR COM O ARQUIVO JSON
const questions = [
  {
    question: "Qual palavra-chave é usada para declarar uma variável em JavaScript?",
    options: ["value", "int", "var", "define"],
    answer: 2
  },
  {
    question: "Como se escreve um comentário de uma linha em JavaScript?",
    options: ["<!-- comentário -->", "// comentário", "# comentário", "/* comentário */"],
    answer: 1
  },
  {
    question: "Qual desses valores é considerado falsy?",
    options: ["{}", "null", "[]", "0"],
    answer: 1
  },
  {
    question: "Qual operador é usado para igualdade estrita (valor e tipo)?",
    options: ["===", "=", "==", "!="],
    answer: 0
  },
  {
    question: "Qual função exibe uma mensagem no console?",
    options: ["alert()", "prompt()", "console.write()", "console.log()"],
    answer: 3
  },
  {
    question: "Como se cria uma função em JavaScript?",
    options: ["func nome() {}", "def nome() {}", "new function nome()", "function nome() {}"],
    answer: 3
  },
  {
    question: "Qual método adiciona um item ao final de um array?",
    options: ["push()", "add()", "append()", "concat()"],
    answer: 0
  },
  {
    question: "O que let permite que var não permite?",
    options: ["Criar strings", "Criar funções", "Escopo de bloco", "Declarações constantes"],
    answer: 2
  },
  {
    question: "O que acontece ao usar = ao invés de ==?",
    options: ["Compara valores", "Atribui valor", "Compara tipo", "Cria função"],
    answer: 1
  },
  {
    question: "Como você escreve uma condição “se” em JavaScript?",
    options: ["if (condição) {}", "if condição:", "se (condição)", "when (condição)"],
    answer: 0
  },
];

// Variável que vai receber as perguntas do JSON
// let questions = [];

let currentQuestion = 0; //Índice da pergunta atual
let score = 0;  //Pontuação do jogador
let timer;  // Cronômetro
let skipCount = 2;  // Quantidade de pulos disponíveis por partida
let autoCorrectCount = 2;  // Quantidade de acertos automáticos disponíveis por partida
let playerName = "";  // Nome do jogador

// Variáveis que pegam os dados do HTML
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const playerNameSpan = document.getElementById("player-name");
const rulesModal = document.getElementById("rules-modal");

// Carrega as perguntas do arquivo JSON e salva esse conteudo na variável questions. Caso as perguntas não carreguem, aparece a mensagem de erro de carregamento no console. 
// fetch("questions.json")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Erro ao carregar o arquivo JSON");
//     }
//     return response.json();
//   })
//   .then(data => {
//     questions = data;
//   })
//   .catch(error => {
//     console.error("Erro ao carregar perguntas:", error);
//   });


// Salva o nome do jogador quando digitado no input e gera um alerta
document.getElementById("save-name").addEventListener("click", () => {
  playerName = document.getElementById("name-input").value;
  if (playerName) {
    playerNameSpan.textContent = playerName;
    alert("Nome salvo!");
  }
});


// Controlam a exibição das regras 
document.getElementById("show-rules").addEventListener("click", () => {   // Ação para mostrar as regras
  rulesModal.classList.remove("hidden");
});

document.getElementById("close-rules").addEventListener("click", () => {   // Ação para fechar as regras
  rulesModal.classList.add("hidden");
});


// Varáveis que pegam os dados do html para iniciar o jogo 
document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("restart").addEventListener("click", restartGame);
document.getElementById("quit").addEventListener("click", quitGame);
document.getElementById("skip").addEventListener("click", skipQuestion);
document.getElementById("auto-correct").addEventListener("click", autoCorrectQuestion);
document.getElementById("play-again").addEventListener("click", restartGame);


// Função para iniciar o jogo 
function startGame() {
  if (!playerName) {
    alert("Salve seu nome antes de iniciar.");  // Se a caixa do nome estiver vazia dá o alerta e retorna para o input 
    return;
  }

  // // // Garante que as perguntas foram carregadas antes de começar
  // if (questions.length === 0) {
  //   alert("As perguntas ainda estão carregando. Tente de novo em alguns segundos.");
  //   return;
  // }

  startScreen.classList.add("hidden");    // Adiciona a classe hidden para a tela inicial  
  quizScreen.classList.remove("hidden");  // Remove a classe hidden para a tela de perguntas 
  showQuestion();
}

// Exibe a pergunta e as alternativas
function showQuestion() {
  clearInterval(timer);  // Limpa o timer da pergunta anterior
  document.getElementById("feedback").textContent = "";

  const questionContainer = document.getElementById("question-container");
  questionContainer.classList.remove("show");
  questionContainer.classList.add("fade");

  setTimeout(() => {
    const questionData = questions[currentQuestion];
    document.getElementById("question").textContent = questionData.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    questionData.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.addEventListener("click", () => checkAnswer(index, btn));  // Quando clicamos em cada botão, é chamada a função chechAnswer
      optionsContainer.appendChild(btn);
    });

    updateProgress();
    startTimer();

    questionContainer.classList.add("show");
  }, 50);
}


// Verifica a resposta e dá o feedback
function checkAnswer(selected, button) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].answer;
  const options = document.querySelectorAll("#options button");
  options.forEach(btn => btn.disabled = true);

  const feedbackEl = document.getElementById("feedback");
  feedbackEl.className = "";

  if (selected === correctIndex) {
    button.classList.add("correct");
    score++;
    feedbackEl.textContent = "✔️ Você acertou! Resposta correta!";
    feedbackEl.classList.add("correct", "show");
  } else {
    button.classList.add("incorrect");
    options[correctIndex].classList.add("correct");
    feedbackEl.textContent = "❌ Infelizmente você errou... Resposta incorreta!";
    feedbackEl.classList.add("incorrect", "show");
  }

  // Depois de 1.5 segundo passa para a próxima pergunta
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}


// Função de pular pergunta
function skipQuestion() {
  if (skipCount > 0) {
    skipCount--;
    document.getElementById("skip").textContent = `Pular Pergunta (${skipCount})`;
    nextQuestion();
  } else {
    alert("Você já usou todas as puladas.");
  }
}

// Função de autocorreção
function autoCorrectQuestion() {
  if (autoCorrectCount > 0) {
    autoCorrectCount--;
    document.getElementById("auto-correct").textContent = `Acertar Pergunta (${autoCorrectCount})`;
    score++;
    nextQuestion();
  } else {
    alert("Você já usou todos os acertos automáticos.");
  }
}


// Função para barra de progresso
function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
  document.getElementById("progress-text").textContent =
    `${currentQuestion + 1}/${questions.length}`;
}


// Timer de 15 segundos para cada pergunta
function startTimer() {
  let timeLeft = 15;
  document.getElementById("timer").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("feedback").textContent = "Tempo esgotado!";
      nextQuestion();
    }
  }, 1000);
}


// Função para fim do jogo
function endGame() {
  quizScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  document.getElementById("score").textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
  document.getElementById("ranking").textContent = `Ranking: ${(score / questions.length * 100).toFixed(0)}%`;
}


// Função para jogar novamente
function restartGame() {
  location.reload();
}


// Função para desistir 
function quitGame() {
  if (confirm("Deseja realmente desistir?")) {
    endGame();
  }
}
