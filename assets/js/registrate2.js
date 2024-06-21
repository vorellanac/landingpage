let users = []; // lista usuarios
let nextId = 1; // contador ID usuarios

function agregarUsuario(nombre, apellido, edad, mail, password, subscribe) {
    const newUser = {
        id: nextId++,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        mail: mail,
        password: password,
        subscribe: subscribe
    };
    users.push(newUser);
    mostrarUsuarios(); //enseñar usuarios añadidos a lista
    limpiarFormulario(); //limpiar formulario DOM
}

// Mostrar usuarios y crear tabla, recorrer uso el for each
function mostrarUsuarios() {
    const table = document.getElementById("usersList");
    // Si la lista es igual a 0 no mostrar la tabla. 
    if (users.length === 0) {
        table.innerHTML = ""; 
    } else {
        table.innerHTML = "";
        const header = table.createTHead();
        const headerRow = header.insertRow(0);
        headerRow.innerHTML = `
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>E-Mail</th>
            <th>Password</th>
            <th>Subscrito</th>
            <th>Acciones:</th>
        `;

        users.forEach(user => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.edad}</td>
                <td>${user.mail}</td>
                <td>${user.password}</td>
                <td>${user.subscribe ? 'Sí' : 'No'}</td>
                <td><button onclick="editarUsuario(${user.id})">Editar</button></td>
                <td><button onclick="eliminarUsuario(${user.id})">Eliminar</button></td>
            `;
        });
    }
}

// Funcion para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("password").value = "";
    document.getElementById("passwordRepeat").value = "";
    document.getElementById("subscribe").checked = false; // Al limpiar siempre dejar en false.
}

// Validar formulario
function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = parseInt(document.getElementById("edad").value);
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const passwordRepeat = document.getElementById("passwordRepeat").value;
    const subscribe = document.getElementById("subscribe").checked; // leer opción de usuario

    // Expresión regular para validar solamente texto
    const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/;

    // Expresión regular para validar el formato de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar que los campos sean válidos de acuerdo al tipo de campo.
    if (nombre.length < 3 || !regexTexto.test(nombre)) {
        alert("Por favor, ingresa un nombre válido con solo texto y mínimo 3 caracteres.");
    } else if (apellido.length < 2 || !regexTexto.test(apellido)) {
        alert("Por favor, ingresa un apellido válido con solo texto y mínimo 2 caracteres.");
    } else if (isNaN(edad) || edad < 18 || edad >= 99) {
        alert("Por favor, ingresa una edad válida entre 18 y 98.");
    } else if (!regexEmail.test(mail)) {
        alert("Por favor, ingresa un correo electrónico válido.");
    } else if (password.length < 6) {
        alert("Por favor, la contraseña debe tener al menos 6 caracteres.");
    } else if (password !== passwordRepeat) {
        alert("Por favor, verifica que las contraseñas coincidan.");
    } else {
        agregarUsuario(nombre, apellido, edad, mail, password, subscribe);
    }
}

// Funcion para editar el usuario
function editarUsuario(userId) {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        const newName = prompt("Introduce el nuevo Nombre:");
        users[userIndex].nombre = newName;
        const newApellido = prompt("Introduce el nuevo Apellido:");
        users[userIndex].apellido = newApellido;
        const newMail = prompt("Introduce el nuevo mail:");
        users[userIndex].mail = newMail;
        mostrarUsuarios(); // Ingresado los datos, enseñar usuarios
    } else {
        alert("Usuario no encontrado.");
    }
}

function eliminarUsuario(userId) {
    // Eliminar el ID seleccionado usando filter
    users = users.filter(user => user.id !== userId);
    alert("¡Usuario eliminado correctamente!");
    mostrarUsuarios();
}
