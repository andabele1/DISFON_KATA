from flask import Flask
from flask_cors import CORS
from controllers.transactions_controller import transacciones_bp  # Importa el blueprint con las rutas de transacciones

# Crea la aplicación Flask
app = Flask(__name__)

# Habilita CORS para permitir peticiones desde cualquier origen a rutas que empiecen con /api/
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Registra el blueprint de transacciones en la app
app.register_blueprint(transacciones_bp)

# Ruta principal que muestra un pequeño dashboard con enlaces a las APIs disponibles
@app.route("/")
def dashboard():
    return """
    <h1>Dashboard de Dispersión de Fondos</h1>
    <ul>
        <li><a href="/api/transacciones">Ver todas las transacciones</a></li>
        <li><a href="/api/totales">Ver totales por cliente</a></li>
        <li><a href="/api/top">Ver cliente top</a></li>
        <li><a href="/api/totales_por_fecha"> Totales por fecha</a></li>
        <li><a href="/api/promedios"> Promedios</a></li>
        <li><a href="/api/fechas"> busqueda por fecha</a></li>
    </ul>
    """

# Punto de entrada para ejecutar la app en modo debug (auto recarga y mensajes de error)
if __name__ == "__main__":
    app.run(debug=True)
