const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".Btn");

let nuevaOperacion = false; // Indica si después de un igual se debe limpiar la pantalla

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        // Botón C (limpiar)
        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

        // Botón borrar
        if (boton.id === "borrar") {
            pantalla.textContent = pantalla.textContent.length === 1 ? "0" : pantalla.textContent.slice(0, -1);
            return;
        }

        // Botón igual (=)
        if (boton.id === "igual") {
            try {
                // Evalúa la expresión de la pantalla
                pantalla.textContent = eval(pantalla.textContent.replace(/×/g, '*').replace(/÷/g, '/'));
                nuevaOperacion = true;
            } catch {
                pantalla.textContent = "Error";
                nuevaOperacion = true;
            }
            return;
        }

        // Si fue presionado igual antes y ahora presionan un número u operador, reiniciar pantalla si es número
        if (nuevaOperacion) {
            if (!isNaN(botonApretado)) {
                pantalla.textContent = botonApretado;
            } else {
                pantalla.textContent += botonApretado;
            }
            nuevaOperacion = false;
            return;
        }

        // Evita varios puntos seguidos en un mismo número
        if (botonApretado === ".") {
            const partes = pantalla.textContent.split(/[\+\-\*\/]/);
            const ultimaParte = partes[partes.length - 1];
            if (ultimaParte.includes(".")) return;
        }

        // Evita operadores seguidos (excepto el - para negativos)
        if (["+", "-", "*", "/"].includes(botonApretado)) {
            const ultimo = pantalla.textContent.slice(-1);
            if (["+", "-", "*", "/"].includes(ultimo)) {
                // Permite - después de operador para números negativos
                if (!(botonApretado === "-" && ultimo !== "-")) {
                    pantalla.textContent = pantalla.textContent.slice(0, -1) + botonApretado;
                    return;
                }
            }
        }

        // Si pantalla está en cero, reemplazar por el nuevo número (excepto punto o operador)
        if (pantalla.textContent === "0" && !isNaN(botonApretado)) {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    });
});