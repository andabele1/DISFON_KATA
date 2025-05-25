# 🧾 Dispersión de Fondos - Dashboard API

Este proyecto proporciona una API desarrollada con Flask para consultar, analizar y visualizar datos de transacciones financieras simuladas. Los datos se cargan desde un archivo CSV y se procesan con `pandas`.

---

## 📂 Estructura del Proyecto

DISFON_KATA
|
|----Backend/
|    |---controllers/
|    |   |--transactions_controller.py -> Rutas y endpoints 
|    |
|    |---data/
|    |   |--transacciones.csv -> datos 
|    |
|    |---models/
|    |   |--transaction_model.py -> Modelo usado para el proceso de datos
|    |
|    |---services/
|    |   |--transactions_service.py -> Logica de negocio
|    |
|    |---utils/
|    |   |--data_loader.py -> Carga de datos desde el csv
|    |
|    |---app.py -> Archivo principal de la aplicacion Flask
|    |---generation_data.py -> Archivo para generar datos aleatorios
|    |---migrar_a_sqlite.py -> Archivo para migracion a sqLite
|    |---requirements.txt -> Instalacion de librerias
|        
|----frontend/
|    |---src/
|    |   |--components/
|    |   |   |--ClientesTotales/
|    |   |   |  |--ClientesTotales.css -> Estilos de la clase ClienteTotales
|    |   |   |  |--ClienteTotales.tsx -> Clase del total dispersado por cliente
|    |   |   |  
|    |   |   |--MayorPagoPorCliente/
|    |   |   |  |--MayorPagoPorCliente.css -> Estilos de las clase MayorPagoPorCliente   
|    |   |   |  |--MayorPagoPorCliente.tsx -> Clase del Mayor pago realizado por un cliente
|    |   |   |
|    |   |   |--MostrarGrafica/
|    |   |   |  |--MostrarGrafica.css -> Estilos de la clase MostrarGrafica
|    |   |   |  |--MostrarGrafica.tsx -> Clase donde se almacena la grafica mostrada en App
|    |   |   |
|    |   |   |--TopYPromedio/
|    |   |   |  |--TopYPromedio.css -> Estilos de la clase TopYPromedio
|    |   |   |  |--TopyPromedio.tsx -> Clase del Top 5 con mas dispersion y Promedio de las transacciones
|    |   |   |
|    |   |   |--TransaccionesPorFecha/
|    |   |   |  |--TransaccionesPorFecha.css -> Estilos de la clase TransaccionesPorFecha
|    |   |   |  |--TransaccionesPorFecha.tsx -> Clase donde e muestran las transacciones hechas en una fecha espeficica  
|    |   |   |
|    |   |   |--VisualizarTransacciones/
|    |   |   |  |--VisualizarTransacciones.css -> Estilos de la clase VisualizarTransacciones
|    |   |   |  |--VisualizarTransacciones.tsx -> Clase donde se muestran todas las transacciones
|    |   |   |
|    |   |   |--App.css -> Estilos para la clase App
|    |   |   |--App.js -> Clase donde se renderizan todos los componentes


---

## ▶️ Cómo ejecutar en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/andabele1/DISFON_KATA.git
cd https://github.com/andabele1/DISFON_KATA.git

### 2. Instalar dependencias del Backend y ejecutar

cd Backend
pip install -r requirements.txt
python app.py "o" python3 app.py

### 3. Instalar dependencias del Frontend y ejecutar

cd ..
cd frontend
npm i
npm start

## ▶️ Cómo ejecutar en Linea

### Ir a la siguiente ruta

https://disfon-kata.vercel.app

# Nota: Pueden haber un poco de demoras por si el servicio de "duerme"


### Endpoints

##/api/transacciones

# 📄 Descripción: Devuelve todas las transacciones.
# 📤 Método: GET
# 🔁 Respuesta: Lista de objetos con id, fecha, cliente, monto y medio de pago.


