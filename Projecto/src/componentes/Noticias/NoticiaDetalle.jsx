import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNoticias } from '../../hooks/useNoticias';

export function NoticiaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticias, setNoticias] = useNoticias();

  // Buscar la noticia por ID
  const noticia = noticias.find((n) => String(n.id) === id);

  // Función para eliminar la noticia
  const eliminarNoticia = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta noticia?')) return;

    try {
      const response = await fetch(`http://localhost:3001/noticias/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al eliminar la noticia: ${errorMessage}`);
      }

      alert('Noticia eliminada correctamente');
      setNoticias((prev) => prev.filter((n) => String(n.id) !== id));
      navigate('/'); // Redirigir a la página principal o a la lista de noticias
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
      alert(error.message);
    }
  };

  if (!noticia) return <p>Noticia no encontrada</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{noticia.titulo}</h2>
          <p className="card-text">{noticia.contenido}</p>

          <button className="btn btn-danger mt-3" onClick={eliminarNoticia}>
            Eliminar Noticia
          </button>
        </div>
      </div>
    </div>
  );
}
