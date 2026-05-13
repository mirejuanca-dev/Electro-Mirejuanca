function calcularPotencia() {
    const v = document.getElementById('v_watt').value;
    const i = document.getElementById('i_watt').value;
    if(v && i) {
        const p = (v * i).toFixed(2);
        document.getElementById('watt_res').innerText = p + " Watts (W)";
    }
}

function calcularDivisor() {
    const vin = parseFloat(document.getElementById('v_in').value);
    const r1 = parseFloat(document.getElementById('r1_div').value);
    const r2 = parseFloat(document.getElementById('r2_div').value);
    if(vin && r1 && r2) {
        const vout = (vin * (r2 / (r1 + r2))).toFixed(3);
        document.getElementById('div_res').innerText = "Vout = " + vout + " V";
    }
}
