const palabraSecreta = "cocacola";
let letrasAdivinadas = [];
let intentosRestantes = 6;

const palabraDiv = document.getElementById("palabra");
const letraInput = document.getElementById("letra");
const mensajesDiv = document.getElementById("mensajes");
const adivinarButton = document.getElementById("adivinar");

function mostrarPalabra() {
    palabraDiv.textContent = palabraSecreta.split('').map(letra => (letrasAdivinadas.includes(letra) ? letra : '_')).join(' ');
}

function comprobarLetra() {
    const letra = letraInput.value.toLowerCase();
    letraInput.value = '';

    if (!letrasAdivinadas.includes(letra) && letra) {
        letrasAdivinadas.push(letra);

        if (!palabraSecreta.includes(letra)) {
            intentosRestantes--;
            mensajesDiv.textContent = `Letra incorrecta. Te quedan ${intentosRestantes} intentos.`;
        } else {
            mensajesDiv.textContent = `¡Correcto!`;
        }
    } else {
        mensajesDiv.textContent = "Ya adivinaste esa letra. Intenta otra vez.";
    }

    mostrarPalabra();

    if (palabraSecreta.split('').every(letra => letrasAdivinadas.includes(letra))) {
        mensajesDiv.textContent = `¡Felicidades! Adivinaste la palabra: ${palabraSecreta}`;
    } else if (intentosRestantes === 0) {
        mensajesDiv.textContent = `Perdiste. La palabra era: ${palabraSecreta}`;
    }
}

adivinarButton.addEventListener("click", comprobarLetra);
mostrarPalabra();
