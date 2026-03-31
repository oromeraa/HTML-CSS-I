const greeting = (name) => `Hola, ${name}!`;

// Usamos una variable dinámica para que Parcel no "aplane" el código
const user = window.location.search || 'Omar'; 
console.log(greeting(user));
