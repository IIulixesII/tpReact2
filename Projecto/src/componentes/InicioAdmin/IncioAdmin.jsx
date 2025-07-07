import React, { useState } from 'react';
import './InicioAdmin.css';

export function InicioAdmin() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !contenido || !imagen) {
      setError(true);
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    const nuevaNoticia = {
      id: Date.now().toString(),
      titulo,
      contenido,
      imagen,
    };

    const noticiasGuardadas = JSON.parse(localStorage.getItem('noticias')) || [];
    noticiasGuardadas.push(nuevaNoticia);
    localStorage.setItem('noticias', JSON.stringify(noticiasGuardadas));

    setError(false);
    setMensaje('Noticia creada exitosamente');
    setTitulo('');
    setContenido('');
    setImagen(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
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
        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            onChange={handleImageChange}
            required
          />
        </div>
        {imagen && <img src={imagen} alt="Vista previa" width="100" />}
        <button type="submit" className="submit-btn">Crear Noticia</button>
      </form>
    </div>
  );
}
