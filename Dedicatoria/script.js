const video = document.getElementById("miVideo");
const btnContainer = document.getElementById("btnContainer");
const boton = btnContainer.querySelector(".custom-button");

if (video) {
  video.volume = 0.3; // volumen máximo

  // Esperar 2 segundos antes de iniciar el video
  setTimeout(() => {
    video.play().catch(() => {
      console.log("El navegador bloqueó la reproducción automática con sonido.");
      document.body.addEventListener("click", () => {
        video.play();
      }, { once: true });
    });
  }, 1000);

  // Mostrar el botón con animación al finalizar
  video.addEventListener("ended", () => {
    btnContainer.style.display = "flex";
    boton.classList.add("show");
  });
}

// Función para ir a otra página
function irPagina() {
  window.location.href = "../Historia/Historia.html"; // 👉 cambia por tu destino
}
