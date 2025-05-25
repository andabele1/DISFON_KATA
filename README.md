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

```bash
### 2. Instalar dependencias del Backend y ejecutar

cd Backend
pip install -r requirements.txt
python app.py "o" python3 app.py
```

```bash
### 3. Instalar dependencias del Frontend y ejecutar

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

### Endpoints

##/api/transacciones

# 📄 Descripción: Devuelve todas las transacciones.
# 📤 Método: GET
# 🔁 Respuesta: Lista de objetos con id, fecha, cliente, monto y medio de pago.


