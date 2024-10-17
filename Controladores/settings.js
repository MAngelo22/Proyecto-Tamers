// Al cargar la página, obtener los valores guardados y aplicarlos a los campos
window.onload = function() {
    // Obtener los valores de localStorage
    const savedWorkTime = localStorage.getItem('workTime');
    const savedRestTime = localStorage.getItem('restTime');
    const savedSoundUrl = localStorage.getItem('soundUrl');

    // Aplicar los valores guardados (si existen) a los campos del formulario
    if (savedWorkTime) {
        document.getElementById('workTime').value = savedWorkTime;
    }
    
    if (savedRestTime) {
        document.getElementById('restTime').value = savedRestTime;
    }

    if (savedSoundUrl) {
        document.getElementById('soundSelect').value = savedSoundUrl;
    }
};

// Guardar las configuraciones cuando se haga clic en el botón "Guardar Configuración"
document.getElementById('saveSettings').addEventListener('click', () => {
    const workTime = document.getElementById('workTime').value;
    const restTime = document.getElementById('restTime').value;
    const soundUrl = document.getElementById('soundSelect').value; // Obtener valor del select

    // Guardar los valores en localStorage
    localStorage.setItem('workTime', workTime);
    localStorage.setItem('restTime', restTime);
    localStorage.setItem('soundUrl', soundUrl);

    alert('¡Configuraciones guardadas!');
});
