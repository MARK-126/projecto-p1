const API_URL = 'http://localhost:3000/usuarios';

const usuariosLista = document.getElementById('usuarios-lista');
const usuarioForm = document.getElementById('usuario-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const usuarioIdInput = document.getElementById('usuario-id');
const firstNameInput = document.getElementById('first_name');
const lasNameInput = document.getElementById('las_name');
const emailInput = document.getElementById('email');
const dniInput = document.getElementById('dni');

let editMode = false;

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
});

usuarioForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = {
        first_name: firstNameInput.value.trim(),
        las_name: lasNameInput.value.trim(),
        email: emailInput.value.trim(),
        dni: dniInput.value.trim()
    };

    if (editMode) {
        await actualizarUsuario(usuarioIdInput.value, usuario);
    } else {
        await crearUsuario(usuario);
    }
});

cancelBtn.addEventListener('click', () => {
    resetForm();
});

async function cargarUsuarios() {
    try {
        usuariosLista.innerHTML = '<p class="loading">Cargando usuarios...</p>';

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const usuarios = await response.json();

        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        usuariosLista.innerHTML = '<p class="error">Error al cargar usuarios. Por favor, intenta de nuevo.</p>';
    }
}

async function crearUsuario(usuario) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        await cargarUsuarios();
        resetForm();
        mostrarMensaje('Usuario creado exitosamente', 'success');
    } catch (error) {
        console.error('Error al crear usuario:', error);
        mostrarMensaje('Error al crear usuario', 'error');
    }
}

async function actualizarUsuario(id, usuario) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        await cargarUsuarios();
        resetForm();
        mostrarMensaje('Usuario actualizado exitosamente', 'success');
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        mostrarMensaje('Error al actualizar usuario', 'error');
    }
}

async function eliminarUsuario(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        await cargarUsuarios();
        mostrarMensaje('Usuario eliminado exitosamente', 'success');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        mostrarMensaje('Error al eliminar usuario', 'error');
    }
}

function mostrarUsuarios(usuarios) {
    if (usuarios.length === 0) {
        usuariosLista.innerHTML = '<p class="empty">No hay usuarios registrados</p>';
        return;
    }

    const html = usuarios.map(usuario => {
        const firstName = usuario.first_name || '';
        const lasName = usuario.las_name || '';
        const email = usuario.email || '';
        const dni = usuario.dni || '';

        return `
        <div class="usuario-card" data-id="${usuario.id}">
            <div class="usuario-info">
                <h3>${firstName} ${lasName}</h3>
                <p class="usuario-email">${email}</p>
                <p class="usuario-dni">DNI: ${dni}</p>
            </div>
            <div class="usuario-actions">
                <button class="btn btn-edit" onclick="editarUsuario(${usuario.id}, '${firstName}', '${lasName}', '${email}', '${dni}')">
                    Editar
                </button>
                <button class="btn btn-delete" onclick="eliminarUsuario(${usuario.id})">
                    Eliminar
                </button>
            </div>
        </div>
    `;
    }).join('');

    usuariosLista.innerHTML = html;
}

function editarUsuario(id, firstName, lasName, email, dni) {
    editMode = true;
    usuarioIdInput.value = id;
    firstNameInput.value = firstName;
    lasNameInput.value = lasName;
    emailInput.value = email;
    dniInput.value = dni;

    formTitle.textContent = 'Editar Usuario';
    submitBtn.textContent = 'Actualizar Usuario';
    cancelBtn.style.display = 'inline-block';

    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    editMode = false;
    usuarioIdInput.value = '';
    firstNameInput.value = '';
    lasNameInput.value = '';
    emailInput.value = '';
    dniInput.value = '';

    formTitle.textContent = 'Crear Nuevo Usuario';
    submitBtn.textContent = 'Crear Usuario';
    cancelBtn.style.display = 'none';
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje ${tipo}`;
    mensaje.textContent = texto;

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;
