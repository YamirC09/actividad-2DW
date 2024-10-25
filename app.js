// Referencias a los elementos del DOM
const usersTableBody = document.querySelector('#usersTable tbody');
const userForm = document.getElementById('userForm');
const listUsersButton = document.getElementById('listUsers');
const clearUsersButton = document.getElementById('clearUsers'); // Nueva referencia

// Función para obtener usuarios del Local Storage o establecer un array vacío por defecto
function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Función para guardar usuarios en el Local Storage
function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// JSON inicial con 3 usuarios estáticos (agregados solo si no hay usuarios guardados)
let users = getUsersFromLocalStorage();
if (users.length === 0) {
    users = [
        {
            userId: "123456789",
            fullName: "Lionel Messi",
            email: "messi@example.com",
            phone: "1234567890",
            address: "Calle Falsa 123",
            age: 34,
            gender: "Masculino",
            notifications: true
        },
        {
            userId: "987654321",
            fullName: "Andrés Iniesta",
            email: "iniesta@example.com",
            phone: "9876543210",
            address: "Avenida Siempre Viva 456",
            age: 38,
            gender: "Masculino",
            notifications: false
        },
        {
            userId: "456123789",
            fullName: "Xavi Hernández",
            email: "xavi@example.com",
            phone: "4561237890",
            address: "Paseo de la Luna 789",
            age: 40,
            gender: "Masculino",
            notifications: true
        }
    ];
    saveUsersToLocalStorage(users);
}

// Función para validar si el ID ya existe
function isUserIdUnique(id) {
    return !users.some(user => user.userId === id);
}

// Función para agregar un usuario a la tabla
function addUserToTable(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.userId}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        <td>${user.notifications ? 'Sí' : 'No'}</td>
    `;
    usersTableBody.appendChild(row);
}

// Función para listar usuarios en la tabla
function listUsers() {
    usersTableBody.innerHTML = ''; // Limpiar la tabla
    users.forEach(user => addUserToTable(user));
    console.log(users)
}

// Evento para listar usuarios estáticos
listUsersButton.addEventListener('click', function () {
    listUsers();
    console.log('Usuarios listados');
});

// Evento para el formulario de registro
userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newUser = {
        userId: userForm.userId.value,
        fullName: userForm.fullName.value,
        email: userForm.email.value,
        phone: userForm.phone.value,
        address: userForm.address.value,
        age: parseInt(userForm.age.value),
        gender: userForm.gender.value,
        notifications: userForm.notifications.checked
    };

    // Validar ID único
    if (!isUserIdUnique(newUser.userId)) {
        alert("El ID ya existe. Por favor, ingrese un ID diferente.");
        return;
    }

    // Agregar el nuevo usuario al JSON y a la tabla
    users.push(newUser);
    saveUsersToLocalStorage(users); // Guardar en Local Storage
    addUserToTable(newUser);

    // Limpiar el formulario
    userForm.reset();
});

// Evento para limpiar la tabla de usuarios
clearUsersButton.addEventListener('click', function() {
    usersTableBody.innerHTML = ''; // Limpiar visualmente la tabla
    console.log('Tabla de usuarios limpiada');
});
