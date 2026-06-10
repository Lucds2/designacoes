import React, { useState } from 'react';
import { listaVoluntarios } from './voluntarios';
import './App.css';
import logoImg from './Logo.png'; // Garanti que está como .png que resolveu antes!

function App() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [valorSelect, setValorSelect] = useState("");

  // Ordena os nomes em ordem alfabética para facilitar a busca por rolagem
  const voluntariosOrdenados = [...listaVoluntarios].sort((a, b) => 
    a.nome.localeCompare(b.nome)
  );

  const handleSelectChange = (e) => {
    const nomeProcurado = e.target.value;
    setValorSelect(nomeProcurado);
    const voluntario = listaVoluntarios.find(v => v.nome === nomeProcurado);
    setUsuarioSelecionado(voluntario);
  };

  // Função mágica que limpa a tela e reseta o campo de escolha
  const handleLimpar = () => {
    setUsuarioSelecionado(null);
    setValorSelect("");
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Logo Curitiba 2026" className="logo-app" />
        <h1>Congresso Internacional 2026</h1>
        <h2>Supervisores de Caixas — Designação Individual</h2>
      </header>

      <main className="content">
        <div className="search-section">
          <label htmlFor="select-voluntario">Selecione seu nome na lista:</label>
          <select 
            id="select-voluntario" 
            onChange={handleSelectChange} 
            value={valorSelect}
            className="select-field"
          >
            <option value="" disabled>-- Clique para rolar e buscar seu nome --</option>
            {voluntariosOrdenados.map((voluntario, index) => (
              <option key={index} value={voluntario.nome}>
                {voluntario.nome}
              </option>
            ))}
          </select>

          {/* O botão só aparece na tela se houver alguém selecionado */}
          {usuarioSelecionado && (
            <button onClick={handleLimpar} className="btn-limpar">
              Limpar Seleção / Sair
            </button>
          )}
        </div>

        {usuarioSelecionado && (
          <div className="card-designacao">
            <div className="card-header">
              <h3>{usuarioSelecionado.nome}</h3>
              <p className="badge-congregacao">{usuarioSelecionado.congregacao}</p>
              <div className="contato-voluntario">
                <span>{usuarioSelecionado.celular}</span>
                {usuarioSelecionado.email && usuarioSelecionado.email !== "NaN" && (
                  <span> • {usuarioSelecionado.email}</span>
                )}
              </div>
            </div>

            <div className="resumo-designacoes">
              <span>Total de Designações: <strong>{usuarioSelecionado.escalas.length}</strong></span>
            </div>

            <div className="escalas-container">
              <h4>Seus Turnos e Horários:</h4>
              {usuarioSelecionado.escalas.map((escala, idx) => (
                <div key={idx} className="escala-item">
                  <div className="escala-meta">
                    <span className="tag-dia">{escala.dia}</span>
                    <span className="tag-horario">{escala.horario}</span>
                  </div>
                  <div className="escala-detalhes">
                    <p><strong>Setor:</strong> {escala.setor}</p>
                    <p><strong>Posição:</strong> {escala.posicao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Congresso Felicidade Eterna — Curitiba 2026</p>
      </footer>
    </div>
  );
}

export default App;