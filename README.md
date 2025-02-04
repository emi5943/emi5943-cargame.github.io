<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Игра с коли</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <div id="player"></div>
        <div id="obstacle"></div>
    </div>
    <p id="score">Точки: 0</p>
    <script src="script.js"></script>
</body>
</html>

body {
    text-align: center;
    background-color: #222;
    color: white;
    font-family: Arial, sans-serif;
}

.game-container {
    position: relative;
    width: 300px;
    height: 500px;
    background-color: gray;
    margin: auto;
    border: 2px solid white;
    overflow: hidden;
}

#player {
    width: 50px;
    height: 80px;
    background-color: red;
    position: absolute;
    bottom: 10px;
    left: 125px;
    border-radius: 10px;
}

#obstacle {
    width: 50px;
    height: 80px;
    background-color: black;
    position: absolute;
    top: -100px;
    left: 125px;
    border-radius: 10px;
}

#score {
    font-size: 20px;
    margin-top: 10px;
}

const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let playerX = 125;
let obstacleY = -100;
let obstacleX = Math.random() * 250;
let speed = 5;
let score = 0;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    } else if (event.key === "ArrowRight" && playerX < 250) {
        playerX += 20;
    }
    player.style.left = playerX + "px";
});

function updateGame() {
    obstacleY += speed;
    if (obstacleY > 500) {
        obstacleY = -100;
        obstacleX = Math.random() * 250;
        score++;
        speed += 0.2; // Увеличаване на скоростта
    }

    obstacle.style.top = obstacleY + "px";
    obstacle.style.left = obstacleX + "px";
    scoreDisplay.innerText = "Точки: " + score;

    if (checkCollision()) {
        alert("Край на играта! Точки: " + score);
        location.reload();
    } else {
        requestAnimationFrame(updateGame);
    }
}

function checkCollision() {
    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    return !(
        playerRect.bottom < obstacleRect.top ||
        playerRect.top > obstacleRect.bottom ||
        playerRect.right < obstacleRect.left ||
        playerRect.left > obstacleRect.right
    );
}

updateGame();
