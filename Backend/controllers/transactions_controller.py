from flask import Blueprint, jsonify
from services import transactions_service as service

transacciones_bp = Blueprint("transacciones", __name__, url_prefix="/api")

@transacciones_bp.route("/transacciones", methods=["GET"])
def todas():
    return jsonify(service.obtener_todas())

@transacciones_bp.route("/totales", methods=["GET"])
def totales():
    return jsonify(service.total_por_cliente())

@transacciones_bp.route("/top", methods=["GET"])
def top():
    return jsonify(service.cliente_top())

@transacciones_bp.route("/por_fecha/<fecha>", methods=["GET"])
def por_fecha(fecha):
    return jsonify(service.transacciones_por_fecha(fecha))

@transacciones_bp.route("/totales_por_fecha", methods=["GET"])
def totales_por_fecha():
    return jsonify(service.transacciones_por_fecha_agrupadas())

@transacciones_bp.route("/promedios", methods=["GET"])
def promedios():
    return jsonify(service.promedio_por_cliente())

@transacciones_bp.route("/totales_mensuales", methods=["GET"])
def totales_mensuales():
    return jsonify(service.total_mensual())

