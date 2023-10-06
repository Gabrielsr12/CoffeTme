let timerInterval;
const timerDisplay = document.getElementById("timer");
const timeInput = document.getElementById("timeInput");
const startButton = document.getElementById("startButton");

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
    const targetTime = Date.now() + timeInput.value * 60 * 1000;

    clearInterval(timerInterval); // Limpa o intervalo anterior, se houver

    timerInterval = setInterval(function () {
        const currentTime = Date.now();
        const remainingTime = Math.max(
            0,
            Math.floor((targetTime - currentTime) / 1000)
        );

        timerDisplay.textContent = formatTime(remainingTime);

        if (remainingTime === 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00:00";
            if (Notification.permission === "granted") {
                new Notification("Tempo esgotado!");
            }

            setTimeout(() => {
                timerDisplay.textContent = "00:00:00"; // Reinicia a exibição do tempo
            }, 3000); // Aguarda 3 segundos antes de redefinir a exibição
        }
    }, 1000);
}

startButton.addEventListener("click", function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    startTimer();
});

window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        event.preventDefault();
        timeInput.stepUp();
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        timeInput.stepDown();
    } else if (event.key === "Enter") {
        event.preventDefault();
        startButton.click(); // Simula o clique no botão "Iniciar"
    }
});