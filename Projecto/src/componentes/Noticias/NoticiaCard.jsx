import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function NoticiaCard() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const noticiasGuardadas = JSON.parse(localStorage.getItem('noticias')) || [];
    setNoticias(noticiasGuardadas);
  }, []);

  if (!noticias.length) {
    return <p>No hay noticias disponibles.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Últimas Noticias</h2>
      <div className="row">
        {noticias.slice(0, 10).map((noticia) => (
          <div className="col-md-6 mb-4" key={noticia.id}>
            <div className="card h-100 shadow-sm position-relative">
              <div className="card-body">
                <h5 className="card-title">{noticia.titulo}</h5>
                <p className="card-text">{noticia.contenido}</p>
                {noticia.imagen && (
                  <img
                    src={noticia.imagen}
                    alt="Imagen de la noticia"
                    className="card-img-top"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <Link to={`/noticia/${noticia.id}`} className="stretched-link" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
