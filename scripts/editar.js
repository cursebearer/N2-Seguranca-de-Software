const API_URL = 'http://localhost:3001/usuarios';
const messageContainer = document.getElementById('message-container');
const formContainer = document.getElementById('form-container');
let userId = null;
        
        function getUrlParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                id: params.get('id')
            };
        }
        
        function showMessage(message, type = 'info') {
            messageContainer.innerHTML = `
                <div class="alert alert-${type}">
                    <p>${message}</p>
                </div>
            `;
        }
        
        async function carregarDadosUsuario() {
    const { id } = getUrlParams();
    userId = id;
    
    if (!id) {
        formContainer.innerHTML = `
            <div class="alert alert-error">
                <p>ID do usuário não fornecido.</p>
            </div>
            <div class="buttons">
                <a href="listar.html" class="btn btn-secondary">Voltar para Lista</a>
            </div>
        `;
        return;
    }
    
    try {
         const response = await fetch(`${API_URL}/todos`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Usuário não encontrado');
            }
            throw new Error('Erro ao carregar dados do usuário');
        }
        
        const data = await response.json();   
        const usuario = data.users.find(user => user.id === id); 
        
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }           
        
        formContainer.innerHTML = `
            <form id="editar-form">
                <div class="form-group">
                    <label for="name">Nome Completo</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Digite o nome completo" 
                        value="${usuario.name}"
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Digite o e-mail" 
                        value="${usuario.email}"
                        required
                    >
                    <span class="hint">Este e-mail deve ser único no sistema</span>
                </div>
                
                <div class="buttons">
                    <a href="listar.html" class="btn btn-secondary">Cancelar</a>
                    <button type="submit" class="btn">Salvar Alterações</button>
                </div>
            </form>
        `;
        
        document.getElementById('editar-form').addEventListener('submit', atualizarUsuario);
        
    } catch (error) {
        console.error('Erro:', error);
        
        formContainer.innerHTML = `
            <div class="alert alert-error">
                <p>${error.message || 'Erro ao carregar dados do usuário'}</p>
            </div>
            <div class="buttons">
                <a href="listar.html" class="btn btn-secondary">Voltar para Lista</a>
            </div>
        `;
    }
}

async function atualizarUsuario(event) {
    event.preventDefault();
    
    if (!userId) {
        showMessage('ID do usuário não encontrado', 'error');
        return;
    }
    
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        age: parseInt(formData.get('age')),
        email: formData.get('email')
    };
    
    try {
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Salvando...';
        
        const response = await fetch(`${API_URL}/editar/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar usuário');
        }
        
        showMessage('Usuário atualizado com sucesso!', 'success');
        
        setTimeout(() => {
            window.location.href = `detalhes.html?id=${userId}`;
        }, 2000);
        
    } catch (error) {
        console.error('Erro:', error);
        showMessage(`Erro ao atualizar usuário: ${error.message}`, 'error');
        
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Salvar Alterações';
    }
}

document.addEventListener('DOMContentLoaded', carregarDadosUsuario);

document.getElementById('logout-link').addEventListener('click', function (event) {
    event.preventDefault(); 
    window.location.href = 'login.html'; 
});
