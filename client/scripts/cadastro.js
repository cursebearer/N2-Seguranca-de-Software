const API_URL = 'http://localhost:3001/usuarios';
const messageContainer = document.getElementById('message-container');
const cadastroForm = document.getElementById('cadastro-form');

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

async function cadastrarUsuario(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        showMessage('As senhas não coincidem!', 'error');
        return;
    }
    
    const userData = {
        name: name,
        email: email,
        password: password
    };
    
    console.log('Enviando dados:', userData);
    
    try {
        const response = await fetch(`${API_URL}/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        console.log('Status da resposta:', response.status);
        
        if (!response.ok) {
            let errorMessage = 'Erro ao cadastrar usuário';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.error('Erro ao processar resposta de erro:', e);
            }
            throw new Error(errorMessage);
        }
        

        cadastroForm.reset();
        
        showMessage('Usuário cadastrado com sucesso! Você já pode fazer login. <a href="login.html">Ir para o Login</a>', 'success');
        
    } catch (error) {
        console.error('Erro:', error);
        showMessage(`Erro ao cadastrar usuário: ${error.message}`, 'error');
    }
}

cadastroForm.addEventListener('submit', cadastrarUsuario);