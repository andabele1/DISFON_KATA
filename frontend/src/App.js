import { useState } from "react";
import "./App.css";
import ClienteTotales from "./components/ClientesTotales/ClienteTotales.tsx";
import MostrarGrafica from "./components/MostrarGrafica/MostrarGrafica.tsx";
import TopYPromedio from "./components/TopYPromedio/TopYPromedio.tsx";
import TransaccionesPorFecha from "./components/TransaccionesPorFecha/TransaccionesPorFecha.tsx";
import VisualizarTransacciones from "./components/VisualizarTransacciones/VisualizarTransacciones.tsx";

function App() {
  const [vistaActiva, setVistaActiva] = useState(null);

  return (
    <div className="app">
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#444444",
          padding: "1rem 2rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          borderRadius: "0 0 8px 8px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h1 style={{ margin: 0, fontWeight: "bold", fontSize: "1.5rem", color: "#ffffff" }}>
          Dispersión de Fondos
        </h1>

        <nav style={{ display: "flex", gap: "1rem" }}>
          {!vistaActiva && (
            <>
              <button
                style={botonEstilo}
                onClick={() => setVistaActiva("ClienteTotales")}
              >
                Totales por Cliente
              </button>
              <button
                style={botonEstilo}
                onClick={() => setVistaActiva("TransaccionesPorFecha")}
              >
                Transacciones por Fecha
              </button>
              <button
                style={botonEstilo}
                onClick={() => setVistaActiva("TopYPromedio")}
              >
                Top y Promedio
              </button>
              <button
                style={botonEstilo}
                onClick={() => setVistaActiva("VisualizarTransacciones")}
              >
                Transacciones Detalladas
              </button>
            </>
          )}

          {vistaActiva && (
            <button
              style={{ ...botonEstilo, backgroundColor: "#ef4444", color: "white" }}
              onClick={() => setVistaActiva(null)}
            >
              Volver
            </button>
          )}
        </nav>
      </header>

      {/* Contenido principal */}
      <main style={{ padding: "2rem" }}>
        {!vistaActiva && <MostrarGrafica />}

        {vistaActiva === "ClienteTotales" && <ClienteTotales />}
        {vistaActiva === "TransaccionesPorFecha" && <TransaccionesPorFecha />}
        {vistaActiva === "TopYPromedio" && <TopYPromedio />}
        {vistaActiva === "VisualizarTransacciones" && (
          <VisualizarTransacciones onBack={() => setVistaActiva(null)} />
        )}
      </main>
    </div>
  );
}

const botonEstilo = {
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  fontWeight: "600",
  transition: "background-color 0.2s ease",
};

export default App;