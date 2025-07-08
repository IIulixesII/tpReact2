import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuarioData, setUsuarioData] = useState({
    usuario: '',
    rol: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/usuarios/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Usuario no encontrado');
        return res.json();
      })
      .then(data => {
        setUsuarioData({ usuario: data.usuario, rol: data.rol });
        setLoading(false);
      })
      .catch(() => {
        alert('No se encontró el usuario.');
        navigate('/usuarios');
      });
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuarioData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!usuarioData.usuario.trim() || !usuarioData.rol.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    fetch(`http://localhost:3001/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar usuario');
        alert('Usuario actualizado correctamente.');
        navigate('/usuarios');
      })
      .catch(() => alert('Error al actualizar usuario'));
  };

  if (loading) return <p className="text-center mt-5">Cargando usuario...</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: 'calc(100vh - 150px)' }} // ajusta a tu header/footer
    >
      <div className="container" style={{ maxWidth: '480px' }}>
        <h2 className="mb-4 text-center" style={{ color: '#28a745' }}>
          Editar Usuario
        </h2>

        <form onSubmit={handleSubmit} className="card p-4 shadow rounded">
          <div className="mb-4">
            <label htmlFor="usuario" className="form-label fw-semibold">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              className="form-control form-control-lg"
              value={usuarioData.usuario}
              onChange={handleChange}
              placeholder="Ingresa el nombre de usuario"
              autoFocus
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rol" className="form-label fw-semibold">
              Rol
            </label>
            <select
              id="rol"
              name="rol"
              className="form-select form-select-lg"
              value={usuarioData.rol}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="lector">Lector</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            style={{ fontSize: '1.1rem' }}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
