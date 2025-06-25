document.addEventListener('DOMContentLoaded', function() {
    // Verificar que el usuario sea admin
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Cargar usuarios
    loadUsers();
    
    async function loadUsers() {
        const usersList = document.getElementById('users-list');
        const noUsersMessage = document.getElementById('no-users-message');
        
        try {
            // ✅ CAMBIAR: Cargar desde API en lugar de localStorage
            const response = await fetch('/api/users');
            
            if (response.ok) {
                const users = await response.json();
                
                // Añadir usuario admin si no está en la lista
                if (!users.some(u => u.username === 'admin')) {
                    users.unshift({
                        fullname: 'Administrador',
                        username: 'admin',
                        email: 'admin@cafearoma.com',
                        role: 'admin'
                    });
                }
                
                if (users.length === 0) {
                    usersList.innerHTML = '';
                    noUsersMessage.style.display = 'block';
                    return;
                }
                
                noUsersMessage.style.display = 'none';
                usersList.innerHTML = '';
                
                users.forEach(user => {
                    const row = document.createElement('tr');
                    const isMainAdmin = user.username === 'admin';
                    
                    row.innerHTML = `
                        <td>${user.fullname || '-'}</td>
                        <td>${user.username}</td>
                        <td>${user.email || '-'}</td>
                        <td>${user.role}</td>
                        <td>
                            ${isMainAdmin ? 
                              '<span class="disabled-btn">No eliminable</span>' : 
                              '<button class="action-btn delete-btn" data-username="' + user.username + '">Eliminar</button>'}
                        </td>
                    `;
                    
                    usersList.appendChild(row);
                });
                
                // Añadir eventos a los botones de eliminar
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const username = this.getAttribute('data-username');
                        deleteUser(username);
                    });
                });
            } else {
                console.error('Error al cargar usuarios:', response.status);
                noUsersMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            noUsersMessage.style.display = 'block';
        }
    }
    
    async function deleteUser(username) {
        if (confirm(`¿Estás seguro de eliminar al usuario "${username}"?`)) {
            try {
                // ✅ CAMBIAR: Eliminar via API en lugar de localStorage
                const response = await fetch(`/api/users/${username}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    alert('Usuario eliminado exitosamente');
                    loadUsers(); // Recargar la lista
                } else {
                    const error = await response.json();
                    alert('Error al eliminar usuario: ' + error.message);
                }
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                alert('Error de conexión al eliminar usuario');
            }
        }
    }
});