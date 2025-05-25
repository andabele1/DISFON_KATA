import csv
import random
from datetime import datetime, timedelta

# Lista con 20 clientes simulados, cada uno con id y nombre
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

# Medios de pago posibles para las transacciones
medios_pago = ["Transferencia", "Tarjeta", "Efectivo", "Cheque"]

# Genera una fecha aleatoria entre el 1 de enero y el 31 de mayo de 2025
def generar_fecha_aleatoria():
    fecha_inicio = datetime(2025, 1, 1)
    fecha_fin = datetime(2025, 5, 31)
    delta = fecha_fin - fecha_inicio
    dias_totales = delta.days
    dias_aleatorios = random.randint(0, dias_totales)
    fecha = fecha_inicio + timedelta(days=dias_aleatorios)
    return fecha.strftime("%Y-%m-%d")

# Genera n transacciones aleatorias y las guarda en un archivo CSV
def generar_transacciones(n=500, archivo="transacciones.csv"):
    with open(archivo, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        # Escribe la fila de cabeceras del CSV
        writer.writerow(["id_transaccion", "fecha", "cliente_id", "cliente_nombre", "monto", "medio_pago"])
        for i in range(1, n + 1):
            cliente = random.choice(clientes)  # Selecciona un cliente aleatorio
            fecha = generar_fecha_aleatoria()  # Genera una fecha aleatoria dentro del rango
            monto = round(random.uniform(100, 10000), 2)  # Monto aleatorio entre 100 y 10,000 con 2 decimales
            medio = random.choice(medios_pago)  # Medio de pago aleatorio
            # Escribe la fila de la transacción
            writer.writerow([i, fecha, cliente["cliente_id"], cliente["cliente_nombre"], monto, medio])

# Punto de entrada para generar el archivo al ejecutar el script directamente
if __name__ == "__main__":
    generar_transacciones()
    print("Archivo transacciones.csv generado con 200 registros.")
