import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:3001/api/users';

  // 1. Obtener todos los usuarios (READ)
  const fetchUsers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error al obtener usuarios:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Guardar o Actualizar Usuario (CREATE / UPDATE)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return alert('Por favor completa todos los campos');

    if (editingId) {
      // Actualizar
      fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
        .then(() => {
          fetchUsers();
          resetForm();
        })
        .catch((err) => console.error('Error al actualizar:', err));
    } else {
      // Crear
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
        .then(() => {
          fetchUsers();
          resetForm();
        })
        .catch((err) => console.error('Error al crear:', err));
    }
  };

  // 3. Preparar formulario para edicion
  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // 4. Eliminar Usuario (DELETE)
  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => fetchUsers())
        .catch((err) => console.error('Error al eliminar:', err));
    }
  };

  // Limpiar formulario
  const resetForm = () => {
    setName('');
    setEmail('');
    setEditingId(null);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '650px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Gestión de Usuarios (React)</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '25px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', flex: '1', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', flex: '1', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 18px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {editingId ? 'Actualizar' : 'Guardar'}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} style={{ padding: '10px 18px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de Usuarios */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No hay usuarios registrados</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user)} style={{ marginRight: '8px', cursor: 'pointer' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(user.id)} style={{ color: 'red', cursor: 'pointer' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;