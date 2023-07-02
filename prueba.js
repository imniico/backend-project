// Función para ejecutar cada segundo
function funcion1() {
    console.log('Función 1 ejecutada');
  }
  
  // Función para ejecutar cada dos segundos
  function funcion2() {
    console.log('Función 2 ejecutada');
  }
  
  // Ejecutar la función 1 cada segundo
  setInterval(funcion1, 1000);
  
  // Ejecutar la función 2 cada dos segundos
  setInterval(funcion2, 2000);