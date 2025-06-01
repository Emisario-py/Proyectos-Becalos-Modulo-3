const planetas = require('./planetas');
const cowsay = require("cowsay");

console.log(cowsay.say({
    text : "See, a lot of planets",
    e : "oO",
    T : "U "
}));

planetas.forEach(planeta => {
  console.log(`¡Planeta ${planeta.nombre} descubierto!`);
  console.log(`Descripción: ${planeta.descripcion}`);
  console.log(`Descubierto en: ${planeta.descubiertoEn}`);
  console.log('---');
});