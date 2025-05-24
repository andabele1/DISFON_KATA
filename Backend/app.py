from flask import Flask
from flask_cors import CORS
from controllers.transactions_controller import transacciones_bp

app = Flask(__name__)
CORS(app)  # <--- Habilita CORS para todas las rutas

app.register_blueprint(transacciones_bp)

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

if __name__ == "__main__":
    app.run(debug=True)
