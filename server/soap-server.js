// soap-server.js
import express from "express";
import soap from "soap";
import fs from "fs";
import http from "http";
import { pool } from "./src/config/db.js";

const service = {
  GymService: {
    GymServicePort: {
      async ListAvailableClasses() {
            console.log("📩 Petición SOAP recibida -> ListAvailableClasses");

            try {
                const [rows] = await pool.query(
                "SELECT id, nombre AS name, descripcion AS description, cant_personas AS spots FROM clase"
                );

                console.log("📤 Datos obtenidos de MySQL:", rows);

                return {
                classes: {
                    class: rows.map(r => ({
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    spots: r.spots,
                    })),
                },
    };
  } catch (err) {
    console.error("❌ Error consultando MySQL:", err);
    return { classes: { class: [] } };
  }
}
,
    },
  },
};

const wsdlXml = fs.readFileSync("gym.wsdl", "utf8");
const app = express();
const server = http.createServer(app);

server.listen(8001, () => {
  soap.listen(server, "/soap", service, wsdlXml);
  console.log("✅ SOAP server con MySQL listo en http://localhost:8001/soap?wsdl");
});
