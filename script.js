// Selecionando elementos do HTML
const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const startButton = document.getElementById('start-button');
const points = document.getElementById('point-span');

// Variaveis de controle
let colorsOrder = []; // Ordem correta das cores
let movesOrder = []; // Ordem que o usuario pressionou
let gameStarted = false; // Verificar se o jogo começou
let currentPoints = 0;

// Criando interações
color1.addEventListener('click', pressColor);
color2.addEventListener('click', pressColor);
color3.addEventListener('click', pressColor);
color4.addEventListener('click', pressColor);
startButton.addEventListener('click', startGame)

function pressColor(event){
  if (!gameStarted) { //Invalidar cliques caso o jogo não tenha começado
    return
  }

  let colorNumber = event.target.id.replace('color-', '')  
  selectedClass(colorNumber);
  movesOrder.push(colorNumber);
  gameVerify();
}

function gameVerify() {
  if (checkMoves()) { // Se todos os movimentos até o momento estiverem certos
    if (movesOrder.length === colorsOrder.length) { // Se todos movimentos tiverem sido feitos
      round();
    }
  } else {
    loseGame();
  }
}

function round(){
  movesOrder = [];
  colorsOrder.push(generateNextColor());
  showMoves(colorsOrder);
}

function generateNextColor () {
  const nextColor = 1 + Math.floor(Math.random() * 4);
  return nextColor.toString();
}

function selectedClass (color) {
  let element = document.getElementById(`color-${color}`)
  element.classList.add('selected');
  setTimeout(() => {element.classList.remove('selected');}, 800)
}

function showMoves (array){
// Source: https://stackoverflow.com/questions/24293376/javascript-for-loop-with-timeout
  for (let i = 0; i < array.length; i+=1){
    setTimeout( () => selectedClass(array[i]), 1000 + (1000 * i));
  }
}

function checkMoves() {
  for (let i = 0; i < movesOrder.length; i+=1){
    if (movesOrder[i] !== colorsOrder[i]){
      return false
    }
  }
  sumPoints(); // Somar pontos caso o movimento seja valido
  return true
}

// Somar e resetar pontos
function sumPoints (){
  currentPoints += 1;
  points.innerText = `Pontos: ${currentPoints}`
}

function restartPoints (){
  currentPoints = 0;
  points.innerText = `Pontos: ${currentPoints}`
}

function startGame() {
  gameStarted = true;
  restartPoints();
  colorsOrder = [];
  movesOrder = [];

  round();
}

function loseGame() {
  gameStarted = false;
  points.innerText = `Você perdeu e fez um total de ${currentPoints} pontos`
}
