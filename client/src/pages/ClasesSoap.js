import React, { useEffect, useState } from "react";
import axios from "axios";
import fondoGym from "../img/fondo.jpg";

function ClasesSoap() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await axios.get("http://localhost:8002/api/classes");
        console.log(res.data.classes)
        setClasses(res.data.classes || []);
      } catch (err) {
        console.error("❌ Error al obtener clases desde SOAP:", err);
        setError("No se pudieron cargar las clases");
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${fondoGym})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "100px",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "30px 50px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.7)",
          width: "80%",
          maxWidth: "900px",
        }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
          Clases Disponibles en <span style={{ color: "#f97809" }}>NukeGym</span>
        </h2>

        {loading ? (
          <p style={{ fontSize: "18px", opacity: 0.8 }}>Cargando clases...</p>
        ) : error ? (
          <p style={{ fontSize: "18px", opacity: 0.8, color: "red" }}>{error}</p>
        ) : classes.length === 0 ? (
          <p style={{ fontSize: "18px", opacity: 0.8 }}>No hay clases registradas.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {classes.map((c) => (
              <div
                key={c.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "15px",
                  textAlign: "left",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h3 style={{ color: "#f97809", marginBottom: "5px" }}>{c.name}</h3>
                <p style={{ margin: "5px 0", opacity: 0.9 }}>{c.description}</p>
                <p style={{ fontSize: "16x", opacity: 0.8 }}>
                  Cantidad maxima de personas: {c.spots}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClasesSoap;
