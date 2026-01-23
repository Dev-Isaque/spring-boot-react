const API_URL = 'http://localhost:8080';

export const listarProdutos = async () => {
  const response = await fetch(`${API_URL}/listarTodos`);
  return response.json();
};

export const cadastrarProduto = async (produto) => {
  const response = await fetch(`${API_URL}/cadastrar`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(produto)
  });

  return response.json();
};

export const atualizarProduto = async (produto) => {
  const response = await fetch(`${API_URL}/atualizar/${produto.id}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    
    body: JSON.stringify(produto)
  });

  return response.json();
};

export const removerProduto = async (id) => {
  const response = await fetch(`${API_URL}/remover/${id}`, {
    method: 'DELETE'
  });

  return response.json();
};
