import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function NoticiaCrear() {
  const [noticia, setNoticia] = useState({
    titulo: '',
    contenido: '',
    imagen: '', 
    fecha: ''
  });
  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticia(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNoticia(prev => ({ ...prev, imagen: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNoticia(prev => ({ ...prev, imagen: '' }));
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!noticia.titulo.trim() || !noticia.contenido.trim() || !noticia.fecha.trim()) {
      setError(true);
      setMensaje('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (!noticia.imagen) {
      setError(true);
      setMensaje('Por favor, selecciona una imagen.');
      return;
    }

    fetch('http://localhost:3001/noticias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noticia)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear noticia');
        setError(false);
        setMensaje('Noticia creada correctamente.');
        setNoticia({ titulo: '', contenido: '', imagen: '', fecha: '' });
        setPreview(null);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(() => {
        setError(true);
        setMensaje('Error al crear noticia.');
      });
  };

  return (
    <div
      className="container mt-5 mb-5 d-flex flex-column align-items-center"
      style={{ maxWidth: '900px', minHeight: 'calc(100vh - 160px)', paddingBottom: '3rem' }}
    >
      <h2 className="mb-4 text-center" style={{ color: '#28a745' }}>
        Crear Noticia
      </h2>

      {mensaje && (
        <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert" style={{ width: '100%' }}>
          {mensaje}
        </div>
      )}

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
            placeholder="Ingrese el título de la noticia"
            required
            autoFocus
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
            placeholder="Escriba el contenido de la noticia"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label fw-semibold">
            Imagen
          </label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            className="form-control form-control-lg"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        {preview && (
          <div className="mb-3">
            <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
          </div>
        )}

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
          Crear Noticia
        </button>
      </form>
    </div>
  );
}
