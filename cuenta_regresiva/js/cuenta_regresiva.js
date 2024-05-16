// Fecha del Año Nuevo
const anoNuevo = new Date("January 1, 2025 00:00:00").getTime();

// Actualizar la cuenta regresiva cada segundo
const cuentaRegresiva = setInterval(function() {
  // Obtener la fecha y hora actual
  const ahora = new Date().getTime();
    
  // Calcular la diferencia entre la fecha del Año Nuevo y la fecha actual
  const distancia = anoNuevo - ahora;
    
  // Calcular los días, horas, minutos y segundos restantes
  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    
  // Obtener todos los elementos con la clase "item"
  const items = document.querySelectorAll('.item');
  
  // Llenar los elementos con los valores correspondientes
  items[0].textContent = `${dias} días`;
  items[1].textContent = `${horas} horas`;
  items[2].textContent = `${minutos} minutos`;
  items[3].textContent = `${segundos} segundos`;
  
  // Actualizar el contenido de los elementos prefix y suffix
  document.getElementById("countdown-prefix").textContent = "Faltan";
  document.getElementById("countdown-suffix").textContent = "para comenzar el año nuevo 2025!";


  // Si la cuenta regresiva termina, mostrar un mensaje
  if (distancia < 0) {
    document.getElementById("countdown").innerHTML = "¡Feliz Año Nuevo!";
  }
}, 1000); // Actualizar cada segundo