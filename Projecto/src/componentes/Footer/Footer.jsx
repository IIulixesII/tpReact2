import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Mi Sitio</h3>
          <p>Tu fuente confiable de noticias y usuarios registrados.</p>
        </div>

        <div className="footer-section links">
          <h4>Enlaces</h4>
          <Link to="/">Inicio</Link>
          <Link to="/registro">Registrarse</Link>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/usuarios">Usuarios</Link>
        </div>

        <div className="footer-section contact">
          <h4>Contacto</h4>
          <p>Email: contacto@misitio.com</p>
          <p>Teléfono: +54 11 1234‑5678</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Mi Sitio. Todos los derechos reservados.
      </div>
    </footer>
  );
}
