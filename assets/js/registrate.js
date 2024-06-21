let users = []; //lista usuarios
let nextId = 1; //contador ID usuarios

function agregarUsuario(nombre, apellido, edad, mail, password,subscribe) {
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
        mostrarUsuarios();
        limpiarFormulario();
    }

//mostrar. crear tabla y recorrer uso del for each
function mostrarUsuarios() {
    const table = document.getElementById("usersList");
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
    //Funcion para limpiar el formulario
    function limpiarFormulario() {
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("mail").value = "";
        document.getElementById("password").value = "";
        document.getElementById("passwordRepeat").value = "";        
        document.getElementById("subscribe").checked = false; //al limpiar siempre dejar en false.
    }

    //validar formulario
    function validarFormulario() {
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const edad = parseInt(document.getElementById("edad").value);
        const mail = document.getElementById("mail").value;
        const password = document.getElementById("password").value;
        const passwordRepeat = document.getElementById("passwordRepeat").value;
        const subscribe = document.getElementById("subscribe").checked; //leer opción de usuario
        
        //validar datos operador AND, necesita de todos los valores para proceder. 
        if (nombre && apellido && edad && mail && password && passwordRepeat) {
            // validar que las claves sean iguales, tengan minimo 6 caracteres y valida edad sobre o igual 18 y menor de 99
            if (password === passwordRepeat && password.length >= 6 && edad >= 18 && edad < 99) {
                agregarUsuario(nombre, apellido, edad, mail, password, subscribe);
            } else {
                alert("Por favor, verifica que las contraseñas coincidan, tengan al menos 6 caracteres y la edad esté dentro del rango permitido.");
            }
        } else {
            alert("Por favor, completa todos los campos del formulario.");
        }
    }
    //funcion para editar el usuario, 
    function editarUsuario(userId) {
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {        
            const newName = prompt("Introduce el nuevo Nombre:");
            users[userIndex].nombre = newName;        
            const newApellido = prompt("Introduce el nuevo Apellido:");
            users[userIndex].apellido = newApellido;        
            const newMail = prompt("Introduce el nuevo mail:");
            users[userIndex].mail = newMail;        
        mostrarUsuarios(); //Ingresado los datos, enseñar usuarios
        } else {
            alert("Usuario no encontrado.");
        }
    }

    function eliminarUsuario(userId) {
        //eliminar el ID seleccionado filter
        users = users.filter(user => user.id !== userId);
        alert("¡Usuario eliminado correctamente!");
        mostrarUsuarios();
    }
