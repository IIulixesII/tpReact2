import React from "react";
import "./Pronostico.css";

const ciudades = [
  { nombre: "Ciudad Autónoma de Buenos Aires", valor: "Buenos Aires" },
  { nombre: "La Plata", valor: "La Plata" },
  { nombre: "Quilmes", valor: "Quilmes" },
  { nombre: "Avellaneda", valor: "Avellaneda" },
  { nombre: "Morón", valor: "Morón" },
  { nombre: "Lomas de Zamora", valor: "Lomas de Zamora" },
  { nombre: "San Isidro", valor: "San Isidro" },
  { nombre: "Vicente López", valor: "Vicente López" },
];

// Datos simulados para el clima
const climaSimulado = {
  "Buenos Aires": { temp: 16, desc: "Nublado", icon: "☁️", humedad: 60, viento: 4 },
  "La Plata": { temp: 18, desc: "Soleado", icon: "☀️", humedad: 55, viento: 3 },
  "Quilmes": { temp: 15, desc: "Lluvia ligera", icon: "🌧️", humedad: 80, viento: 5 },
  "Avellaneda": { temp: 17, desc: "Parcialmente nublado", icon: "⛅", humedad: 65, viento: 3 },
  "Morón": { temp: 14, desc: "Soleado", icon: "☀️", humedad: 50, viento: 2 },
  "Lomas de Zamora": { temp: 16, desc: "Nublado", icon: "☁️", humedad: 70, viento: 4 },
  "San Isidro": { temp: 19, desc: "Soleado", icon: "☀️", humedad: 40, viento: 3 },
  "Vicente López": { temp: 15, desc: "Lluvia ligera", icon: "🌧️", humedad: 85, viento: 5 },
};

export function Pronostico() {
  return (
    <div className="pronostico-container">
      <h2 className="pronostico-title">Pronóstico del Clima AMBA</h2>

      <div className="cards-container">
        {ciudades.map(({ nombre, valor }) => {
          const clima = climaSimulado[valor];
          return (
            <div key={nombre} className="card">
              <h3>{nombre}</h3>
              <div className="card-icon" style={{ fontSize: "48px" }}>
                {clima.icon}
              </div>
              <p>{clima.temp}°C - {clima.desc}</p>
              <p>Humedad: {clima.humedad}%</p>
              <p>Viento: {clima.viento} m/s</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
