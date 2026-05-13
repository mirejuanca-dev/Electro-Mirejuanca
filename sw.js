// Datos integrados para evitar errores de carga de archivos (CORS)
const datosColores = {
    "negro": { "valor": 0, "hex": "#000000" },
    "marron": { "valor": 1, "hex": "#8B4513" },
    "rojo": { "valor": 2, "hex": "#FF0000" },
    "naranja": { "valor": 3, "hex": "#FFA500" },
    "amarillo": { "valor": 4, "hex": "#FFFF00" },
    "verde": { "valor": 5, "hex": "#008000" },
    "azul": { "valor": 6, "hex": "#0000FF" },
    "violeta": { "valor": 7, "hex": "#EE82EE" },
    "gris": { "valor": 8, "hex": "#808080" },
    "blanco": { "valor": 9, "hex": "#FFFFFF" }
};

function calcularOhm() {
    // Obtenemos los valores y los convertimos a número o dejamos NaN
    let v = parseFloat(document.getElementById('voltaje').value);
    let i = parseFloat(document.getElementById('corriente').value);
    let r = parseFloat(document.getElementById('resistencia').value);
    let p = parseFloat(document.getElementById('potencia').value);

    // Conteo de cuántos datos tenemos
    let datos = [v, i, r, p].filter(x => !isNaN(x)).length;

    if (datos < 2) {
        alert("Introduce al menos 2 valores");
        return;
    }

    // Cálculos según los datos presentes
    if (!isNaN(v) && !isNaN(i)) { r = v / i; p = v * i; }
    else if (!isNaN(v) && !isNaN(r)) { i = v / r; p = (v ** 2) / r; }
    else if (!isNaN(i) && !isNaN(r)) { v = i * r; p = (i ** 2) * r; }
    else if (!isNaN(p) && !isNaN(v)) { i = p / v; r = (v ** 2) / p; }
    else if (!isNaN(p) && !isNaN(i)) { v = p / i; r = p / (i ** 2); }
    else if (!isNaN(p) && !isNaN(r)) { v = Math.sqrt(p * r); i = Math.sqrt(p / r); }

    document.getElementById('resOhm').innerHTML = `
        ⚡ V: ${v.toFixed(2)}V | ⚡ I: ${i.toFixed(2)}A | <br>
        🧱 R: ${r.toFixed(2)}Ω | 🔥 P: ${p.toFixed(2)}W`;
}

function obtenerValor() {
    const b1 = document.getElementById('b1').value.toLowerCase().trim();
    const b2 = document.getElementById('b2').value.toLowerCase().trim();
    const b3 = document.getElementById('b3').value.toLowerCase().trim();

    if (datosColores[b1] && datosColores[b2] && datosColores[b3]) {
        const val = (datosColores[b1].valor * 10 + datosColores[b2].valor) * Math.pow(10, datosColores[b3].valor);
        document.getElementById('resVal').innerText = `Resultado: ${val >= 1000 ? val/1000 + "k" : val} Ω`;
    } else {
        alert("Color no reconocido. Usa: negro, marron, rojo, naranja, amarillo, verde, azul, violeta, gris o blanco.");
    }
}

function obtenerColores() {
    let val = document.getElementById('valOhm').value;
    if (val < 10) {
        alert("Introduce un valor de al menos 10 Ω");
        return;
    }

    let vStr = parseInt(val).toString();
    let d1 = parseInt(vStr[0]);
    let d2 = parseInt(vStr[1]);
    let ceros = vStr.length - 2;

    const lista = Object.keys(datosColores);
    const c1 = lista.find(k => datosColores[k].valor === d1);
    const c2 = lista.find(k => datosColores[k].valor === d2);
    const c3 = lista.find(k => datosColores[k].valor === ceros);

    if (!c3) {
        alert("Valor demasiado grande para 4 bandas");
        return;
    }

    document.getElementById('resCol').innerText = `Colores: ${c1.toUpperCase()}, ${c2.toUpperCase()}, ${c3.toUpperCase()}`;
    
    const visual = document.getElementById('visualBandas');
    visual.innerHTML = `
        <div class="banda" style="background:${datosColores[c1].hex}"></div>
        <div class="banda" style="background:${datosColores[c2].hex}"></div>
        <div class="banda" style="background:${datosColores[c3].hex}"></div>
        <div class="banda" style="background:gold; margin-left: 10px;"></div>
    `;
}
