// --- CONFIGURACIÓN CRÍTICA DEL SISTEMA 5X ---
const ACCESS_CODE = "5XPRO2026"; // Código de acceso único para tu cliente
const LOGIN_KEY = "5X_SYSTEM_ACTIVE"; // Llave para localStorage (no cambiar)

// --- FUNCIONES DE ACCESO (index.html) ---

function validateCode() {
    const enteredCode = document.getElementById('accessCode').value.trim().toUpperCase();
    const messageElement = document.getElementById('message');

    if (enteredCode === ACCESS_CODE) {
        // Acceso concedido
        localStorage.setItem(LOGIN_KEY, 'true');
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Acceso denegado
        messageElement.textContent = 'Código incorrecto. Verifica tu clave única de acceso.';
        // Clear the message after 3 seconds
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    }
}

function checkLogin() {
    // Si estamos en dashboard.html, verificamos la clave
    if (window.location.pathname.includes('dashboard.html')) {
        if (localStorage.getItem(LOGIN_KEY) !== 'true') {
            // Si no está logeado, lo mandamos de vuelta al login
            window.location.href = 'index.html';
        } else {
            // Si está logeado, cargamos todas sus métricas
            loadMetrics();
        }
    } 
    // Si estamos en index.html y ya está logeado, redirigimos al dashboard
    else if (window.location.pathname.includes('index.html')) {
        if (localStorage.getItem(LOGIN_KEY) === 'true') {
            window.location.href = 'dashboard.html';
        }
    }
}

// FUNCIÓN CORREGIDA: SOLO BORRA LA SESIÓN DE LOGIN, NO EL PROGRESO
function logout() {
    // Solo borra la clave de login (LOGIN_KEY). Mantenemos focusData5X para que el progreso persista.
    localStorage.removeItem(LOGIN_KEY);
    window.location.href = 'index.html';
}

// Llamamos a checkLogin al cargar la página
window.onload = checkLogin;


// --- FUNCIONES DE DATOS Y MÉTRICAS (dashboard.html) ---

// NUEVA FUNCIÓN: Calcula el promedio de la calidad del foco (1-10)
function calculateAverageFocus(data) {
    if (data.length === 0) return 0;

    let totalQuality = 0;
    // Sumamos todos los valores de 'quality' guardados
    data.forEach(day => {
        // Aseguramos que el valor sea un número antes de sumar
        totalQuality += parseInt(day.quality, 10) || 0; 
    });

    // Calculamos el promedio y lo redondeamos a un decimal
    const average = totalQuality / data.length;
    return average.toFixed(1);
}

// FUNCIÓN MODIFICADA: Guardar el registro diario (incluye Quality)
function savePomodoro() {
    const cycles = parseInt(document.getElementById('inputCycles').value);
    const qualityInput = document.getElementById('inputQuality').value; // Captura como string
    const quality = parseInt(qualityInput); // Intenta parsear a número
    const distraction = document.getElementById('inputDistraction').value.trim();

    // Validación extendida (Aseguramos que qualityInput no esté vacío antes de validar el rango)
    if (cycles < 0 || qualityInput === '' || quality < 1 || quality > 10 || distraction === '') {
        alert('Por favor, ingresa Ciclos válidos (>=0), una Calidad entre 1 y 10, y tu Distracción principal.');
        return;
    }
    
    // Objeto del día a guardar
    const dailyData = {
        date: new Date().toLocaleDateString(),
        cycles: cycles,
        quality: quality, // GUARDAMOS LA CALIDAD
        distraction: distraction
    };
    
    // Lógica para guardar en localStorage
    let focusData = JSON.parse(localStorage.getItem('focusData5X') || '[]');
    focusData.push(dailyData);
    localStorage.setItem('focusData5X', JSON.stringify(focusData));

    // Recargar métricas y limpiar inputs
    loadMetrics();
    document.getElementById('inputCycles').value = 0;
    document.getElementById('inputQuality').value = ''; // Limpiamos a vacío
    document.getElementById('inputDistraction').value = '';
}

// Función para contar las distracciones
function countDistractions(data) {
    const distractionMap = {};
    data.forEach(day => {
        const key = day.distraction.toUpperCase();
        distractionMap[key] = (distractionMap[key] || 0) + 1;
    });

    // Convierte el mapa a un array de pares [distracción, conteo] y lo ordena
    return Object.entries(distractionMap)
        .sort(([, a], [, b]) => b - a);
}

// FUNCIÓN MODIFICADA: Cargar y mostrar todas las métricas
function loadMetrics() {
    let focusData = JSON.parse(localStorage.getItem('focusData5X') || '[]');

    let totalCycles = 0;
    let totalFocusMinutes = 0;

    focusData.forEach(day => {
        totalCycles += day.cycles;
        // Asume 25 minutos por ciclo
        totalFocusMinutes += day.cycles * 25; 
        // No necesitamos la calidad aquí, solo en calculateAverageFocus
    });

    // Mostrar Métricas Clave
    document.getElementById('totalCycles').textContent = totalCycles;
    document.getElementById('totalFocusMinutes').textContent = totalFocusMinutes;
    
    // MOSTRAR LA PUNTUACIÓN PROMEDIO 5X
    const averageFocusScore = calculateAverageFocus(focusData);
    document.getElementById('averageFocus').textContent = averageFocusScore;

    // Mostrar Distracciones
    const topDistractions = countDistractions(focusData).slice(0, 5); // Tomamos el TOP 5
    const listElement = document.getElementById('distractionList');
    listElement.innerHTML = ''; 

    if (topDistractions.length === 0) {
        listElement.innerHTML = '<li>Comienza a registrar tu primer día de foco.</li>';
    } else {
        topDistractions.forEach(([distraction, count]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${distraction} (${count} días)`;
            listElement.appendChild(listItem);
        });
    }

    // Renderizar el gráfico
    renderFocusChart(focusData);
}

// --- FUNCIONES DE GRÁFICO ---

let focusChart = null; // Variable global para el gráfico

function renderFocusChart(data) {
    const dates = data.map(day => day.date);
    const cycles = data.map(day => day.cycles);

    if (focusChart) {
        focusChart.destroy(); // Destruye la instancia anterior si existe
    }

    const ctx = document.getElementById('focusChart').getContext('2d');
    focusChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Ciclos Completados',
                data: cycles,
                // Colores para alto contraste (Rojo de Alerta y Blanco)
                borderColor: '#f4f4f4', // Color de la línea (Blanco para resaltar)
                backgroundColor: 'rgba(255, 0, 0, 0.2)', // Relleno sutil Rojo
                tension: 0.4,
                pointBackgroundColor: '#FF0000', // Puntos Rojos
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    // Estilos de rejilla y texto en blanco/oscuro
                    grid: { color: '#333' }, 
                    ticks: { color: '#f4f4f4' } 
                },
                x: {
                    // Estilos de rejilla y texto en blanco/oscuro
                    grid: { color: '#333' },
                    ticks: { color: '#f4f4f4' } 
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Consistencia Diaria (Progreso en Tiempo Real)',
                    color: '#f4f4f4' // Título del gráfico en blanco
                }
            }
        }
    });
}
