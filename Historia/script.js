const video = document.getElementById("miVideo");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const finalDiv = document.getElementById("final");
const btnFlores = document.getElementById("btnFlores");

// Volumen máximo
video.volume = 1.0;

// Lista de capítulos en segundos
const capitulos = [-0.5, 3.5, 13.5, 22, 28, 38, 48, 53, 60.5, 66.5, 76, 84.5, 93, 99.5, 105.5];
let indice = 0;

// Ir a un capítulo
function irACapitulo(i) {
  if (i >= 0 && i < capitulos.length) {
    indice = i;
    video.currentTime = capitulos[indice];
    ocultarBotones(); // Ocultar botones al iniciar
    video.play();
  }
}

// Detectar si llega al final del capítulo actual y pausar
video.addEventListener("timeupdate", () => {
  const limite = capitulos[indice + 1];
  if (limite && video.currentTime >= limite) {
    video.pause();
  }
  // Si es el último capítulo y termina, mostrar botón final
  if (indice === capitulos.length - 1 && video.ended) {
    mostrarFinal();
  }
});

// Cuando el video se pausa (llega a un capítulo) → mostrar botones
video.addEventListener("pause", () => {
  actualizarBotones();
});

// Botón siguiente
btnSiguiente.addEventListener("click", () => {
  if (indice < capitulos.length - 1) {
    irACapitulo(indice + 1);
  } else {
    mostrarFinal();
  }
});

// Botón anterior
btnAnterior.addEventListener("click", () => {
  if (indice > 0) {
    irACapitulo(indice - 1);
  }
});

// Mostrar/ocultar botones según el capítulo actual
function actualizarBotones() {
  // Ocultar 'Anterior' si estamos en el primer capítulo
  btnAnterior.classList.toggle("d-none", indice === 0);

  // Ocultar 'Siguiente' si estamos en el último capítulo
  btnSiguiente.classList.toggle("d-none", indice === capitulos.length - 1);
}

// Ocultar botones
function ocultarBotones() {
  btnAnterior.classList.add("d-none");
  btnSiguiente.classList.add("d-none");
}

// Mostrar pantalla final
function mostrarFinal() {
  ocultarBotones();
  finalDiv.classList.remove("d-none");
}

// Reproducir después de 2s (si el navegador lo permite)
setTimeout(() => {
  irACapitulo(0);      // Iniciar en el primer capítulo
  actualizarBotones();  // Ajustar botones al inicio
  video.play().catch(() => {
    console.log("El navegador bloqueó la reproducción automática con sonido.");
    document.body.addEventListener("click", () => {
      video.play();
    }, { once: true });
  });
}, 2000);

btnFlores.addEventListener("click", () => {
  window.location.href = "../Flores/Jardin.html"; // Cambia a la página deseada
});

// Inicializar: sin botones visibles
ocultarBotones();

const audio = document.getElementById("miAudio");
const btnSonido = document.getElementById("btnSonido");
const icono = btnSonido.querySelector("i");

// Estado inicial
audio.volume = 0.3;   // volumen máximo
audio.muted = false;

// Intentar reproducir automáticamente al cargar
window.addEventListener("load", () => {
  audio.play().catch(() => {
    console.log("El navegador bloqueó el autoplay. Requiere clic del usuario.");
  });
});

// Alternar sonido al hacer clic en el botón
btnSonido.addEventListener("click", () => {
  audio.muted = !audio.muted;

  if (audio.muted) {
    icono.classList.remove("bi-volume-up-fill");
    icono.classList.add("bi-volume-mute-fill");
  } else {
    icono.classList.remove("bi-volume-mute-fill");
    icono.classList.add("bi-volume-up-fill");
  }
});