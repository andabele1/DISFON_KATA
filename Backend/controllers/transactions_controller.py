from flask import Blueprint, jsonify, request
from services import transactions_service as service  # Importa la capa de servicios que contiene la lógica de negocio

# Crea un Blueprint para agrupar las rutas relacionadas con transacciones bajo el prefijo /api
transacciones_bp = Blueprint("transacciones", __name__, url_prefix="/api")

# Ruta para obtener todas las transacciones
@transacciones_bp.route("/transacciones", methods=["GET"])
def todas():
    return jsonify(service.obtener_todas())  # Llama al servicio que retorna todas las transacciones

# Ruta para obtener el total de transacciones por cliente
@transacciones_bp.route("/totales", methods=["GET"])
def totales():
    return jsonify(service.total_por_cliente())  # Llama al servicio que calcula el total por cliente

# Ruta para obtener el cliente con el mayor total de transacciones
@transacciones_bp.route("/top", methods=["GET"])
def top():
    return jsonify(service.cliente_top())  # Llama al servicio que identifica al cliente top

# Ruta para obtener las transacciones realizadas en una fecha específica
@transacciones_bp.route("/por_fecha/<fecha>", methods=["GET"])
def por_fecha(fecha):
    return jsonify(service.transacciones_por_fecha(fecha))  # Filtra transacciones por fecha (formato YYYY-MM-DD)

# Ruta para obtener el promedio de transacciones por cliente
@transacciones_bp.route("/promedios", methods=["GET"])
def promedios():
    return jsonify(service.promedio_por_cliente())  # Calcula el promedio de monto por cliente

# Ruta para obtener el total de transacciones por mes
@transacciones_bp.route("/totales_mensuales", methods=["GET"])
def totales_mensuales():
    return jsonify(service.total_mensual())  # Agrupa los montos por mes (formato YYYY-MM) y suma

# Ruta para obtener la transacción más alta registrada por cada cliente
@transacciones_bp.route("/mayor_pago_por_cliente", methods=["GET"])
def mayor_pago_por_cliente():
    return jsonify(service.mayor_pago_por_cliente())  # Devuelve el mayor pago que hizo cada cliente
