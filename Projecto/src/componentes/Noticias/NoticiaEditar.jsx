import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function EditarNoticia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState({
    titulo: '',
    contenido: '',
    imagen: '',
    fecha: ''
  });
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/noticias/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Noticia no encontrada');
        return res.json();
      })
      .then(data => {
        setNoticia(data);
        setPreview(data.imagen || '');
        setLoading(false);
      })
      .catch(() => {
        alert('No se encontró la noticia.');
        navigate('/');
      });
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNoticia(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const fakePath = `/image/${file.name}`; // Ruta simulada
      setNoticia(prev => ({ ...prev, imagen: fakePath }));

      // Vista previa local
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!noticia.titulo.trim() || !noticia.contenido.trim() || !noticia.fecha.trim()) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    fetch(`http://localhost:3001/noticias/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noticia)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar noticia');
        alert('Noticia actualizada correctamente.');
        navigate('/');
      })
      .catch(() => alert('Error al actualizar noticia'));
  };

  if (loading) return <p className="text-center mt-5">Cargando noticia...</p>;

  return (
    <div
      className="container mt-5 mb-5 d-flex flex-column align-items-center"
      style={{
        maxWidth: '900px',
        minHeight: 'calc(100vh - 160px)',
        paddingBottom: '3rem'
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: '#28a745' }}>
        Editar Noticia
      </h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow rounded w-100" noValidate>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label fw-semibold">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="form-control form-control-lg"
            value={noticia.titulo}
            onChange={handleChange}
            required
            autoFocus
            placeholder="Ingrese el título de la noticia"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contenido" className="form-label fw-semibold">
            Contenido
          </label>
          <textarea
            id="contenido"
            name="contenido"
            className="form-control form-control-lg"
            rows="6"
            value={noticia.contenido}
            onChange={handleChange}
            required
            placeholder="Escriba el contenido de la noticia"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label fw-semibold">
            Imagen
          </label>
          <input
            type="file"
            id="imagen"
            className="form-control form-control-lg"
            onChange={handleImageChange}
            accept="image/*"
          />
          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="img-fluid mt-3 rounded shadow-sm"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fecha" className="form-label fw-semibold">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            className="form-control form-control-lg"
            value={noticia.fecha}
            onChange={handleChange}
            required
          />
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
  );
}
