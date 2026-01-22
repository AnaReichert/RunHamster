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

    const imc = weight / ((height / 100) ** 2);
    
    let tmb;
    if (gender === 'male') {
        tmb = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        tmb = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    const dailyCalories = tmb * activity;


    bmiResult.textContent = `IMC: ${imc.toFixed(2)}`;
    calorieResult.innerHTML = `Gasto Diário: ${dailyCalories.toFixed(0)} kcal`;
}

document.querySelector('button').addEventListener('click', calculate);