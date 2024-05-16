// Función para cargar más cursos
function cargarMasCursos() {
    // Simular carga de cursos 
    setTimeout(function() {
        var nuevosCursos = '';
        var numCursos = document.querySelectorAll('.cursos-container').length; // Obtener el número actual de cursos cargados
        for (var i = numCursos + 1; i <= numCursos + 10; i++) { // Comenzar desde el siguiente número después del último curso cargado
            nuevosCursos += `
                <div class="cursos-container">
                    <h2>Curso de Programación ${i}</h2>
                    <p>Este es el contenido del curso ${i}</p>
                </div>
            `;
        }
        // Agregar los cursos al contenedor
        document.getElementById('main-content').innerHTML += nuevosCursos;
        document.getElementById('cargando').style.display = 'none'; // Ocultar el indicador de carga después de cargar los cursos
    }, 1000); // Simulación de carga de 1 segundo
}

// Evento para detectar scroll y cargar más cursos cuando se llega al final de la página
window.addEventListener('scroll', function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        document.getElementById('cargando').style.display = 'block';
        cargarMasCursos();
    }
});

// Cargar cursos al cargar la página por primera vez
window.onload = cargarMasCursos;
