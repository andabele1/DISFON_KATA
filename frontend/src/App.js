import { useState } from "react";
import "./App.css";
import ClienteTotales from "./components/ClientesTotales/ClienteTotales.tsx";
import MostrarGrafica from "./components/MostrarGrafica/MostrarGrafica.tsx";
import TopYPromedio from "./components/TopYPromedio/TopYPromedio.tsx";
import TransaccionesPorFecha from "./components/TransaccionesPorFecha/TransaccionesPorFecha.tsx";
import VisualizarTransacciones from "./components/VisualizarTransacciones/VisualizarTransacciones.tsx";
import MayorPagoCliente from "./components/MayorPagoPorCliente/MayorPagoPorCliente.tsx";

function App() {
  // Estado para controlar la vista activa
  const [vistaActiva, setVistaActiva] = useState(null);

  // Función para renderizar la vista activa
  const renderVista = () => {
    switch (vistaActiva) {
      case "MayorPagoCliente":
        return <MayorPagoCliente />;
      case "ClienteTotales":
        return <ClienteTotales />;
      case "TransaccionesPorFecha":
        return <TransaccionesPorFecha />;
      case "TopYPromedio":
        return <TopYPromedio />;
      case "VisualizarTransacciones":
        return <VisualizarTransacciones onBack={() => setVistaActiva(null)} />;
      default:
        return <MostrarGrafica />;
    }
  };

  // Botones para cambiar entre vistas
  const botones = [
    { id: "MayorPagoCliente", label: "Mayor Pago por Cliente" },
    { id: "ClienteTotales", label: "Totales por Cliente" },
    { id: "TransaccionesPorFecha", label: "Transacciones por Fecha" },
    { id: "TopYPromedio", label: "Top y Promedio" },
    { id: "VisualizarTransacciones", label: "Transacciones Detalladas" },
  ];

  const formatearTitulo = (vista) => {
    // Convierte camelCase o PascalCase en texto con espacios
    return vista
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Dispersión de Fondos</h1>

        <nav className="app-nav">
          {!vistaActiva ? (
            botones.map(({ id, label }) => (
              <button
                key={id}
                className="btn"
                onClick={() => setVistaActiva(id)}
              >
                {label}
              </button>
            ))
          ) : (
            <button
              className="btn btn-volver"
              onClick={() => setVistaActiva(null)}
            >
              Volver
            </button>
          )}
        </nav>
      </header>

      <main className="app-main">
        {vistaActiva && (
          <h2 className="vista-titulo">{formatearTitulo(vistaActiva)}</h2>
        )}
        {renderVista()}
      </main>
    </div>
  );
}

export default App;
