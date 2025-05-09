const API_URL = 'http://localhost:3001/usuarios';
const messageContainer = document.getElementById('message-container');
const detalhesContainer = document.getElementById('detalhes-container');
        
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
        
        function formatarData(dataString) {
            if (!dataString) return 'N/A';
            
            const data = new Date(dataString);
            return data.toLocaleString('pt-BR');
        }
        
        async function carregarDetalhesUsuario() {
    const { id } = getUrlParams();
    
    if (!id) {
        detalhesContainer.innerHTML = `
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
            throw new Error('Erro ao carregar detalhes do usuário');
        }
        
        const data = await response.json();
        const usuario = data.users.find(user => user.id === id); 
        
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        
        detalhesContainer.innerHTML = `
            <dl class="user-details">
                <dt>ID</dt>
                <dd>${usuario.id}</dd>
                
                <dt>Nome</dt>
                <dd>${usuario.name}</dd>
                
                <dt>Email</dt>
                <dd>${usuario.email}</dd>
                
                <dt>Data de Criação</dt>
                <dd>${formatarData(usuario.createdAt)}</dd>
                
                <dt>Última Atualização</dt>
                <dd>${formatarData(usuario.updatedAt)}</dd>
            </dl>
            
            <div class="buttons">
                <a href="listar.html" class="btn btn-secondary">Voltar</a>
                <a href="editar.html?id=${usuario.id}" class="btn">Editar</a>
                <button class="btn btn-danger" onclick="confirmarExclusao('${usuario.id}', '${usuario.name}')">Excluir</button>
            </div>
        `;
        
    } catch (error) {
        console.error('Erro:', error);
        
        detalhesContainer.innerHTML = `
            <div class="alert alert-error">
                <p>${error.message || 'Erro ao carregar detalhes do usuário'}</p>
            </div>
            <div class="buttons">
                <a href="listar.html" class="btn btn-secondary">Voltar para Lista</a>
            </div>
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
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao excluir usuário');
                }
                
                showMessage('Usuário excluído com sucesso!', 'success');
                
                setTimeout(() => {
                    window.location.href = 'listar.html';
                }, 2000);
                
            } catch (error) {
                console.error('Erro:', error);
                showMessage('Erro ao excluir usuário. Tente novamente.', 'error');
            }
        }
        
        document.addEventListener('DOMContentLoaded', carregarDetalhesUsuario);

        document.getElementById('logout-link').addEventListener('click', function (event) {
        event.preventDefault(); 
        window.location.href = 'login.html'; 
        });