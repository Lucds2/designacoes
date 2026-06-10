import React, { useState } from "react";
import listaVoluntarios from "./voluntarios.json";
import "./App.css";
import logoImg from './Logo.png';

// --- TELA DO SUPERVISOR ---
function TelaSupervisor() {
  const [nomeSelecionado, setNomeSelecionado] = useState("");
  const voluntarioEncontrado = listaVoluntarios.find((v) => v.nome === nomeSelecionado);

  return (
    <div className="search-section">
      <label>Selecione seu nome:</label>
      <select className="select-field" value={nomeSelecionado} onChange={(e) => setNomeSelecionado(e.target.value)}>
        <option value="">-- Escolha seu nome --</option>
        {listaVoluntarios.sort((a, b) => a.nome.localeCompare(b.nome)).map((v) => (
          <option key={v.nome} value={v.nome}>{v.nome}</option>
        ))}
      </select>
      {nomeSelecionado && <button className="btn-limpar" onClick={() => setNomeSelecionado('')} style={{marginTop:'10px', display:'block', width:'100%'}}>Limpar Seleção</button>}
      {voluntarioEncontrado && (
        <div className="card-designacao" style={{ marginTop: "20px" }}>
          <h3>{voluntarioEncontrado.nome}</h3>
          <p className="badge-congregacao">{voluntarioEncontrado.congregacao}</p>
          <p>{voluntarioEncontrado.celular}</p>
          <h4>Suas Escalas:</h4>
          {voluntarioEncontrado.escalas.map((esc, index) => (
            <div key={index} className="escala-item">
              <span className="tag-dia">{esc.dia}</span> <span>{esc.horario}</span> - {esc.setor}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- TELA DE CONSULTA ---
function TelaConsulta() {
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');
  const [setor, setSetor] = useState('');

  const todasAsEscalas = listaVoluntarios.flatMap(v => v.escalas);
  const diasUnicos = [...new Set(todasAsEscalas.map(e => e.dia))].sort();
  const horariosDisponiveis = [...new Set(todasAsEscalas.filter(e => e.dia === dia).map(e => e.horario))].sort();
  const setoresDisponiveis = [...new Set(todasAsEscalas.filter(e => e.dia === dia && e.horario === horario).map(e => e.setor))].sort();

  const resultado = listaVoluntarios.find(v => v.escalas.some(e => e.dia === dia && e.horario === horario && e.setor === setor));

  return (
    <div className="search-section">
      <select className="select-field" value={dia} onChange={(e) => {setDia(e.target.value); setHorario(''); setSetor('');}}>
        <option value="">Selecione o Dia</option>
        {diasUnicos.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select className="select-field" value={horario} onChange={(e) => {setHorario(e.target.value); setSetor('');}} disabled={!dia}>
        <option value="">{dia ? "Selecione o Horário" : "Escolha o dia primeiro"}</option>
        {horariosDisponiveis.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
      <select className="select-field" value={setor} onChange={(e) => setSetor(e.target.value)} disabled={!horario}>
        <option value="">{horario ? "Selecione o Setor" : "Escolha o horário primeiro"}</option>
        {setoresDisponiveis.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      {(dia || horario || setor) && <button className="btn-limpar" onClick={() => {setDia(''); setHorario(''); setSetor('');}} style={{marginTop:'10px', display:'block', width:'100%'}}>Limpar Consulta</button>}
      {resultado && (
        <div className="card-designacao">
          <h3>Responsável:</h3>
          <p><strong>{resultado.nome}</strong></p>
          <p>{resultado.congregacao}</p>
        </div>
      )}
    </div>
  );
}

// --- APP PRINCIPAL (CONTROLE DE SENHA) ---
function App() {
  const [senha, setSenha] = useState("");
  const [acesso, setAcesso] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState(null);

  const verificarSenha = () => {
    if (senha === "Mateus2414") { setAcesso("supervisor"); setAbaAtiva("supervisor"); }
    else if (senha === "Apocalipse214") { setAcesso("consulta"); setAbaAtiva("consulta"); }
    else { alert("Senha incorreta!"); }
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Logo" className="logo-app" />
        <h1>Supervisores de Caixas</h1>
      </header>
      {!acesso ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3>Acesso Restrito</h3>
          <input type="password" className="select-field" placeholder="Digite a senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button className="btn-limpar" onClick={verificarSenha} style={{ marginTop: "10px" }}>Entrar</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
            <button className="btn-limpar" disabled={acesso === "consulta"} onClick={() => setAbaAtiva("supervisor")}>Sou Supervisor</button>
            <button className="btn-limpar" disabled={acesso === "supervisor"} onClick={() => setAbaAtiva("consulta")}>Quem é meu supervisor?</button>
          </div>
          {abaAtiva === "supervisor" ? <TelaSupervisor /> : <TelaConsulta />}
        </>
      )}
      <footer className="footer">Congresso Internacional Curitiba 2026</footer>
    </div>
  );
}

export default App;