const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
const API_URL = 'http://localhost:3001/usuarios';
const messageContainer = document.getElementById('message-container');
        
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
        

        let usuarios = [];  

async function carregarUsuariosRecentes() {
    try {
        const response = await fetch(`${API_URL}/todos`, {
        headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao carregar usuários');
        }

        const data = await response.json(); 
        usuarios = data.users;  

        const tbody = document.getElementById('usuarios-recentes');

        if (!usuarios || usuarios.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">Nenhum usuário cadastrado</td>
                </tr>
            `;
            return;
        }

        const usuariosRecentes = usuarios.slice(0, 5);

        tbody.innerHTML = usuariosRecentes.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.name}</td>
                <td>${usuario.email}</td>
                <td class="actions">
                    <a href="detalhes.html?id=${usuario.id}" class="btn btn-small">Ver</a>
                    <a href="editar.html?id=${usuario.id}" class="btn btn-small btn-secondary">Editar</a>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Erro ao carregar usuários. Verifique se o servidor está rodando.', 'error');
    }
}

function buscarUsuario(event) {
    event.preventDefault();
    
    const userId = document.getElementById('userId').value;
    
    const usuarioEncontrado = usuarios.find(user => user.id === userId);
    
    if (usuarioEncontrado) {
        window.location.href = `detalhes.html?id=${userId}`;
    } else {
        alert('Usuário não encontrado!');
    }
}

document.getElementById('buscar-form').addEventListener('submit', buscarUsuario);

document.addEventListener('DOMContentLoaded', carregarUsuariosRecentes);

document.getElementById('logout-link').addEventListener('click', function (event) {
    event.preventDefault(); 
    localStorage.removeItem('token'); 
    window.location.href = 'login.html'; 
});

