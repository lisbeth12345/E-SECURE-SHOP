var contenedorEnlaces = document.getElementById("contenedorEnlaces");
       function mostrarMenu() {
          contenedorEnlaces.style.right = "0"; 
        }
        function ocultarMenu() {
          contenedorEnlaces.style.right = "-200px"; 
          }

          const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});