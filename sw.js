let coloresRef = {};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('colores.json');
        coloresRef = await res.json();
        poblarSelects();
    } catch (e) {
        console.error("Error al cargar el archivo colores.json");
    }
});

function showSection(id) {
    ['home', 'ohm', 'colores-a-valor', 'valor-a-colores'].forEach(s => {
        document.getElementById(s).classList.add('hidden-section');
    });
    document.getElementById(id).classList.remove('hidden-section');
}

function poblarSelects() {
    const selects = ['band1', 'band2', 'band3'];
    const nombres = Object.keys(coloresRef);
    selects.forEach(s_id => {
        const el = document.getElementById(s_id);
        nombres.forEach(col => {
            let opt = document.createElement('option');
            opt.value = col;
            opt.textContent = col.toUpperCase();
            el.appendChild(opt);
        });
    });
}

function calcOhm() {
    let v = parseFloat(document.getElementById('v_in').value);
    let i = parseFloat(document.getElementById('i_in').value);
    let r = parseFloat(document.getElementById('r_in').value);
    let p = parseFloat(document.getElementById('p_in').value);

    if (v && i) { r = v/i; p = v*i; }
    else if (v && r) { i = v/r; p = (v**2)/r; }
    else if (i && r) { v = i*r; p = (i**2)*r; }
    else if (p && v) { i = p/v; r = (v**2)/p; }
    else if (p && i) { v = p/i; r = p/(i**2); }
    else if (p && r) { v = Math.sqrt(p*r); i = Math.sqrt(p/r); }

    document.getElementById('ohm_results').classList.remove('hidden');
    document.getElementById('res_text').innerHTML = 
        `Voltaje: ${v.toFixed(2)}V | Corriente: ${i.toFixed(2)}A<br>Resistencia: ${r.toFixed(2)}Ω | Potencia: ${p.toFixed(2)}W`;
}

function calcValFromCol() {
    const b1 = document.getElementById('band1').value;
    const b2 = document.getElementById('band2').value;
    const b3 = document.getElementById('band3').value;
    const total = ((coloresRef[b1].valor * 10) + coloresRef[b2].valor) * coloresRef[b3].multiplicador;
    document.getElementById('val_res').textContent = total >= 1000 ? (total/1000) + " kΩ" : total + " Ω";
}

function calcColFromVal() {
    let val = document.getElementById('ohm_input').value;
    if (val < 10) return alert("Mínimo 10 Ohmios");
    let sVal = val.toString();
    let d1 = parseInt(sVal[0]);
    let d2 = parseInt(sVal[1]);
    let ceros = sVal.length - 2;
    const lista = Object.keys(coloresRef);
    const c1 = lista.find(k => coloresRef[k].valor === d1);
    const c2 = lista.find(k => coloresRef[k].valor === d2);
    const c3 = lista.find(k => coloresRef[k].valor === ceros);

    document.getElementById('v_band1').style.backgroundColor = coloresRef[c1].hex;
    document.getElementById('v_band2').style.backgroundColor = coloresRef[c2].hex;
    document.getElementById('v_band3').style.backgroundColor = coloresRef[c3].hex;
}
