import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthContexto.jsx";

export function Hero() {
  const { IsLogged, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Agregamos '/pronostico' para que sea ruta pública
    const publicPaths = ["/", "/login", "/registro", "/pronostico"];

    // Si no está logueado y no es una ruta pública, forzar redirección al login
    if (!IsLogged && !publicPaths.includes(location.pathname)) {
      logout();
      navigate("/login", { replace: true });
    }
  }, [IsLogged, location.pathname, logout, navigate]);

  const handleLogout = () => {
    if (window.confirm("¿Seguro querés cerrar sesión?")) {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="hero">
      <div className="hero-container">
        <h1 className="hero-title">NoticiasARG</h1>

        <nav className="hero-nav">
          {/* Rutas para visitantes (no logueados) */}
          {!IsLogged && (
            <>
              <Link to="/">Inicio</Link>
              <Link to="/pronostico">Pronóstico</Link>
              <Link to="/registro">Registrarse</Link>
              <Link to="/login" className="btn">
                Iniciar Sesión
              </Link>
            </>
          )}

          {/* Rutas para admin */}
          {IsLogged && user?.rol === "admin" && (
            <>
              <Link to="/">Noticias</Link>
              <Link to="/usuarios">Usuarios</Link>
              <Link to="/inicioadmin">Panel Admin</Link>
              <Link to="/pronostico">Pronóstico</Link>
              <button onClick={handleLogout} className="btn">
                Cerrar Sesión
              </button>
            </>
          )}

          {/* Rutas para lector */}
          {IsLogged && user?.rol === "lector" && (
            <>
              <Link to="/">Noticias</Link>
              <Link to="/iniciolog">Mi Perfil</Link>
              <Link to="/pronostico">Pronóstico</Link>
              <button onClick={handleLogout} className="btn">
                Cerrar Sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
