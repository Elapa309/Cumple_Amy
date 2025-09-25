let isMusicPlaying = false;
let currentAudio = null;

function triggerCelebration() {
    const card = document.querySelector('.celebration-card');
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.backgroundColor = getRandomColor();
        card.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

const audio = document.getElementById("miAudio"); // usamos el <audio> del HTML

function toggleMusic() {
    const musicBtn = document.getElementById("musicBtn");

    if (!isMusicPlaying) {
        audio.volume = 0.5; // 🔊 inicia al 50%
        audio.play().then(() => {
            musicBtn.classList.add("active"); // marca como activo
            isMusicPlaying = true;
        }).catch(err => {
            console.log("El navegador bloqueó el autoplay:", err);
        });
    } else {
        audio.pause();
        musicBtn.classList.remove("active");
        isMusicPlaying = false;
    }
}

document.body.addEventListener("click", () => {
    if (!isMusicPlaying) {
        audio.volume = 0.5;
        audio.play().then(() => {
            isMusicPlaying = true;
            document.getElementById("musicBtn").classList.add("active");
        });
    }
}, { once: true }); // se ejecuta solo la primera vez

function createBurst() {
    const container = document.getElementById('burstContainer');
    container.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        const angle = (i / 20) * 360;
        const distance = 100 + Math.random() * 50;
        const duration = 0.8 + Math.random() * 0.4;
        particle.style.backgroundColor = getRandomColor();
        particle.style.animation = `burstOut ${duration}s ease-out forwards`;
        particle.style.transform = `rotate(${angle}deg) translateX(${distance}px)`;
        container.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
    }
}

function goToPage() {
    createBurst();
    setTimeout(() => {
        window.location.href = "/Dedicatoria/Video.html";
    }, 1000);
}

function getRandomColor() {
    const colors = ['#FFD700', '#00BFFF', '#FF6347', '#32CD32', '#9370DB', '#FF1493', '#00CED1'];
    return colors[Math.floor(Math.random() * colors.length)];
}

setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.left = Math.random() * 100 + '%';
    document.querySelector('.celebration-card').appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
}, 3000);

