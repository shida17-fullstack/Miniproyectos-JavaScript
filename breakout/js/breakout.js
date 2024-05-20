// Obtener el canvas y el contexto
const canvas = document.getElementById("breakoutCanvas");
const ctx = canvas.getContext("2d");

// Declarar variables globales
let paddleWidth, paddleHeight, paddleX, paddleY;
let brickWidth, brickHeight, brickOffsetTop, brickOffsetLeft, brickPadding;
let bricksCoordinates = [];
let ballRadius;
let x, y, dx, dy;
let score = 0;
let gameOverMessage = "";

// Definir las dimensiones de las barras superiores
const brickRowCount = 3; // Cantidad de barras superiores
const brickColumnCount = 5; // Cantidad de barras superiores

// Ajustar el tamaño del canvas
function adjustCanvasSize() {
    // Ajustar el tamaño del canvas manteniendo la relación de aspecto 4:3
    const aspectRatio = 4 / 3;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    if (maxWidth / maxHeight > aspectRatio) {
        canvas.width = maxHeight * aspectRatio;
        canvas.height = maxHeight;
    } else {
        canvas.width = maxWidth;
        canvas.height = maxWidth / aspectRatio;
    }

    // Ajustar las dimensiones y la posición de la barra de rebote inferior
    paddleWidth = canvas.width * 0.1; // Porcentaje del ancho del canvas
    paddleHeight = canvas.height * 0.02; // Porcentaje del alto del canvas
    paddleX = (canvas.width - paddleWidth) / 2;
    paddleY = canvas.height - paddleHeight - 10; // Ajustar la posición vertical de la barra inferior

    // Ajustar las dimensiones y la posición de las barras de rebote superiores
    brickWidth = canvas.width * 0.1; // Porcentaje del ancho del canvas
    brickHeight = canvas.height * 0.05; // Porcentaje del alto del canvas
    brickOffsetTop = canvas.height * 0.1; // Porcentaje del alto del canvas
    brickPadding = canvas.width * 0.01; // Porcentaje del ancho del canvas

    // Recalcular las coordenadas de las barras superiores después de ajustar el tamaño del canvas
    bricksCoordinates = [];
    brickOffsetLeft = (canvas.width - (brickWidth + brickPadding) * brickColumnCount + brickPadding) / 2;
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricksCoordinates.push({ x: brickX, y: brickY, status: 1 });
        }
    }

    // Ajustar la posición y el tamaño de la pelota
    ballRadius = Math.min(canvas.width, canvas.height) * 0.02; // Tamaño proporcional al tamaño de la pantalla
    x = canvas.width / 2;
    y = canvas.height - 70; // Ajustar la posición vertical de la pelota
    dx = 3; // Aumenta la velocidad horizontal
    dy = -3; // Aumenta la velocidad vertical
}

// Llamar a la función para ajustar el tamaño del canvas al cargar la página y al cambiar el tamaño de la ventana
adjustCanvasSize();
window.addEventListener("resize", adjustCanvasSize);

// Inicializar variables de control de teclas
let rightPressed = false;
let leftPressed = false;

// Detectar el movimiento de las teclas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Detectar eventos táctiles para dispositivos móviles
canvas.addEventListener("touchstart", touchStartHandler, false);
canvas.addEventListener("touchend", touchEndHandler, false);

function touchStartHandler(e) {
    if (e.targetTouches.length === 1) {
        const touch = e.targetTouches[0];
        if (touch.pageX < canvas.width / 2) {
            leftPressed = true;
        } else {
            rightPressed = true;
        }
    }
}

function touchEndHandler(e) {
    leftPressed = false;
    rightPressed = false;
}

// Detectar clics en botones para dispositivos móviles
document.getElementById("left-button").addEventListener("mousedown", () => { leftPressed = true; });
document.getElementById("left-button").addEventListener("mouseup", () => { leftPressed = false; });
document.getElementById("left-button").addEventListener("touchstart", () => { leftPressed = true; });
document.getElementById("left-button").addEventListener("touchend", () => { leftPressed = false; });
document.getElementById("right-button").addEventListener("mousedown", () => { rightPressed = true; });
document.getElementById("right-button").addEventListener("mouseup", () => { rightPressed = false; });
document.getElementById("right-button").addEventListener("touchstart", () => { rightPressed = true; });
document.getElementById("right-button").addEventListener("touchend", () => { rightPressed = false; });

// Dibujar la pelota
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Dibujar la barra de rebote inferior
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Dibujar las barras de rebote superiores
function drawBricks() {
    for (let i = 0; i < bricksCoordinates.length; i++) {
        let brick = bricksCoordinates[i];
        if (brick.status === 1) {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Dibujar los puntajes
function drawScore() {
    ctx.font = `${Math.min(canvas.width, canvas.height) * 0.03}px Helvetica`;
    ctx.fillStyle = "#222";
    ctx.fillText("Puntaje: " + score, canvas.width - canvas.width * 0.1, canvas.height * 0.05);
}

// Dibujar el mensaje de fin de juego
function drawGameOverMessage() {
    ctx.font = `${Math.min(canvas.width, canvas.height) * 0.05}px Helvetica`;
    ctx.fillStyle = "#222";
    ctx.textAlign = "center";
    ctx.fillText(gameOverMessage, canvas.width / 2, canvas.height / 2);
}

// Colisión de la pelota con las barras superiores
function collisionDetection() {
    let remainingBricks = 0; // Variable para contar las barras restantes

    for (let i = 0; i < bricksCoordinates.length; i++) {
        let brick = bricksCoordinates[i];
        if (brick.status === 1) {
            remainingBricks++; // Incrementar el contador de barras restantes
            if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                dy = -dy;
                brick.status = 0;
                score++;
            }
        }
    }

    // Verificar si se rompieron todas las barras
    if (remainingBricks === 0) {
        gameOverMessage = "¡Felicidades, has ganado!";
        setTimeout(() => {
            gameOverMessage = "";
            resetGame(); // Reiniciar el juego después de mostrar el mensaje de fin de juego
        }, 2000); // Mensaje de fin de juego visible durante 2 segundos
    }
}

// Reiniciar el juego
function resetGame() {
    score = 0;
    x = canvas.width / 2;
    y = canvas.height - 70; // Ajustar la posición vertical de la pelota
    dx = 3;
    dy = -3;
    paddleX = (canvas.width - paddleWidth) / 2;
    paddleY = canvas.height - paddleHeight - 10; // Ajustar la posición vertical de la barra inferior

    // Restablecer el estado de las barras superiores
    for (let i = 0; i < bricksCoordinates.length; i++) {
        bricksCoordinates[i].status = 1;
    }
}


function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

// Actualizar el juego 
function updateGame() {
    movePaddle();
    moveBall();
    collisionDetection();
}


//Mover pelota
function moveBall() {
    x += dx;
    y += dy;

    // Ball collision with walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            gameOverMessage = "¡Juego terminado! Puntaje: " + score;
            setTimeout(() => {
                gameOverMessage = "";
                resetGame();
            }, 2000);
        }
    }
}

// Ajustar la velocidad de la pelota para pantallas pequeñas
function adjustBallSpeedForSmallScreens() {
    if (canvas.width < 768) {
        dx = 1; // Reducir la velocidad horizontal
        dy = -1; // Reducir la velocidad vertical
    }
}

// Llamar a la función para ajustar la velocidad de la pelota
adjustBallSpeedForSmallScreens();


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawGameOverMessage();
    updateGame();
    requestAnimationFrame(draw);
}


draw();
