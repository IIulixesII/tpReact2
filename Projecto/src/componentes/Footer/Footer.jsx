import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>NoticiasARG</h3>
          <p>Tu fuente confiable de noticias y usuarios registrados.</p>
        </div>

        <div className="footer-section">
          <h4>Sobre Nosotros</h4>
          <p>Somos una plataforma dedicada a informar y conectar a lectores con contenido relevante, confiable y actualizado.</p>
        </div>

        <div className="footer-section">
          <h4>Ayuda</h4>
          <p><a href="#">Centro de ayuda</a></p>
          <p><a href="#">Preguntas frecuentes</a></p>
          <p><a href="#">Términos y condiciones</a></p>
        </div>

        <div className="footer-section contact">
          <h4>Contacto</h4>
          <p>Email: contacto@noticiasarg.com</p>
          <p>Teléfono: +54 11 1234‑5678</p>
        </div>

        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} NoticiasARG. Todos los derechos reservados.
      </div>
    </footer>
  );
}
