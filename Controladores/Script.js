let interval;
let totalRounds = 8; // Cambiará según la configuración
let currentRound = 0;
let isActive = false;
let workTime = 20;
let restTime = 10;
let soundUrl = '';

// Cargar configuraciones desde localStorage
function loadSettings() {
    const savedWorkTime = localStorage.getItem('workTime');
    const savedRestTime = localStorage.getItem('restTime');
    const savedRounds = localStorage.getItem('rounds'); // Cargar el número de vueltas
    const savedSoundUrl = localStorage.getItem('soundUrl');

    if (savedWorkTime) workTime = parseInt(savedWorkTime);
    if (savedRestTime) restTime = parseInt(savedRestTime);
    if (savedRounds) totalRounds = parseInt(savedRounds) * 2; // Cada vuelta tiene trabajo y descanso
    if (savedSoundUrl) soundUrl = savedSoundUrl;
}

// Iniciar el cronómetro
function startTimer() {
    isActive = true;

    function runRound() {
        if (currentRound < totalRounds) {
            const timerDuration = currentRound % 2 === 0 ? workTime : restTime;
            let timeLeft = timerDuration;

            interval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    currentRound++;
                    new Audio(soundUrl).play(); // Reproduce el sonido al final de cada intervalo
                    runRound(); // Llama a la siguiente ronda
                } else {
                    timeLeft--;
                    updateDisplay(timeLeft);
                }
            }, 1000);
        } else {
            resetTimer();
        }
    }

    runRound();
}

// Actualizar la visualización del cronómetro
function updateDisplay(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    document.getElementById('timer').innerText = `${minutes}:${secs}`;
}

// Reiniciar el cronómetro
function resetTimer() {
    clearInterval(interval);
    currentRound = 0;
    isActive = false;
    updateDisplay(0);
}

// Event listener para iniciar el cronómetro
document.getElementById('startBtn').addEventListener('click', () => {
    if (!isActive) {
        loadSettings(); // Carga las configuraciones antes de iniciar
        startTimer();
    }
});

// Event listener para reiniciar el cronómetro
document.getElementById('resetBtn').addEventListener('click', resetTimer);


// Selección de los botones del navbar lateral
document.getElementById('pechoBtn').addEventListener('click', () => {
    changeVideo('Media/Video/pecho.mp4');
});

document.getElementById('brazosBtn').addEventListener('click', () => {
    changeVideo('Media/Video/brazos.mp4');
});

document.getElementById('abdomenBtn').addEventListener('click', () => {
    changeVideo('Media/Video/abdomen.mp4');
});

document.getElementById('piernasBtn').addEventListener('click', () => {
    changeVideo('Media/Video/piernas.mp4');
});

// Función para cambiar el video
function changeVideo(videoUrl) {
    const videoSource = document.getElementById('videoSource');
    const exerciseVideo = document.getElementById('exerciseVideo');

    videoSource.src = videoUrl;
    exerciseVideo.load(); // Carga el nuevo video
    exerciseVideo.play(); // Opcional: iniciar el video automáticamente
}
