let datosColores = {};

// Cargar datos del JSON
fetch('colores.json')
    .then(response => response.json())
    .then(data => datosColores = data);

function calcularOhm() {
    let v = parseFloat(document.getElementById('voltaje').value);
    let i = parseFloat(document.getElementById('corriente').value);
    let r = parseFloat(document.getElementById('resistencia').value);
    let p = parseFloat(document.getElementById('potencia').value);

    // Lógica simplificada de 2 datos
    if (v && i) { r = v / i; p = v * i; }
    else if (v && r) { i = v / r; p = (v ** 2) / r; }
    else if (i && r) { v = i * r; p = (i ** 2) * r; }
    else if (p && v) { i = p / v; r = (v ** 2) / p; }
    else if (p && i) { v = p / i; r = p / (i ** 2); }

    document.getElementById('resOhm').innerText = 
        `V: ${v.toFixed(2)}V | I: ${i.toFixed(2)}A | R: ${r.toFixed(2)}Ω | P: ${p.toFixed(2)}W`;
}

function obtenerValor() {
    const b1 = document.getElementById('b1').value.toLowerCase();
    const b2 = document.getElementById('b2').value.toLowerCase();
    const b3 = document.getElementById('b3').value.toLowerCase();

    try {
        const val = (datosColores[b1].valor * 10 + datosColores[b2].valor) * Math.pow(10, datosColores[b3].valor);
        document.getElementById('resVal').innerText = `Resultado: ${val} Ω`;
    } catch (e) {
        alert("Asegúrate de escribir colores válidos (ej: marron, rojo, naranja)");
    }
}

function obtenerColores() {
    const val = document.getElementById('valOhm').value;
    if (val.length < 2) return;

    const digito1 = val[0];
    const digito2 = val[1];
    const ceros = val.length - 2;

    const lista = Object.keys(datosColores);
    const c1 = lista.find(k => datosColores[k].valor == digito1);
    const c2 = lista.find(k => datosColores[k].valor == digito2);
    const c3 = lista.find(k => datosColores[k].valor == ceros);

    document.getElementById('resCol').innerText = `Colores: ${c1}, ${c2}, ${c3}`;
    
    // Bonus visual
    const visual = document.getElementById('visualBandas');
    visual.innerHTML = `
        <div class="banda" style="background:${datosColores[c1].hex}"></div>
        <div class="banda" style="background:${datosColores[c2].hex}"></div>
        <div class="banda" style="background:${datosColores[c3].hex}"></div>
        <div class="banda" style="background:gold"></div>
    `;
}
