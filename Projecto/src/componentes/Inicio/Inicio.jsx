import "./Inicio.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexto/AuthContexto";

export function Inicio() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/usuarios?usuario=${username}&password=${password}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const userData = data[0];
        login(userData); // Guarda en contexto
        setError("");
        setSuccess("¡Inicio de sesión exitoso! Redirigiendo...");

        setTimeout(() => {
          setSuccess("");
          if (userData.rol === "admin") {
            navigate("/inicioadmin");
          } else {
            navigate("/iniciolog");
          }
        }, 1000);
      } else {
        setError("Usuario o contraseña incorrectos");
        setSuccess("");
      }
    } catch (err) {
      console.error("Error de conexión con el servidor:", err);
      setError("No se pudo conectar al servidor");
      setSuccess("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Inicio de Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="uname" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="uname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresá tu usuario"
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="psw" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresá tu contraseña"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>

        <Link to="/registro" className="btn btn-outline-primary w-100 mt-3">
          No tengo cuenta
        </Link>
      </div>
    </div>
  );
}
