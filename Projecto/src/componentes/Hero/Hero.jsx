import './Hero.css';
import { useAuth } from '../../contexto/AuthContexto.jsx';
import { Link } from 'react-router-dom';

export function Hero() {
  const { IsLogged, user, logout } = useAuth();

  return (
    <header className="hero">
      <div className="hero-container">
        <h1 className="hero-title">NoticiasARG</h1>
        <nav className="hero-nav">
          {!IsLogged && (
            <>
              <Link to="/">Inicio</Link>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/registro">Registrarse</Link>
            </>
          )}

          {IsLogged && user.rol === 'admin' && (
            <>
              <Link to="/">Inicio</Link>
              <Link to="/inicioadmin">Panel Admin</Link>
              <Link to="/noticia/1">Noticias</Link>
              <Link to="/usuarios">Usuarios</Link>
              <button onClick={logout}>Cerrar sesión</button>
            </>
          )}

          {IsLogged && user.rol === 'lector' && (
            <>
              <Link to="/">Inicio</Link>
              <Link to="/iniciolog">Mi Panel</Link>
              <button onClick={logout}>Cerrar sesión</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
