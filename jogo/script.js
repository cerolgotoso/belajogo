const gameArea = document.getElementById("gameArea");
const car = document.getElementById("car");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let carLeft = 125;
let obstacleTop = -100;
let obstacleLeft = 125;
let score = 0;
let gameSpeed = 4;
let gameRunning = true;

function moveCar(e) {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft" && carLeft > 0) {
    carLeft -= 25;
  }
  if (e.key === "ArrowRight" && carLeft < 250) {
    carLeft += 25;
  }
  car.style.left = carLeft + "px";
}

document.addEventListener("keydown", moveCar);

function randomObstaclePosition() {
  const positions = [0, 75, 150, 225];
  return positions[Math.floor(Math.random() * positions.length)];
}

function gameLoop() {
  if (!gameRunning) return;

  obstacleTop += gameSpeed;
  obstacle.style.top = obstacleTop + "px";

  // Se o obstáculo sair da tela
  if (obstacleTop > 500) {
    obstacleTop = -100;
    obstacleLeft = randomObstaclePosition();
    obstacle.style.left = obstacleLeft + "px";
    score++;
    scoreDisplay.textContent = score;
    if (score % 5 === 0 && gameSpeed < 10) {
      gameSpeed += 0.5; // aumenta dificuldade
    }
  }

  // Colisão
  if (
    obstacleTop + 100 >= 400 && // altura do carro
    obstacleLeft === carLeft
  ) {
    gameRunning = false;
    alert("💥 Game Over! Pontuação: " + score);
    location.reload();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
