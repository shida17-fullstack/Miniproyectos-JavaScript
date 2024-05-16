// Obtener elementos del DOM
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

// Ocultar el modal inicialmente
modal.style.display = 'none';

// Abrir modal
openModal.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Cerrar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal haciendo clic fuera del modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Enviar formulario 
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Simular envío asíncrono
    setTimeout(() => {
        modal.style.display = 'none'; // Cerrar el modal después de enviar el formulario (opcional)
    }, 500); // Retraso de 500 milisegundos

    return false; // Evita que el formulario se envíe
});
