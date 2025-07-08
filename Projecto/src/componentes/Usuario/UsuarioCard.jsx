import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export function UsuarioCard() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

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

  const editarUsuario = (id) => {
    navigate(`/editar-usuario/${id}`);
  };

  if (usuarios.length === 0)
    return (
      <p className="text-center mt-5 fs-5 fw-semibold" style={{ color: '#6c757d' }}>
        Cargando usuarios...
      </p>
    );

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        marginTop: '3rem',
        marginBottom: '3rem',
        minHeight: '70vh',       // para que ocupe más altura y quede centrado verticalmente
        gap: '2rem',
        padding: '0 20px',
      }}
    >
      <h2
        className="fw-bold text-center"
        style={{
          color: '#d6336c',
          textShadow: '1px 1px 3px rgba(214, 51, 108, 0.5)',
          userSelect: 'none',
          fontSize: '2.5rem',
        }}
      >
        Lista de Usuarios
      </h2>

      <div
        className="table-responsive shadow rounded"
        style={{
          border: '1px solid #dee2e6',
          backgroundColor: 'white',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '1100px',   // más ancho
        }}
      >
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '40%' }}>Usuario</th>
              <th style={{ width: '20%' }}>Rol</th>
              <th style={{ width: '30%' }} className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="fw-semibold">{u.id}</td>
                <td>{u.usuario}</td>
                <td>
                  <span
                    className={`badge ${
                      u.rol === 'admin' ? 'bg-danger' : 'bg-info text-dark'
                    }`}
                    style={{ fontSize: '0.9rem', padding: '0.4em 0.7em' }}
                  >
                    {u.rol.charAt(0).toUpperCase() + u.rol.slice(1)}
                  </span>
                </td>
                <td className="text-center">
                  <div className="btn-group" role="group" aria-label="Acciones usuario">
                    <button
                      className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                      onClick={() => editarUsuario(u.id)}
                      title="Editar usuario"
                    >
                      <FiEdit2 size={16} /> Editar
                    </button>
                    <button
                      onClick={() => eliminarUsuario(u.id)}
                      className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                      title="Eliminar usuario"
                    >
                      <FiTrash2 size={16} /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
