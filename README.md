# NukeGym FEI

Guia rapida para usar NukeGym, dividida en un frontend React y un backend Node.js con soporte REST + SOAP.

## Requisitos

- Node.js 18 o superior
- npm (incluido con Node.js)
- MySQL en ejecución con la base de datos configurada

## Instalación de dependencias

Abre una terminal PowerShell en la raíz del proyecto y ejecuta:

```powershell
# Backend
cd server
npm install

# Frontend
cd ..\client
npm install
```

## Variables de entorno

Asegúrate de completar los archivos `.env` en `server/` y `client/` con tus credenciales y claves (por ejemplo: conexión a MySQL, claves de NewsAPI, etc.).

> Para probar los flujos de pago con Mercado Pago, expone tu backend con [Ngrok](https://ngrok.com/).

##  Paso a paso para ejecutarlo

Usa terminales independientes para cada servicio:

1. **Backend REST (Express)**
   ```powershell
   cd server
   npm run dev
   ```
2. **Frontend React**
   ```powershell
   cd client
   npm start
   ```
3. **SOAP Server**
   ```powershell
   cd server
   node soap-server.js
   ```
4. **SOAP REST Wrapper**
   ```powershell
   cd server
   node soap-cliente.js
   ```
