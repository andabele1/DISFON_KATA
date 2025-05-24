import { useState } from "react";
import "./App.css";
import ClienteTotales from "./components/ClienteTotales";
import TopYPromedio from "./components/TopYPromedio";
import TransaccionesPorFecha from "./components/TransaccionesPorFecha";
import VisualizarTransacciones from "./components/VisualizarTransacciones";

function App() {
  const [mostrarTransacciones, setMostrarTransacciones] = useState(false);

  return (
    <div className="app">
      <h1 className="title">Dashboard de Dispersión de Fondos</h1>

      {!mostrarTransacciones ? (
        <>
          <button
            style={{
              padding: "0.5rem 1rem",
              marginBottom: "1.5rem",
              cursor: "pointer",
              borderRadius: "5px",
              border: "1px solid #333",
              backgroundColor: "#f0f0f0",
            }}
            onClick={() => setMostrarTransacciones(true)}
          >
            Cargar / Visualizar Transacciones
          </button>

          <div className="grid">
            <section className="card">
              <ClienteTotales />
            </section>

            <section className="card">
              <TransaccionesPorFecha />
            </section>

            <section className="card">
              <TopYPromedio />
            </section>
          </div>
        </>
      ) : (
        <VisualizarTransacciones onBack={() => setMostrarTransacciones(false)} />
      )}
    </div>
  );
}

export default App;
