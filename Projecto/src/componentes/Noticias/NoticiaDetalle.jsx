import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3001/noticias/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Noticia no encontrada');
        return res.json();
      })
      .then((data) => {
        setNoticia(data);
        setLoading(false);
      })
      .catch((err) => {
        setNoticia(null);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Cargando noticia...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">{error}</div>
      </div>
    );
  }

  return (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '1rem',
    }}
  >
    <div
      className="card shadow-lg border-0"
      style={{ maxWidth: '1000px', width: '90%' }}
    >
      <div className="card-body p-4">
        <h1 className="card-title mb-2">{noticia.titulo}</h1>
        {noticia.subtitulo && (
          <h5 className="card-subtitle text-muted mb-3">{noticia.subtitulo}</h5>
        )}
        <div className="d-flex justify-content-between text-muted mb-3">
          <small>
            <strong>Fecha:</strong> {new Date(noticia.fecha).toLocaleDateString()}
          </small>
          <small>
            <strong>Autor:</strong> {noticia.autor || 'Desconocido'}
          </small>
        </div>
        {noticia.imagen && (
          <img
            src={noticia.imagen}
            alt={`Imagen de la noticia ${noticia.titulo}`}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        )}
        <p className="lead">{noticia.contenido}</p>
      </div>
    </div>
  </div>
);

}
