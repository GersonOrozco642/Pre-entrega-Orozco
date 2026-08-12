const banco = [
    { palabra: 'css', dificultad: 'facil' },
    { palabra: 'git', dificultad: 'facil' },
    { palabra: 'html', dificultad: 'facil' },
    { palabra: 'json', dificultad: 'facil' },
    { palabra: 'node', dificultad: 'facil' },
    { palabra: 'vite', dificultad: 'facil' },
    { palabra: 'react', dificultad: 'medio' },
    { palabra: 'array', dificultad: 'medio' },
    { palabra: 'clase', dificultad: 'medio' },
    { palabra: 'objeto', dificultad: 'medio' },
    { palabra: 'funcion', dificultad: 'medio' },
    { palabra: 'variable', dificultad: 'medio' },
    { palabra: 'servidor', dificultad: 'medio' },
    { palabra: 'navegador', dificultad: 'dificil' },
    { palabra: 'framework', dificultad: 'dificil' },
    { palabra: 'algoritmo', dificultad: 'dificil' },
    { palabra: 'javascript', dificultad: 'dificil' },
    { palabra: 'asincronia', dificultad: 'dificil' },
    { palabra: 'recursividad', dificultad: 'dificil' },
    { palabra: 'paradojaexistencial', dificultad: 'dificil' },
];

const partesAhorcado = [
    'parte-cabeza',
    'parte-cuerpo',
    'parte-brazo-izq',
    'parte-brazo-der',
    'parte-pierna-izq',
    'parte-pierna-der',
];

const palabraDiv = document.getElementById('palabra');
const mensajeDiv = document.getElementById('mensajes');
const tecladoDiv = document.getElementById('teclado');
const vidasP = document.getElementById('vidas');
const dificultadSpan = document.getElementById('dificultad');
const reiniciarBtn = document.getElementById('reiniciar');

let palabraSecreta = '';
let letrasAdivinadas = [];
let errores = 0;
const maxErrores = partesAhorcado.length;
let juegoActivo = true;

function elegirPalabra() {
    const palabra = banco[Math.floor(Math.random() * banco.length)];
    palabraActual = palabra.palabra;
    dificultadSpan.textContent = palabra.dificultad;
    dificultadSpan.className = `badge ${palabra.dificultad}`;
}

function crearTeclado() {
    tecladoDiv.innerHTML = '';
    const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letras.forEach(letra => {
        const btn = document.createElement('button');
        btn.textContent = letra;
        btn.addEventListener('click', () => comprobarLetra(letra, btn));
        tecladoDiv.appendChild(btn);
    });
}

function mostrarPalabra() {
    palabraDiv.innerHTML = '';
    palabraActual.split('').forEach(letra => {
        const span = document.createElement('span');
        span.textContent = letrasAdivinadas.includes(letra) ? letra : '';
        palabraDiv.appendChild(span);
    });
}

function actualizarAhorcado() {
    partesAhorcado.forEach((id, index) => {
        const parte = document.getElementById(id);
        parte.style.opacity = index < errores ? '1' : '0';
    });
    vidasP.textContent = `${maxErrores - errores} intentos restantes`;
}

function terminarJuego(gano) {
    juegoActivo = false;
    mensajesDiv.classList.remove('ganaste', 'perdiste');
    mensajesDiv.classList.add(gano ? 'ganaste' : 'perdiste');
    mensajesDiv.textContent = gano
        ? '¡Ganaste! Adivinaste la palabra.'
        : `Perdiste. La palabra era: ${palabraActual}`;
    tecladoDiv.querySelectorAll('button').forEach(btn => btn.disabled = true);
    if (!gano) {
        palabraDiv.innerHTML = '';
        palabraActual.split('').forEach(letra => {
            const span = document.createElement('span');
            span.textContent = letra;
            palabraDiv.appendChild(span);
        });
    }
}

function comprobarLetra(letra, btn) {
    if (!juegoActivo || letrasAdivinadas.includes(letra)) return;
 
    letrasAdivinadas.push(letra);
    if (btn) btn.disabled = true;
 
    if (palabraActual.includes(letra)) {
        if (btn) btn.classList.add('correcta');
        mensajesDiv.classList.remove('ganaste', 'perdiste');
        mensajesDiv.textContent = '¡Correcto!';
    } else {
        if (btn) btn.classList.add('incorrecta');
        errores++;
        actualizarAhorcado();
        mensajesDiv.classList.remove('ganaste', 'perdiste');
        mensajesDiv.textContent = `Letra incorrecta. Te quedan ${maxErrores - errores} intentos.`;
    }
 
    mostrarPalabra();
 
    const gano = palabraActual.split('').every(letra => letrasAdivinadas.includes(letra));
    if (gano) {
        terminarJuego(true);
    } else if (errores >= maxErrores) {
        terminarJuego(false);
    }
}
 
    document.addEventListener('keydown', (e) => {
        const letra = e.key.toLowerCase();
        if (!/^[a-z]$/.test(letra)) return;
        const btn = [...tecladoDiv.children].find(b => b.textContent === letra);
        comprobarLetra(letra, btn);
    });

    