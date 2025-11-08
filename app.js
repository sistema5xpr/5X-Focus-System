// --- CONFIGURACIÓN CRÍTICA DEL SISTEMA 5X ---
const ACCESS_CODE = "5XPRO2026";
const LOGIN_KEY = "5X_SYSTEM_ACTIVE";
const LANG_KEY = "5X_SYSTEM_LANG"; 

// Diccionario de Traducciones
const translations = {
    'es': {
        'system_title': '5X SYSTEM',
        'subtitle_login': 'Ingresa tu código de acceso privado',
        'placeholder_code': 'Escribe tu código único aquí',
        'btn_access': 'ACCEDER AL SISTEMA 5X',
        'title_dashboard': 'DASHBOARD 5X',
        'headerSubtitleFixed': 'Monitoreo Inteligente de Foco', // CORREGIDO
        'user_private': 'Usuario Privado',
        'btn_logout': 'Salir',
        'daily_focus_title': 'Registro de Foco Diario',
        'daily_focus_desc': 'Registra tu rendimiento al final del día. Recuerda que un foco diario es la suma total de tus ciclos completados.',
        'label_cycles': 'Ciclos Completados (25 min)',
        'hint_cycles': 'Un ciclo es un bloque de 25 minutos de trabajo sin interrupción.', // CORREGIDO
        'label_quality': 'Calidad del Foco (1-10)',
        'placeholder_quality': 'Ej: 8',
        'hint_quality': 'Tu autoevaluación sincera. ¿Qué tan profundo fue tu enfoque hoy?', // CORREGIDO
        'label_distraction': 'Mayor Distracción',
        'placeholder_distraction': 'Ej: TikTok, Ruido, Hambre',
        'hint_distraction': "Identificar el 'ladrón de foco' te permite eliminarlo mañana.", // CORREGIDO
        'btn_register': 'REGISTRAR DÍA',
        'metrics_title': 'Métricas Clave Acumuladas',
        'metrics_desc': 'Estas métricas muestran el valor real que has recuperado al reentrenar tu cerebro y evitar la distracción.',
        'label_total_cycles': 'CICLOS COMPLETADOS',
        'label_focus_minutes': 'MINUTOS DE FOCO NETO RECUPERADOS',
        'label_avg_score': 'PUNTUACIÓN PROMEDIO 5X',
        'hint_large': 'El Foco Neto Recuperado es el tiempo que tu mente usó en trabajo profundo en lugar de dopamina rápida.', // CORREGIDO
        'analysis_title': 'Diagnóstico Inteligente y Progreso',
        'analysis_desc': 'Analiza tu rendimiento a lo largo del tiempo. Recuerda: La consistencia es el indicador de progreso más importante.',
        'distraction_list_title': 'TOP 5 Distracciones (El Enemigo a Vencer)', // CORREGIDO
        'distraction_empty': 'Aún no hay datos...',
        'distraction_note': '💡 Al identificar tus 5 mayores distracciones, puedes programar recompensas específicas y eliminar el obstáculo antes de que aparezca.', // CORREGIDO
        'chart_title': 'Consistencia Diaria (Progreso en Tiempo Real)',
        'chart_label': 'Ciclos Completados',
        'alert_invalid': 'Por favor, ingresa Ciclos válidos (>=0), una Calidad entre 1 y 10, y tu Distracción principal.',
        'error_code': 'Código incorrecto. Verifica tu clave única de acceso.',
    },
    'en': {
        'system_title': '5X SYSTEM',
        'subtitle_login': 'Enter your private access code',
        'placeholder_code': 'Enter your unique code here',
        'btn_access': 'ACCESS 5X SYSTEM',
        'title_dashboard': '5X DASHBOARD',
        'headerSubtitleFixed': 'Smart Focus Monitoring', // CORREGIDO
        'user_private': 'Private User',
        'btn_logout': 'Log Out',
        'daily_focus_title': 'Daily Focus Log',
        'daily_focus_desc': 'Log your performance at the end of the day. A daily focus score is the total sum of your completed cycles.',
        'label_cycles': 'Completed Cycles (25 min)',
        'hint_cycles': 'One cycle is a 25-minute block of uninterrupted deep work.', // CORREGIDO
        'label_quality': 'Focus Quality (1-10)',
        'placeholder_quality': 'Ex: 8',
        'hint_quality': 'Your honest self-assessment. How deep was your focus today?', // CORREGIDO
        'label_distraction': 'Main Distraction',
        'placeholder_distraction': 'Ex: TikTok, Noise, Hunger',
        'hint_distraction': "Identifying the 'focus thief' allows you to eliminate it tomorrow.", // CORREGIDO
        'btn_register': 'LOG DAY',
        'metrics_title': 'Accumulated Key Metrics',
        'metrics_desc': 'These metrics show the true value you have recovered by re-training your brain and avoiding distraction.',
        'label_total_cycles': 'COMPLETED CYCLES',
        'label_focus_minutes': 'NET FOCUS MINUTES RECOVERED',
        'label_avg_score': '5X AVERAGE SCORE',
        'hint_large': 'Net Focus Recovered is the time your mind used on deep work instead of quick dopamine hits.', // CORREGIDO
        'analysis_title': 'Smart Diagnosis and Progress',
        'analysis_desc': 'Analyze your performance over time. Remember: Consistency is the most important indicator of progress.',
        'distraction_list_title': 'TOP 5 Distractions (The Enemy to Beat)', // CORREGIDO
        'distraction_empty': 'No data yet...',
        'distraction_note': '💡 By identifying your top 5 distractions, you can program specific rewards and eliminate the obstacle before it appears.', // CORREGIDO
        'chart_title': 'Daily Consistency (Real-Time Progress)',
        'chart_label': 'Completed Cycles',
        'alert_invalid': 'Please enter valid Cycles (>=0), a Quality between 1 and 10, and your Main Distraction.',
        'error_code': 'Incorrect code. Please verify your unique access key.',
    }
};

