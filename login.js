// login.js

// Datos de usuario de ejemplo
const validEmail = "usuario@ejemplo.com";
const validPassword = "123456";

// Función de validación para verificar las credenciales
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtener los valores de los campos de entrada
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar si las credenciales son correctas
    if (email === validEmail && password === validPassword) {
        // Si las credenciales son correctas, redirigir al usuario
        window.location.href = "niveles.html"; // Cambiar por la página a la que desees redirigir
    } else {
        // Si las credenciales son incorrectas, mostrar mensaje de error
        document.getElementById('errorMessage').classList.remove('hidden');
    }
});
