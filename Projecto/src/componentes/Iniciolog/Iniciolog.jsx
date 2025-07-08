import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexto/AuthContexto.jsx";
import { FiEdit2, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import "./Iniciolog.css";

export function Iniciolog() {
  const { user, setUser } = useAuth();
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
        password: "", // nunca mostrar la contraseña real
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = (field) => {
    if (!window.confirm("¿Seguro que querés guardar los cambios?")) return;

    fetch(`http://localhost:3001/usuarios/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: formData[field] }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || "Error en la respuesta");
          });
        }
        if (res.status === 204) return null; // No content, nada que parsear
        return res.json(); // Solo parsear si hay contenido
      })
      .then(() => {
        alert("Datos actualizados con éxito");
        setUser((prev) => ({ ...prev, [field]: formData[field] }));
        setEditField(null);
        if (field === "password") setFormData((prev) => ({ ...prev, password: "" }));
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
        alert("Error al actualizar los datos");
      });
  };

  if (!user) {
    return <p className="loading">Cargando perfil...</p>;
  }

  return (
    <div className="iniciolog-container">
      <h2 className="iniciolog-title">Bienvenido, {user.usuario}!</h2>

      {["nombre", "apellido", "email", "telefono", "direccion"].map((field) => (
        <div key={field} className="iniciolog-row">
          <strong className="iniciolog-label">{capitalize(field)}:</strong>
          {editField === field ? (
            <>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="iniciolog-input"
              />
              <button
                onClick={() => handleSave(field)}
                className="btn-save"
                title={`Guardar ${capitalize(field)}`}
              >
                <FiSave />
              </button>
            </>
          ) : (
            <>
              <span className="iniciolog-value">{formData[field]}</span>
              <button
                onClick={() => handleEdit(field)}
                className="btn-edit"
                title={`Editar ${capitalize(field)}`}
              >
                <FiEdit2 />
              </button>
            </>
          )}
        </div>
      ))}

      {/* Contraseña especial */}
      <div className="iniciolog-row">
        <strong className="iniciolog-label">Contraseña:</strong>
        {editField === "password" ? (
          <>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nueva contraseña"
              className="iniciolog-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="btn-edit icon-btn"
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <button
              onClick={() => handleSave("password")}
              className="btn-save"
              title="Guardar Contraseña"
            >
              <FiSave />
            </button>
          </>
        ) : (
          <>
            <span className="iniciolog-value">********</span>
            <button
              onClick={() => handleEdit("password")}
              className="btn-edit"
              title="Editar Contraseña"
            >
              <FiEdit2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Helpers
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
