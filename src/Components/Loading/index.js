import React from "react";
import "./index.css";

const logoImg = require("./loading.gif");

export default function Loading() {
  return (
    <div className="loading">
      <img alt="loadingImage" src={logoImg} />
      <h1 style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
        Carregando dados
      </h1>
    </div>
  );
}
