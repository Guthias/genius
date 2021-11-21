// Selecionando elementos do HTML

const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const startButton = document.getElementById('start-button');
const points = document.getElementById('point-span');

// Gerando ordem das cores

let colorsOrder = [];

function generateNextColor () {
  const nextColor = 1 + Math.floor(Math.random() * 4);
  colorsOrder.push(nextColor);
}

color1.addEventListener('click', pressColor);
color2.addEventListener('click', pressColor);
color3.addEventListener('click', pressColor);
color4.addEventListener('click', pressColor);

function pressColor(event){
  let colorNumber = event.target.id.replace('color-', '')  
  selectedClass(event.target);
  //return colorNumber;
  console.log(colorNumber);
}

function selectedClass (element) {
  element.classList.add('selected');
  setTimeout(() => {element.classList.remove('selected');}, 800)
}