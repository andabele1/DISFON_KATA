# 🧾 Dispersión de Fondos - Dashboard API

Este proyecto proporciona una API desarrollada con Flask para consultar, analizar y visualizar datos de transacciones financieras simuladas. Los datos se cargan desde un archivo CSV y se procesan con `pandas`.

---

## 📂 Estructura del Proyecto

```
DISFON_KATA
|
|----Backend/
|    |---controllers/
|    |   |--transactions_controller.py        -> Rutas y endpoints
|    |
|    |---data/
|    |   |--transacciones.csv                 -> Datos
|    |
|    |---models/
|    |   |--transaction_model.py              -> Modelo usado para el proceso de datos
|    |
|    |---services/
|    |   |--transactions_service.py           -> Lógica de negocio
|    |
|    |---utils/
|    |   |--data_loader.py                    -> Carga de datos desde el CSV
|    |
|    |--app.py                                -> Archivo principal de la aplicación Flask
|    |--generation_data.py                    -> Archivo para generar datos aleatorios
|    |--migrar_a_sqlite.py                    -> Archivo para migración a SQLite
|    |--requirements.txt                      -> Instalación de librerías
|
|----frontend/
|    |---src/
|    |   |--components/
|    |   |   |--ClientesTotales/
|    |   |   |   |--ClientesTotales.css       -> Estilos
|    |   |   |   |--ClienteTotales.tsx        -> Total dispersado por cliente
|    |   |
|    |   |   |--MayorPagoPorCliente/
|    |   |   |   |--MayorPagoPorCliente.css   -> Estilos
|    |   |   |   |--MayorPagoPorCliente.tsx   -> Mayor pago por cliente
|    |   |
|    |   |   |--MostrarGrafica/
|    |   |   |   |--MostrarGrafica.css        -> Estilos
|    |   |   |   |--MostrarGrafica.tsx        -> Muestra gráfica principal
|    |   |
|    |   |   |--TopYPromedio/
|    |   |   |   |--TopYPromedio.css          -> Estilos
|    |   |   |   |--TopyPromedio.tsx          -> Top 5 y promedio
|    |   |
|    |   |   |--TransaccionesPorFecha/
|    |   |   |   |--TransaccionesPorFecha.css -> Estilos
|    |   |   |   |--TransaccionesPorFecha.tsx -> Transacciones por fecha
|    |   |
|    |   |   |--VisualizarTransacciones/
|    |   |   |   |--VisualizarTransacciones.css -> Estilos
|    |   |   |   |--VisualizarTransacciones.tsx -> Muestra todas las transacciones
|    |   |
|    |   |--App.css                           -> Estilos globales
|    |   |--App.js                            -> Render de todos los componentes
```



---

## ▶️ Cómo ejecutar en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/andabele1/DISFON_KATA.git
cd https://github.com/andabele1/DISFON_KATA.git
```

### 2. Instalar dependencias del Backend y ejecutar

```bash

cd Backend
pip install -r requirements.txt
python app.py "o"  
python3 app.py

```

### 3. Instalar dependencias del Frontend y ejecutar

```bash

cd ..
cd frontend
npm i
npm start

```

## ▶️ Cómo ejecutar en Linea

```bash
### Ir a la siguiente ruta

https://disfon-kata.vercel.app

# Nota: Pueden haber un poco de demoras por si el servicio de "duerme"

```

## Endpoints

## /api/transacciones

```
Ejemplo de respuesta:

[
    {
        "cliente_id": 4,
        "cliente_nombre": "Maria Lopez",
        "fecha": "2025-02-20",
        "id_transaccion": 1,
        "medio_pago": "Efectivo",
        "monto": 8355.97
    },
    {
        "cliente_id": 11,
        "cliente_nombre": "Jorge Alvarez",
        "fecha": "2025-02-21",
        "id_transaccion": 2,
        "medio_pago": "Cheque",
        "monto": 129.59
    }
]
```
📄 Descripción: Devuelve todas las transacciones.  
📤 Método: GET  
🔁 Respuesta: Lista de objetos con id, fecha, cliente, monto y medio de pago.  


## /api/totales

```
Ejemplo de respuesta:

[
    {
        "cliente_nombre": "Ana Gomez",
        "total": 206320.16
    },
    {
        "cliente_nombre": "Andres Cruz",
        "total": 111091.24
    },
    {
        "cliente_nombre": "Carlos Diaz",
        "total": 100591.02
    },
    {
        "cliente_nombre": "Claudia Ruiz",
        "total": 139495.98
    }
]

```

📄 Descripción: Devuelve el total de dinero dispersado por cada cliente.  
📤 Método: GET  
🔁 Respuesta: Lista de objetos con cliente_nombre y total.  


## /api/top

```
Ejemplo de respuesta:

