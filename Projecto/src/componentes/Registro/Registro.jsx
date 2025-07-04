import "./Registro.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Registro() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!username || !password) {
      setError("Por favor completá todos los campos.");
      setSuccess("");
      return;
    }

    try {
      // Primero chequeamos que el usuario no exista
      const resCheck = await fetch(`http://localhost:3001/usuarios?usuario=${username}`);
      const existingUsers = await resCheck.json();

      if (existingUsers.length > 0) {
        setError("El usuario ya existe, elegí otro nombre.");
        setSuccess("");
        return;
      }

      // Si no existe, creamos el usuario
      const res = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: username, password }),
      });

      if (!res.ok) throw new Error("Error en el servidor");

      setError("");
      setSuccess("Usuario registrado con éxito. Redirigiendo a login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError("Error al registrar usuario.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Registro</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="uname" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="uname"
              name="uname"
              placeholder="Ingresá tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="psw" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="psw"
              name="psw"
              placeholder="Ingresá tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>

        <Link to="/login" className="btn btn-outline-primary w-100 mt-3">
          Ya tengo cuenta
        </Link>
      </div>
    </div>
  );
}
