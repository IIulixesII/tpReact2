import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { useAuth } from '../../contexto/AuthContexto';

export function NoticiaCard() {
  const [noticias, setNoticias] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:3001/noticias')
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error('Error al cargar noticias:', err));
  }, []);

  if (!noticias.length) {
    return (
      <p className="text-center mt-5 fs-5 fw-semibold" style={{ color: '#6c757d' }}>
        No hay noticias disponibles.
      </p>
    );
  }

  const handleDelete = (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta noticia?')) return;

    fetch(`http://localhost:3001/noticias/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNoticias((prev) => prev.filter((n) => n.id !== id));
      })
      .catch((err) => console.error('Error al eliminar noticia:', err));
  };

  return (
    <div className="container mt-5">
      <h2
        className="mb-4 display-5 text-center fw-bold"
        style={{ color: '#d6336c', textShadow: '1px 1px 3px rgba(214, 51, 108, 0.5)', userSelect: 'none' }}
      >
        Últimas Noticias
      </h2>

      <div className="d-flex flex-column align-items-center gap-4">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="card flex-md-row shadow-sm h-100 mx-auto"
            style={{ width: '90%', maxWidth: '1000px' }}
          >
            {noticia.imagen && (
              <img
                src={noticia.imagen}
                alt={`Imagen de ${noticia.titulo}`}
                className="img-fluid rounded-start"
                style={{ width: '250px', height: '100%', objectFit: 'cover' }}
              />
            )}
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{noticia.titulo}</h5>
                <p className="card-text text-muted mb-2">
                  {new Date(noticia.fecha).toLocaleDateString()}
                </p>
                <p className="card-text">
                  {noticia.contenido.length > 120
                    ? noticia.contenido.slice(0, 120) + '...'
                    : noticia.contenido}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link
                  to={`/noticia/${noticia.id}`}
                  className="btn btn-outline-primary d-flex align-items-center gap-1"
                  title="Ver más"
                >
                  <FiEye size={18} />
                  Ver más
                </Link>

                {user?.rol === 'admin' && (
                  <div className="d-flex gap-2">
                    <Link
                      to={`/editar/${noticia.id}`}
                      className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                      title="Editar noticia"
                    >
                      <FiEdit2 size={16} />
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                      title="Eliminar noticia"
                      onClick={() => handleDelete(noticia.id)}
                    >
                      <FiTrash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
