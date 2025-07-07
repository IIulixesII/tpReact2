import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Hero } from './componentes/Hero/Hero.jsx';
import { HeroAdmin } from './componentes/Hero/HeroAdmin.jsx';
import { Footer } from './componentes/Footer/Footer.jsx'; // 👈 Agregado

import { NoticiaCard } from './componentes/Noticias/NoticiaCard.jsx';
import { NoticiaDetalle } from './componentes/Noticias/NoticiaDetalle.jsx';
import { UsuarioCard } from './componentes/Usuario/UsuarioCard.jsx';

import { Registro } from './componentes/Registro/Registro.jsx';
import { Inicio } from './componentes/Inicio/Inicio.jsx';
import { Iniciolog } from './componentes/Iniciolog/Iniciolog.jsx';
import { InicioAdmin } from './componentes/InicioAdmin/IncioAdmin.jsx';
import { useAuth } from './contexto/AuthContexto.jsx';

function App() {
  const { IsLogged, user, logout } = useAuth();

  return (
    <BrowserRouter>
      {/* Header dinámico según el rol */}
      {user?.rol === "admin" ? <HeroAdmin /> : <Hero />}

      <nav style={{ padding: '10px' }}>
        {IsLogged ? (
          <button onClick={logout} className="btn btn-danger">
            Cerrar sesión
          </button>
        ) : null}
      </nav>

      <Routes>
        <Route path="/" element={<NoticiaCard />} />

        <Route
          path="/noticia/:id"
          element={
            IsLogged && user?.rol === 'admin' ? (
              <NoticiaDetalle />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/usuarios"
          element={
            IsLogged && user?.rol === 'admin' ? (
              <UsuarioCard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Inicio />} />

        <Route
          path="/iniciolog"
          element={
            IsLogged && user?.rol === 'lector' ? (
              <Iniciolog />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/inicioadmin"
          element={
            IsLogged && user?.rol === 'admin' ? (
              <InicioAdmin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>

      <Footer /> {/* 👈 Footer al final de todo */}
    </BrowserRouter>
  );
}

export default App;
