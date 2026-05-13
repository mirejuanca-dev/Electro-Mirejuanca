// Datos integrados directamente para evitar errores de lectura de archivos
const coloresRef = {
    "negro": {"valor": 0, "hex": "#000000", "multiplicador": 1},
    "marron": {"valor": 1, "hex": "#8B4513", "multiplicador": 10},
    "rojo": {"valor": 2, "hex": "#FF0000", "multiplicador": 100},
    "naranja": {"valor": 3, "hex": "#FFA500", "multiplicador": 1000},
    "amarillo": {"valor": 4, "hex": "#FFFF00", "multiplicador": 10000},
    "verde": {"valor": 5, "hex": "#008000", "multiplicador": 100000},
    "azul": {"valor": 6, "hex": "#0000FF", "multiplicador": 1000000},
    "violeta": {"valor": 7, "hex": "#EE82EE", "multiplicador": 10000000},
    "gris": {"valor": 8, "hex": "#808080", "multiplicador": 100000000},
    "blanco": {"valor": 9, "hex": "#FFFFFF", "multiplicador": 1000000000}
};

// Función para mostrar secciones (Arregla el problema de los clics)
function showSection(id) {
    const sections = ['home', 'ohm', 'colores-a-valor', 'valor-a-colores'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = 'none'; // Usamos style.display para asegurar compatibilidad
    });
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
}

// Poblar los selects al cargar la página
window.onload = () => {
    const selects = ['band1', 'band2', 'band3'];
    const nombres = Object.keys(coloresRef);
    selects.forEach(s_id => {
        const el = document.getElementById(s_id);
        if (el) {
            nombres.forEach(col => {
                let opt = document.createElement('option');
                opt.value = col;
                opt.textContent = col.toUpperCase();
                el.appendChild(opt);
            });
        }
    });
};

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

    const resBox = document.getElementById('ohm_results');
    resBox.classList.remove('hidden');
    document.getElementById('res_text').innerHTML = 
        `V: ${v.toFixed(2)}V | I: ${i.toFixed(2)}A<br>R: ${r.toFixed(2)}Ω | P: ${p.toFixed(2)}W`;
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
    if (!val || val < 10) return alert("Mínimo 10 Ohmios");
    
    let sVal = Math.floor(val).toString();
    let d1 = parseInt(sVal[0]);
    let d2 = parseInt(sVal[1]);
    let ceros = sVal.length - 2;

    const lista = Object.keys(coloresRef);
    const c1 = lista.find(k => coloresRef[k].valor === d1);
    const c2 = lista.find(k => coloresRef[k].valor === d2);
    const c3 = lista.find(k => coloresRef[k].valor === ceros);

    if (!c1 || !c2 || !c3) return alert("Valor no soportado en 4 bandas");

    document.getElementById('v_band1').style.backgroundColor = coloresRef[c1].hex;
    document.getElementById('v_band2').style.backgroundColor = coloresRef[c2].hex;
    document.getElementById('v_band3').style.backgroundColor = coloresRef[c3].hex;
}
