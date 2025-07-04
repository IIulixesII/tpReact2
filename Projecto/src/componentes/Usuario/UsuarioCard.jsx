import React, { useState, useEffect } from 'react';

export function UsuarioCard() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  };

  const eliminarUsuario = (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    fetch(`http://localhost:3001/usuarios/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          // Actualizar la lista en frontend sin volver a hacer fetch completo
          setUsuarios(prev => prev.filter(u => u.id !== id));
        } else {
          alert('Error al eliminar el usuario');
        }
      })
      .catch(err => {
        console.error('Error al eliminar usuario:', err);
        alert('Error al eliminar el usuario');
      });
  };

  if (usuarios.length === 0) return <p>Cargando usuarios...</p>;

  return (
    <div className="container mt-4">
      <h2>Lista de Usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.usuario}</td>
              <td>{u.rol}</td>
              <td>
                <button
                  onClick={() => eliminarUsuario(u.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
