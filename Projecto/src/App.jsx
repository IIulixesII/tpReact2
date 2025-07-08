import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./componentes/Header/Header.jsx";
import { Hero } from "./componentes/Hero/Hero.jsx";
import { Footer } from "./componentes/Footer/Footer.jsx";
import { ProtectedRoute } from "./componentes/ProtectedRoute/ProtectedRoute.jsx";

import { NoticiaCard } from "./componentes/Noticias/NoticiaCard.jsx";
import { NoticiaDetalle } from "./componentes/Noticias/NoticiaDetalle.jsx";
import { EditarNoticia } from "./componentes/Noticias/NoticiaEditar.jsx";
import { NoticiaCrear } from "./componentes/Noticias/NoticiaCrear.jsx"; 
import { EditarUsuario } from "./componentes/Usuario/UsuarioEditar.jsx";
import { UsuarioCard } from "./componentes/Usuario/UsuarioCard.jsx";
import { Registro } from "./componentes/Registro/Registro.jsx";
import { Inicio } from "./componentes/Inicio/Inicio.jsx";
import { Iniciolog } from "./componentes/Iniciolog/Iniciolog.jsx";
import { InicioAdmin } from "./componentes/InicioAdmin/IncioAdmin.jsx";
import { Pronostico } from "./componentes/Pronostico/Pronostico.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container d-flex flex-column min-vh-100">
        <Hero />

        <main className="flex-grow-1">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<NoticiaCard />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Inicio />} />

            {/* Rutas protegidas */}
            <Route
              path="/crear-noticia"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <NoticiaCrear />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditarNoticia />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editar-usuario/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditarUsuario />
                </ProtectedRoute>
              }
            />
            <Route
              path="/noticia/:id"
              element={
                <ProtectedRoute allowedRoles={["admin", "lector"]}>
                  <NoticiaDetalle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UsuarioCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inicioadmin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <InicioAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/iniciolog"
              element={
                <ProtectedRoute allowedRoles={["lector", "admin"]}>
                  <Iniciolog />
                </ProtectedRoute>
              }
            />
            <Route path="/pronostico" element={<Pronostico />} />

            {/* Ruta no encontrada */}
            <Route
              path="*"
              element={
                <h1 className="text-center mt-5">Página no encontrada</h1>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
