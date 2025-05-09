const API_URL = 'http://localhost:3001/usuarios';
const messageContainer = document.getElementById('message-container');
const loginForm = document.getElementById('login-form');

function showMessage(message, type = 'info') {
    messageContainer.innerHTML = `
        <div class="alert alert-${type}">
            <p>${message}</p>
        </div>
    `;
    
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}

function decodeToken(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); 
        return payload;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
    }
}

async function fazerLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer login');
        }
        
        const data = await response.json();
        const decodedToken = decodeToken(data.token); 
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify({
            id: decodedToken.id,
            email: decodedToken.email
        }));
        
        showMessage('Login realizado com sucesso! Redirecionando...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        console.error('Erro:', error);
        showMessage(`Erro ao fazer login: ${error.message}`, 'error');
    }
}

loginForm.addEventListener('submit', fazerLogin);

document.addEventListener('DOMContentLoaded', () => {
    const userToken = localStorage.getItem('userToken');
});