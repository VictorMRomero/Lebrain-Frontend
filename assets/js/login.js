const usuario = document.getElementById("usuario");


usuario.addEventListener("submit", (event) => {
    event.preventDefault();
    const valorCorreo = document.querySelector('.correo').value;
    const valorPassword = document.querySelector('#pass1').value;
    let usuario = {correo: valorCorreo, password: valorPassword}
    let usuarioJSON = JSON.stringify(usuario);
    
    fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: usuarioJSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json(); // Aquí se obtiene el objeto JSON de la respuesta
    })
    .then(data => {
        console.log(data); // Aquí se pueden ver los datos del objeto JSON

        // Aquí puedes hacer algo con el token y el objeto usuario, por ejemplo, guardarlos en local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));

        window.location.replace("inicio.html"); // especifica la ruta de la página a la que deseas redirigir
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
        // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
        alert('Correo o contraseña incorrectos, intenta de nuevo.');
    })





   
    
})


