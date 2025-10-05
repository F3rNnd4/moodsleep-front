const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  registers: {
    // GET /api/registers - Buscar todos os registros
    getAll: () => fetch(`${API_BASE_URL}/api/registers`),
    
    // GET /api/registers/:id - Buscar um registro específico
    getById: (id) => fetch(`${API_BASE_URL}/api/registers/${id}`),
    
    // POST /api/registers - Criar um novo registro
    create: (registerData) => fetch(`${API_BASE_URL}/api/registers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData)
    }),
    
    // PUT /api/registers/:id - Atualizar um registro
    update: (id, registerData) => fetch(`${API_BASE_URL}/api/registers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData)
    }),
    
    // DELETE /api/registers/:id - Deletar um registro
    delete: (id) => fetch(`${API_BASE_URL}/api/registers/${id}`, {
      method: 'DELETE'
    })
  }
};