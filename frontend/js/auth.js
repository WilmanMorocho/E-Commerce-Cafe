// frontend/js/auth.js - Actualizar las funciones de registro y login
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
      const user = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!user.ok) {
        const error = await user.json();
        throw new Error(error.message);
      }
      
      const userData_response = await user.json();
      
      // Guardar en localStorage y redirigir
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', userData_response.role);
      localStorage.setItem('username', userData_response.username);
      
      alert('¡Registro exitoso!');
      window.location.href = 'cliente.html';
    } catch (error) {
      console.error('Error en registro:', error);
      document.getElementById('error-message').textContent = error.message;
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
    
    // Verificación de usuarios hardcodeados primero
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