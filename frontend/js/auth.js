// frontend/js/auth.js - Actualizar las funciones de registro y login

// Función para cerrar sesión (usar en todos los archivos)
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  localStorage.removeItem('username');
  localStorage.removeItem('cart'); // Limpiar carrito también
  window.location.href = 'home.html';
}

// Configurar botones de logout en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
  // Configurar logout para todos los botones
  const logoutBtns = document.querySelectorAll('#logout-btn, #nav-logout');
  logoutBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
      });
    }
  });
});

// Register form
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const userData = {
      fullname: document.getElementById('fullname').value,
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      role: 'cliente'
    };
    
    try {
      console.log('Enviando datos de registro:', userData);
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const userData_response = await response.json();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', userData_response.role);
        localStorage.setItem('username', userData_response.username);
        
        alert('¡Registro exitoso!');
        window.location.href = 'cliente.html';
      } else {
        const error = await response.json();
        document.getElementById('error-message').textContent = error.message;
      }
    } catch (error) {
      console.error('Error en registro:', error);
      document.getElementById('error-message').textContent = 'Error de conexión. Intenta nuevamente.';
    }
  });
}

// Login form
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Verificación de admin hardcodeado
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('username', username);
      window.location.href = 'admin.html';
      return;
    }
    
    try {
      console.log('Intentando login con API...');
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('username', user.username);
        window.location.href = user.role === 'admin' ? 'admin.html' : 'cliente.html';
      } else {
        const error = await response.json();
        errorMessage.textContent = error.message;
      }
    } catch (error) {
      console.error('Error en login:', error);
      errorMessage.textContent = 'Error de conexión. Intenta nuevamente.';
    }
  });
}