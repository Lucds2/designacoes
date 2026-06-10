import React, { useState } from "react";
import listaVoluntarios from "./voluntarios.json";

import "./App.css"; // Importando o seu CSS
import logoImg from './Logo.png'; // Garanti que está como .png que resolveu antes!


function App() {
  const [abaAtiva, setAbaAtiva] = useState("supervisor");

  return (
    <div className="container">
      <header className="header">
        <div style={{ textAlign: "center" }}>
          <img src={logoImg} alt="Logo Curitiba 2026" className="logo-app" />
        </div>
        <h1>Supervisores de Caixas</h1>
        <h2>Designação Individual - Congresso 2026</h2>
      </header>

      {/* Navegação entre Abas */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          className="btn-limpar"
          onClick={() => setAbaAtiva("supervisor")}
        >
          Sou Supervisor
        </button>
        <button className="btn-limpar" onClick={() => setAbaAtiva("consulta")}>
          Quem é meu supervisor?
        </button>
      </div>

      {abaAtiva === "supervisor" ? <TelaSupervisor /> : <TelaConsulta />}

      <footer className="footer">Congresso Internacional Curitiba 2026</footer>
    </div>
  );
}

function TelaSupervisor() {
  const [nomeSelecionado, setNomeSelecionado] = useState("");

  // Encontra o voluntário baseado no que foi escolhido no select
  const voluntarioEncontrado = listaVoluntarios.find(
    (v) => v.nome === nomeSelecionado,
  );

  return (
    <div className="search-section">
      <label>Selecione seu nome:</label>
      <select
        className="select-field"
        value={nomeSelecionado}
        onChange={(e) => setNomeSelecionado(e.target.value)}
      >
        <option value="">-- Escolha seu nome --</option>
        {/* Ordena os nomes alfabeticamente para facilitar a busca */}
        {listaVoluntarios
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((v) => (
            <option key={v.nome} value={v.nome}>
              {v.nome}
            </option>
          ))}
      </select>

      {voluntarioEncontrado ? (
        <div className="card-designacao" style={{ marginTop: "20px" }}>
          <div className="card-header">
            <h3>{voluntarioEncontrado.nome}</h3>
          </div>
          <p className="badge-congregacao">
            {voluntarioEncontrado.congregacao}
          </p>
          <div className="contato-voluntario">
            {voluntarioEncontrado.celular}
          </div>

          <div className="escalas-container">
            <h4>Suas Escalas:</h4>
            {voluntarioEncontrado.escalas.map((esc, index) => (
              <div key={index} className="escala-item">
                <div className="escala-meta">
                  <span className="tag-dia">{esc.dia}</span>
                  <span className="tag-horario">{esc.horario}</span>
                </div>
                <div className="escala-detalhes">
                  <p>
                    <strong>Setor:</strong> {esc.setor}
                  </p>
                  <p>
                    <strong>Posição:</strong> {esc.posicao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>
          Selecione seu nome na lista para ver suas designações.
        </p>
      )}
    </div>
  );
}

function TelaConsulta() {
  const [dia, setDia] = useState("");
  const [horario, setHorario] = useState("");
  const [setor, setSetor] = useState("");

  const resultado =
    dia && horario && setor
      ? listaVoluntarios.find((v) =>
          v.escalas.some(
            (e) => e.dia === dia && e.horario === horario && e.setor === setor,
          ),
        )
      : null;

  return (
    <div className="search-section">
      <select className="select-field" onChange={(e) => setDia(e.target.value)}>
        <option value="">Selecione o Dia</option>
        {["Sexta Feira", "Sábado", "Domingo"].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        className="select-field"
        onChange={(e) => setHorario(e.target.value)}
      >
        <option value="">Selecione o Horário</option>
        <option value="08h às 09:20">08h às 09:20</option>
        <option value="12:10 às 13:35">12:10 às 13:35</option>
        <option value="15:30 às 18:00">15:30 às 18:00</option>
      </select>

      <select
        className="select-field"
        onChange={(e) => setSetor(e.target.value)}
      >
        <option value="">Selecione o Setor</option>
        <option value="Primeiro Anel">Primeiro Anel</option>
        <option value="Segundo Anel">Segundo Anel</option>
        <option value="Terceiro Anel">Terceiro Anel</option>
        <option value="Gramado">Gramado</option>
      </select>

      {resultado && (
        <div className="card-designacao">
          <h3>Responsável:</h3>
          <p>
            <strong>{resultado.nome}</strong>
          </p>
          <p className="badge-congregacao">{resultado.congregacao}</p>
          <p className="contato-voluntario">{resultado.celular}</p>
        </div>
      )}
    </div>
  );
}

export default App;
