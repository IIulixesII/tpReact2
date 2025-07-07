import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './componentes/Header/Header.jsx'; // ✅ Header visual
import { Hero } from './componentes/Hero/Hero.jsx';       // ✅ Hero dinámico
import { Footer } from './componentes/Footer/Footer.jsx';
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute.jsx';

import { NoticiaCard } from './componentes/Noticias/NoticiaCard.jsx';
import { NoticiaDetalle } from './componentes/Noticias/NoticiaDetalle.jsx';
import { UsuarioCard } from './componentes/Usuario/UsuarioCard.jsx';

import { Registro } from './componentes/Registro/Registro.jsx';
import { Inicio } from './componentes/Inicio/Inicio.jsx';
import { Iniciolog } from './componentes/Iniciolog/Iniciolog.jsx';
import { InicioAdmin } from './componentes/InicioAdmin/IncioAdmin.jsx';

function App() {
  return (
    <BrowserRouter>
      {/* Header visual (estático) */}
      <Header title="NoticiasARG" links={[]} />

      {/* Hero con navegación dinámica */}
      <Hero />

      <Routes>
        <Route path="/" element={<NoticiaCard />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Inicio />} />

        <Route
          path="/noticia/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <NoticiaDetalle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UsuarioCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inicioadmin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <InicioAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/iniciolog"
          element={
            <ProtectedRoute allowedRoles={['lector', 'admin']}>
              <Iniciolog />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