// FUNCIÓN DE TRADUCCIÓN GLOBAL
function translatePage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Guarda el idioma para persistencia
    localStorage.setItem(LANG_KEY, lang);

    // Traducciones de index.html
    if (document.body.classList.contains('login-page')) {
        document.querySelector('.logo-title').textContent = t.system_title;
        document.querySelector('.subtitle').textContent = t.subtitle_login;
        document.getElementById('accessCode').placeholder = t.placeholder_code;
        document.querySelector('.login-box button').textContent = t.btn_access;
    }

    // Traducciones de dashboard.html
    if (document.body.classList.contains('dashboard-page')) {
        document.querySelector('.logo-title').textContent = t.title_dashboard;
        // CORRECCIÓN: Usamos el nuevo ID para el subtítulo fijo
        document.getElementById('headerSubtitleFixed').textContent = t.headerSubtitleFixed; 
        document.getElementById('welcomeUser').textContent = t.user_private;
        document.getElementById('btn_logout').textContent = t.btn_logout;

        // Sección 1: Registro (Todos los nuevos IDs y elementos)
        document.getElementById('daily_focus_title').textContent = t.daily_focus_title;
        document.getElementById('daily_focus_desc').textContent = t.daily_focus_desc;
        document.getElementById('label_cycles').textContent = t.label_cycles;
        document.getElementById('hint_cycles').textContent = t.hint_cycles;
        document.getElementById('label_quality').textContent = t.label_quality;
        document.getElementById('inputQuality').placeholder = t.placeholder_quality;
        document.getElementById('hint_quality').textContent = t.hint_quality;
        document.getElementById('label_distraction').textContent = t.label_distraction;
        document.getElementById('inputDistraction').placeholder = t.placeholder_distraction;
        document.getElementById('hint_distraction').textContent = t.hint_distraction;
        document.getElementById('btn_register').textContent = t.btn_register;

        // Sección 2: Métricas (Todos los nuevos IDs)
        document.getElementById('metrics_title').textContent = t.metrics_title;
        document.getElementById('metrics_desc').textContent = t.metrics_desc;
        document.getElementById('label_total_cycles').textContent = t.label_total_cycles;
        document.getElementById('label_focus_minutes').textContent = t.label_focus_minutes;
        document.getElementById('label_avg_score').textContent = t.label_avg_score;
        document.getElementById('hint_large').textContent = t.hint_large;

        // Sección 3: Análisis (Todos los nuevos IDs)
        document.getElementById('analysis_title').textContent = t.analysis_title;
        document.getElementById('analysis_desc').textContent = t.analysis_desc;
        document.getElementById('distraction_list_title').textContent = t.distraction_list_title;
        document.getElementById('distraction_note').textContent = t.distraction_note;
        
        // Recarga las métricas y el gráfico con el nuevo idioma
        loadMetrics(); 
    }
}

// Inicializa el idioma al cargar la página
function initializeLanguage() {
    let lang = localStorage.getItem(LANG_KEY) || 'es';
    translatePage(lang);

    // Establece el botón de idioma correcto
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        if (lang === 'es') {
            langToggle.textContent = 'English';
        } else {
            langToggle.textContent = 'Español';
        }
    }
}

// Función que cambia el idioma y actualiza el botón
function toggleLanguage() {
    let currentLang = localStorage.getItem(LANG_KEY) || 'es';
    const newLang = (currentLang === 'es') ? 'en' : 'es';
    
    // Cambia el texto del botón y traduce
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = (newLang === 'es') ? 'English' : 'Español';
    }

    translatePage(newLang);
}

// --- FUNCIONES DE ACCESO ---

function validateCode() {
    const enteredCode = document.getElementById('accessCode').value.trim().toUpperCase();
    const messageElement = document.getElementById('message');
    const lang = localStorage.getItem(LANG_KEY) || 'es';
    const t = translations[lang];

    if (enteredCode === ACCESS_CODE) {
        localStorage.setItem(LOGIN_KEY, 'true');
        window.location.href = 'dashboard.html';
    } else {
        messageElement.textContent = t.error_code;
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    }
}

