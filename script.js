// Selecionando elementos do HTML

const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const startButton = document.getElementById('start-button');
const points = document.getElementById('point-span');

// Gerando ordem das cores

function generateNextColor () {
  const nextColor = 1 + Math.floor(Math.random() * 4);
  return nextColor.toString();
}

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
  if (checkMoves()) { // Se todos os movimentos até o momento estiverem certos
    if (movesOrder.length === colorsOrder.length) { // Se todos movimentos tiverem sido feitos
      round();
    }
  } else {
    alert('Você perdeu');
  }
}

function selectedClass (color) {
  let element = document.getElementById(`color-${color}`)
  element.classList.add('selected');
  setTimeout(() => {element.classList.remove('selected');}, 800)
}

// Source: https://stackoverflow.com/questions/24293376/javascript-for-loop-with-timeout
function showMoves (array){
  for (let i = 0; i < array.length; i+=1){
    setTimeout( () => selectedClass(array[i]), 1000 + (1000 * i));
  }
}
//showMoves([1, 2, 3, 4, 4, 3, 2, 1]);

let colorsOrder = [];
let movesOrder = [];

function round(){
  movesOrder = [];
  colorsOrder.push(generateNextColor());
  showMoves(colorsOrder);
}

function checkMoves() {
  for (let i = 0; i < movesOrder.length; i+=1){
    if (movesOrder[i] !== colorsOrder[i]){
      return false
    }
  }
  sumPoints();
  return true
}

let gameStarted = false;
let currentPoints = 0;

function startGame() {
  gameStarted = !gameStarted;
  restartPoints();
  colorsOrder = [];
  movesOrder = [];

  round();
}

function sumPoints (){
  currentPoints += 1;
  points.innerText = `Pontos: ${currentPoints}`
}

function restartPoints (){
  currentPoints = 0;
  points.innerText = `Pontos: ${currentPoints}`
}