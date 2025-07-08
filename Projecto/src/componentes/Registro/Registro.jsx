import "./Registro.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposVacios = Object.values(formData).some((campo) => campo.trim() === "");
    if (camposVacios) {
      setError("Por favor completá todos los campos.");
      setSuccess("");
      return;
    }

    try {
      const resCheck = await fetch(`http://localhost:3001/usuarios?usuario=${formData.usuario}`);
      const existingUsers = await resCheck.json();

      if (existingUsers.length > 0) {
        setError("El usuario ya existe, elegí otro nombre.");
        setSuccess("");
        return;
      }

      const nuevoUsuario = {
        ...formData,
        rol: "lector" // rol por defecto
      };

      const res = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
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
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Registro</h2>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <div className="mb-2">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Ingresá tu usuario"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="mb-2">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresá tu contraseña"
              required
            />
          </div>

          {/* Nombre */}
          <div className="mb-2">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresá tu nombre"
              required
            />
          </div>

          {/* Apellido */}
          <div className="mb-2">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingresá tu apellido"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresá tu email"
              required
            />
          </div>

          {/* Teléfono */}
          <div className="mb-2">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ingresá tu teléfono"
              required
            />
          </div>

          {/* Dirección */}
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Ingresá tu dirección"
              required
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