[
    {
        "cliente_nombre": "Ana Gomez",
        "monto": 206320.16
    },
    {
        "cliente_nombre": "Gabriela Herrera",
        "monto": 145523.91
    },
    {
        "cliente_nombre": "Claudia Ruiz",
        "monto": 139495.98
    },
    {
        "cliente_nombre": "Ricardo Mendoza",
        "monto": 133957.14
    },
    {
        "cliente_nombre": "Natalia Vargas",
        "monto": 133544.9
    }
]

```

📄 Descripción: Devuelve el top 5 de clientes que más dinero recibieron.  
📤 Método: GET  
🔁 Respuesta: Lista de objetos con cliente_nombre y monto.  


## /api/por_fecha/<fecha>
Ejemplo de solicitud:
## /api/por_fecha/2025-05-01

```
Ejemplo de respuesta:

[
    {
        "cliente_id": 17,
        "cliente_nombre": "Ricardo Mendoza",
        "fecha": "2025-05-01",
        "id_transaccion": 366,
        "medio_pago": "Tarjeta",
        "monto": 3474.98
    }
]

```

📄 Descripción: Devuelve todas las transacciones realizadas en una fecha específica.  
📤 Método: GET  
🔁 Respuesta: Lista de objetos con cliente_id, cliente_nombre, fehca, id_transaccion, medio_pago y monto.  


## /api/totales_mensuales

```
Ejemplo de respuesta:

[
    {
        "mes": "2025-01",
        "total": 482266.6
    },
    {
        "mes": "2025-02",
        "total": 460839.81
    },
    {
        "mes": "2025-03",
        "total": 420719.07
    },
    {
        "mes": "2025-04",
        "total": 506072.1
    },
    {
        "mes": "2025-05",
        "total": 460663.71
    }
]

```

📄 Descripción: Devuelve el total de dinero dispersado agrupado por mes.  
📤 Método: GET  
🔁 Respuesta: Lista de objetos con mes y total.  


## /api/promedios

```
Ejemplo de respuesta:

[
    {
        "cliente_nombre": "Ana Gomez",
        "promedio": 5032.2
    },
    {
        "cliente_nombre": "Andres Cruz",
        "promedio": 3703.04
    },
    {
        "cliente_nombre": "Carlos Diaz",
        "promedio": 5029.55
    },
    {
        "cliente_nombre": "Claudia Ruiz",
        "promedio": 5579.84
    }
]

```

📄 Descripción: Devuelve el monto promedio dispersado por cliente (en el frontend se promedian estos promedios).  
📤 Método: GET  
🔁 Respuesta: Lista de objetos con mes y total.  


## /api/mayor_pago_por_cliente

```
Ejemplo de respuesta:

[
    {
        "cliente_nombre": "Claudia Ruiz",
        "fecha": "2025-04-04",
        "id_transaccion": 381,
        "monto": 9969.94
    },
    {
        "cliente_nombre": "Maria Lopez",
        "fecha": "2025-02-15",
        "id_transaccion": 163,
        "monto": 9946.69
    }
]

```

📄 Descripción: Devuelve la transacción de mayor valor por cada cliente.  
📤 Método: GET  
🔁 Respuesta: Lista de objetos con mes y total.  


## Migracion a sqLite

Se agrego la manera de migrar el .csv a una DB en sqlLite, siga los siguientes pasos para realizarlo:  

Nota: Si el Backend ya esta ejecutandose, en la terminal haga el comando "Ctrl + C" para poder terminarlo

### Paso 1

``` bash

cd Backend
python migrar_a_sqlite.py "o"  
python3 migrar_a_sqlite.py

```

### Paso 2 

Dirijase a la carpeta utils y comente el siguiente codigo: (De la linea 1 a la linea 10)

```
import pandas as pd
import os

# Función para cargar las transacciones desde un archivo CSV
def cargar_transacciones():
    # Construye la ruta al archivo 'transacciones.csv' ubicado en la carpeta 'data' (nivel superior al actual)
    ruta = os.path.join(os.path.dirname(__file__), '..', 'data', 'transacciones.csv')
    # Lee el archivo CSV y devuelve un DataFrame de pandas con los datos
    df = pd.read_csv(ruta)
    return df

```

### Paso 3

Descomente el siguiente codigo: (De la linea 13 a la linea 25)

```

# import sqlite3
# import pandas as pd

# DB_PATH = "transacciones.db"

# def cargar_transacciones():
#     # Abre una conexión a la base de datos SQLite
#     conn = sqlite3.connect(DB_PATH)
#     # Ejecuta una consulta SQL para traer todas las filas de la tabla 'transacciones'
#     df = pd.read_sql_query("SELECT * FROM transacciones", conn)
#     # Cierra la conexión a la base de datos
#     conn.close()
#     return df

```

### Ejecute el Backend

```bash

python app.py "o"  
python3 app.py

```