function checkLogin() {
    initializeLanguage(); // Inicializa el idioma antes de cargar las métricas

    if (window.location.pathname.includes('dashboard.html')) {
        if (localStorage.getItem(LOGIN_KEY) !== 'true') {
            window.location.href = 'index.html';
        } else {
            // El loadMetrics() se ejecuta dentro de initializeLanguage()
        }
    } else if (window.location.pathname.includes('index.html')) {
        if (localStorage.getItem(LOGIN_KEY) === 'true') {
            window.location.href = 'dashboard.html';
        }
    }
}

function logout() {
    localStorage.removeItem(LOGIN_KEY);
    window.location.href = 'index.html';
}

window.onload = checkLogin;


// --- FUNCIONES DE DATOS Y MÉTRICAS ---

function calculateAverageFocus(data) {
    if (data.length === 0) return 0;
    let totalQuality = 0;
    data.forEach(day => {
        totalQuality += parseInt(day.quality, 10) || 0; 
    });
    const average = totalQuality / data.length;
    return average.toFixed(1);
}

function savePomodoro() {
    const cycles = parseInt(document.getElementById('inputCycles').value);
    const qualityInput = document.getElementById('inputQuality').value;
    const quality = parseInt(qualityInput);
    const distraction = document.getElementById('inputDistraction').value.trim();
    const lang = localStorage.getItem(LANG_KEY) || 'es';
    const t = translations[lang];

    if (cycles < 0 || qualityInput === '' || quality < 1 || quality > 10 || distraction === '') {
        alert(t.alert_invalid);
        return;
    }
    
    const dailyData = {
        date: new Date().toLocaleDateString(lang),
        cycles: cycles,
        quality: quality,
        distraction: distraction
    };
    
    let focusData = JSON.parse(localStorage.getItem('focusData5X') || '[]');
    focusData.push(dailyData);
    localStorage.setItem('focusData5X', JSON.stringify(focusData));

    loadMetrics();
    document.getElementById('inputCycles').value = 0;
    document.getElementById('inputQuality').value = ''; 
    document.getElementById('inputDistraction').value = '';
}

function countDistractions(data) {
    const distractionMap = {};
    data.forEach(day => {
        const key = day.distraction.toUpperCase();
        distractionMap[key] = (distractionMap[key] || 0) + 1;
    });

    return Object.entries(distractionMap)
        .sort(([, a], [, b]) => b - a);
}

function loadMetrics() {
    let focusData = JSON.parse(localStorage.getItem('focusData5X') || '[]');
    const lang = localStorage.getItem(LANG_KEY) || 'es';
    const t = translations[lang];

    let totalCycles = 0;
    let totalFocusMinutes = 0;

    focusData.forEach(day => {
        totalCycles += day.cycles;
        totalFocusMinutes += day.cycles * 25; 
    });

    // Mostrar Métricas Clave
    document.getElementById('totalCycles').textContent = totalCycles;
    document.getElementById('totalFocusMinutes').textContent = totalFocusMinutes;
    const averageFocusScore = calculateAverageFocus(focusData);
    document.getElementById('averageFocus').textContent = averageFocusScore;

    // Mostrar Distracciones
    const topDistractions = countDistractions(focusData).slice(0, 5); 
    const listElement = document.getElementById('distractionList');
    listElement.innerHTML = ''; 

    if (topDistractions.length === 0) {
        listElement.innerHTML = `<li>${t.distraction_empty}</li>`;
    } else {
        topDistractions.forEach(([distraction, count]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${distraction} (${count} ${lang === 'es' ? 'días' : 'days'})`; 
            listElement.appendChild(listItem);
        });
    }

    // Renderizar el gráfico (Se llama SIEMPRE, corrigiendo el error 5)
    renderFocusChart(focusData);
}

let focusChart = null; 

function renderFocusChart(data) {
    const lang = localStorage.getItem(LANG_KEY) || 'es';
    const t = translations[lang];
    // CORRECCIÓN: Si no hay datos, muestra un punto para evitar el error de Chart.js
    const dates = data.length > 0 ? data.map(day => day.date) : ['Hoy']; 
    const cycles = data.length > 0 ? data.map(day => day.cycles) : [0];

    if (focusChart) {
        focusChart.destroy();
    }

    const ctx = document.getElementById('focusChart').getContext('2d');
    focusChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: t.chart_label,
                data: cycles,
                borderColor: '#f4f4f4',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                tension: 0.4,
                pointBackgroundColor: '#FF0000',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, grid: { color: '#333' }, ticks: { color: '#f4f4f4' } },
                x: { grid: { color: '#333' }, ticks: { color: '#f4f4f4' } }
            },
            plugins: {
                legend: { display: false },
                title: { display: true, text: t.chart_title, color: '#f4f4f4' }
            }
        }
    });
}
