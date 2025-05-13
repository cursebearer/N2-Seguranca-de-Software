const token = localStorage.getItem('token');
    if (!token) {
     window.location.href = 'login.html';
}
const API_URL = 'http://localhost:3001/usuarios';
const messageContainer = document.getElementById('message-container');
const usuariosLista = document.getElementById('usuarios-lista');
const totalUsuarios = document.getElementById('total-usuarios');
const btnAtualizar = document.getElementById('btn-atualizar');
        
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
        
        async function carregarUsuarios() {
    try {
        usuariosLista.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    <div class="spinner"></div>
                    <p>Carregando usuários...</p>
                </td>
            </tr>
        `;
        
          const response = await fetch(`${API_URL}/todos`, {
        headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao carregar usuários');
        }

        const data = await response.json();
        const usuarios = data.users;        

        totalUsuarios.textContent = usuarios.length;

        if (usuarios.length === 0) {
            usuariosLista.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">Nenhum usuário cadastrado</td>
                </tr>
            `;
            return;
        }

        usuariosLista.innerHTML = usuarios.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.name}</td>
                <td>${usuario.email}</td>
                <td class="actions">
                    <a href="detalhes.html?id=${usuario.id}" class="btn btn-small">Ver</a>
                    <a href="editar.html?id=${usuario.id}" class="btn btn-small btn-secondary">Editar</a>
                    <button class="btn btn-small btn-danger" onclick="confirmarExclusao('${usuario.id}', '${usuario.name}')">Excluir</button>
                </td>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Erro ao carregar usuários. Verifique se o servidor está rodando.', 'error');
        
        usuariosLista.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">Erro ao carregar usuários</td>
            </tr>
        `;
    }
}

        function confirmarExclusao(id, nome) {
            if (confirm(`Tem certeza que deseja excluir o usuário "${nome}"?`)) {
                excluirUsuario(id);
            }
        }
        
        async function excluirUsuario(id) {
            try {
                const response = await fetch(`${API_URL}/deletar/${id}`, {
                    method: 'DELETE',
                     headers: {
                    'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao excluir usuário');
                }
                
                showMessage('Usuário excluído com sucesso!', 'success');
                
                carregarUsuarios();
                
            } catch (error) {
                console.error('Erro:', error);
                showMessage('Erro ao excluir usuário. Tente novamente.', 'error');
            }
        }
        
        btnAtualizar.addEventListener('click', carregarUsuarios);
        
        document.addEventListener('DOMContentLoaded', carregarUsuarios);

        document.getElementById('logout-link').addEventListener('click', function (event) {
        event.preventDefault(); 
        localStorage.removeItem('token'); 
        window.location.href = 'login.html'; 
        });