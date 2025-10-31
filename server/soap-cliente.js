// soap-client.js
import express from "express";
import soap from "soap";
import cors from "cors"; 

const app = express();

// URL del servicio SOAP (tu soap-server)
const SOAP_URL = "http://localhost:8001/soap?wsdl";
app.use(cors()); 

// Endpoint REST -> devuelve JSON usando el SOAP
app.get("/api/classes", async (req, res) => {
  try {
    // 1️⃣ Crear cliente SOAP
    const client = await soap.createClientAsync(SOAP_URL);

    
    // 🔍 Mostrar el XML del request que se enviará
    client.on('request', (xml) => {
      console.log("🟢 XML ENVIADO AL SERVIDOR SOAP:");
      console.log(xml);
    });

    // 🔍 Mostrar el XML que responde el servidor SOAP
    client.on('response', (xml) => {
      console.log("🔵 XML RECIBIDO DESDE EL SERVIDOR SOAP:");
      console.log(xml);
    });

    // 2️⃣ Llamar la operación SOAP (no necesita parámetros)
    const [result] = await client.ListAvailableClassesAsync({});

    // 3️⃣ Extraer los datos del resultado
    const classes = result?.classes?.class && Array.isArray(result.classes.class)
    ? result.classes.class
    : result?.classes?.class
    ? [result.classes.class]
    : [];

    // 4️⃣ Enviar como JSON al frontend
    res.json({ classes });
  } catch (error) {
    console.error("❌ Error al consumir SOAP:", error);
    res.status(500).json({ error: "Error al obtener clases desde SOAP" });
  }
});

app.listen(8002, () => {
  console.log("✅ API REST escuchando en http://localhost:8002/api/classes");
});
