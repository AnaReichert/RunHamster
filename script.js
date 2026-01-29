const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const ageInput = document.getElementById('age');
const genderSelect = document.getElementById('gender');
const activitySelect = document.getElementById('activityLevel');
const bmiResult = document.getElementById('bmiResult');
const calorieResult = document.getElementById('calorieResult');

const themeToggle = document.querySelector('#themeToggle');
const body = document.body;

// Lógica do Modo Noturno (Persistência com LocalStorage)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Função Principal de Cálculo
function calculate() {
    // Captura os valores no momento do clique
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const age = parseInt(ageInput.value);
    const gender = genderSelect.value;
    const activity = parseFloat(activitySelect.value);

    // verifica se são números válidos e se os selects foram marcados
    if (!weight || !height || !age || !gender || isNaN(activity)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Cálculo do IMC
    const imc = weight / ((height / 100) ** 2);

    const faixasIMC = [
        { max: 18.5, label: 'Abaixo do peso', cor: '#ffcc00' },
        { max: 24.9, label: 'Peso Normal', cor: '#2ecc71' },
        { max: 29.9, label: 'Sobrepeso', cor: '#e67e22' },
        { max: 34.9, label: 'Obesidade Grau I', cor: '#d81b60' },
        { max: Infinity, label: 'Obesidade Severa', cor: '#c0392b' }
    ];

    const faixa = faixasIMC.find(f => imc <= f.max);

    // Cálculo da TMB 
    let tmb;
    if (gender === 'male') {
        tmb = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        tmb = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    const dailyCalories = tmb * activity;

    // Exibição dos resultados na tela
    bmiResult.style.color = faixa.cor;
    bmiResult.innerHTML = `IMC: ${imc.toFixed(2)} (${faixa.label})`;    
    
    // Mostra o gasto diário
    calorieResult.innerHTML = `Gasto Diário: ${dailyCalories.toFixed(0)} kcal <br>
                               <small style="font-size: 0.8rem; color: #666;"></small>`;
}

//  Evento de Clique no Botão de Calcular
document.getElementById('calculateBtn').addEventListener('click', calculate);