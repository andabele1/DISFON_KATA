import csv
import random
from datetime import datetime, timedelta

clientes = [
    {"cliente_id": 1, "cliente_nombre": "Juan Perez"},
    {"cliente_id": 2, "cliente_nombre": "Ana Gomez"},
    {"cliente_id": 3, "cliente_nombre": "Luis Martinez"},
    {"cliente_id": 4, "cliente_nombre": "Maria Lopez"},
    {"cliente_id": 5, "cliente_nombre": "Carlos Diaz"},
    {"cliente_id": 6, "cliente_nombre": "Sofia Ramirez"},
    {"cliente_id": 7, "cliente_nombre": "Miguel Torres"},
    {"cliente_id": 8, "cliente_nombre": "Laura Fernandez"},
    {"cliente_id": 9, "cliente_nombre": "Diego Sanchez"},
    {"cliente_id": 10, "cliente_nombre": "Elena Castillo"},
    {"cliente_id": 11, "cliente_nombre": "Jorge Alvarez"},
    {"cliente_id": 12, "cliente_nombre": "Paula Morales"},
    {"cliente_id": 13, "cliente_nombre": "Andres Cruz"},
    {"cliente_id": 14, "cliente_nombre": "Gabriela Herrera"},
    {"cliente_id": 15, "cliente_nombre": "Fernando Rojas"},
    {"cliente_id": 16, "cliente_nombre": "Natalia Vargas"},
    {"cliente_id": 17, "cliente_nombre": "Ricardo Mendoza"},
    {"cliente_id": 18, "cliente_nombre": "Valeria Soto"},
    {"cliente_id": 19, "cliente_nombre": "Martin Castro"},
    {"cliente_id": 20, "cliente_nombre": "Claudia Ruiz"},
]

medios_pago = ["Transferencia", "Tarjeta", "Efectivo", "Cheque"]

def generar_fecha_aleatoria():
    fecha_inicio = datetime(2025, 1, 1)
    fecha_fin = datetime(2025, 5, 31)
    delta = fecha_fin - fecha_inicio
    dias_totales = delta.days
    dias_aleatorios = random.randint(0, dias_totales)
    fecha = fecha_inicio + timedelta(days=dias_aleatorios)
    return fecha.strftime("%Y-%m-%d")

def generar_transacciones(n=500, archivo="transacciones.csv"):
    with open(archivo, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["id_transaccion", "fecha", "cliente_id", "cliente_nombre", "monto", "medio_pago"])
        for i in range(1, n+1):
            cliente = random.choice(clientes)
            fecha = generar_fecha_aleatoria()
            monto = round(random.uniform(100, 10000), 2)
            medio = random.choice(medios_pago)
            writer.writerow([i, fecha, cliente["cliente_id"], cliente["cliente_nombre"], monto, medio])

if __name__ == "__main__":
    generar_transacciones()
    print("Archivo transacciones.csv generado con 200 registros.")
