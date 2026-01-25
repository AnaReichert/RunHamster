const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const ageInput = document.getElementById('age');
const genderSelect = document.getElementById('gender');
const activitySelect = document.getElementById('activityLevel');
const bmiResult = document.getElementById('bmiResult');
const calorieResult = document.getElementById('calorieResult');


function calculate() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const age = parseInt(ageInput.value);
    const gender = genderSelect.value;
    const activity = parseFloat(activitySelect.value);

    if (!weightInput.value || !heightInput.value || !ageInput.value || gender === '' || activity === 0) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const imc = weight / ((height / 100) ** 2);

    const faixasIMC = [
    { max: 18.5, label: 'Abaixo do peso', cor: '#ffcc00' },
    { max: 24.9, label: 'Peso Normal', cor: '#2ecc71' },
    { max: 29.9, label: 'Sobrepeso', cor: '#e67e22' },
    { max: 34.9, label: 'Obesidade Grau I', cor: '#d81b60' },
    { max: Infinity, label: 'Obesidade Severa', cor: '#c0392b' }
    ];

    const faixa = faixasIMC.find(f => imc <= f.max);

    let tmb;
    if (gender === 'male') {
        tmb = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        tmb = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    const dailyCalories = tmb * activity;
    bmiResult.style.color = faixa.cor;
    bmiResult.innerHTML = `IMC: ${imc.toFixed(2)} (${faixa.label})`;    
    calorieResult.innerHTML = `Gasto Diário: ${dailyCalories.toFixed(0)} kcal`;
}

document.querySelector('button').addEventListener('click', calculate);