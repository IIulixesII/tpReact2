import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const noticiasGuardadas = JSON.parse(localStorage.getItem('noticias')) || [];
    const noticiaEncontrada = noticiasGuardadas.find((n) => n.id === id);
    setNoticia(noticiaEncontrada);
  }, [id]);

  if (!noticia) {
    return <p>Noticia no encontrada.</p>;
  }

  return (
    <div className="container mt-4">
      <h1>{noticia.titulo}</h1>
      <p>{noticia.contenido}</p>
      {noticia.imagen && (
        <img
          src={noticia.imagen}
          alt="Imagen de la noticia"
          className="img-fluid"
        />
      )}
    </div>
  );
}
