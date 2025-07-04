import React, { useState } from 'react';
import './InicioAdmin.css'; // Asegúrate de tener este archivo para los estilos

export function InicioAdmin() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !contenido) {
      setError(true);
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    const nuevaNoticia = {
      titulo,
      contenido
    };

    try {
      const respuesta = await fetch('http://localhost:3001/noticias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaNoticia),
      });

      if (respuesta.ok) {
        setError(false);
        setMensaje('Noticia creada exitosamente');
        setTitulo('');
        setContenido('');
      } else {
        setError(true);
        setMensaje('Error al crear la noticia');
      }
    } catch (error) {
      setError(true);
      setMensaje('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Crear Nueva Noticia</h1>
      <form onSubmit={handleSubmit} className="form">
        {mensaje && (
          <div className={`message ${error ? 'error' : 'success'}`}>
            {mensaje}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            placeholder="Ingrese el título de la noticia"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            placeholder="Escriba el contenido de la noticia"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Crear Noticia</button>
      </form>
    </div>
  );
}
