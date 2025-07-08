import React from 'react'; 
import { FaUserPlus, FaNewspaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './InicioAdmin.css';

export function InicioAdmin() {
  const navigate = useNavigate();

  return (
    <div className="inicio-admin-container">
      <h1 className="inicio-admin-title">Panel de Administración</h1>
      <div className="cards-container">
        <div
          className="admin-card"
          onClick={() => navigate('/registro')}
          role="button"
          tabIndex={0}
          onKeyPress={() => navigate('/registro')}
        >
          <FaUserPlus size={48} color="#ff416c" />
          <h3>Agregar Usuario</h3>
        </div>

        <div
          className="admin-card"
          onClick={() => navigate('/crear-noticia')}
          role="button"
          tabIndex={0}
          onKeyPress={() => navigate('/crear-noticia')}
        >
          <FaNewspaper size={48} color="#ff416c" />
          <h3>Agregar Noticia</h3>
        </div>
      </div>
    </div>
  );
}
