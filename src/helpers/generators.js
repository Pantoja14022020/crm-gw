function generarColorAlegre() {
  // Generar componentes RGB para un color alegre
  const r = Math.floor(Math.random() * 156) + 50; // Rojo
  const g = Math.floor(Math.random() * 156) + 50; // Verde
  const b = Math.floor(Math.random() * 156) + 50; // Azul

  // Crear el color en formato CSS RGB
  const color = `rgb(${r}, ${g}, ${b})`;

  return color;
}


  export {
    generarColorAlegre
  }