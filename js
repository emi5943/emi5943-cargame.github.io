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
