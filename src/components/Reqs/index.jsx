import "./styles.css";
import { useEffect, useState } from "react";

function Reqs() {
  const [conteudo, setConteudo] = useState(<p>Carregando</p>);
  const [reqs, setReqs] = useState([]);

  // Função para buscar requisições
  useEffect(() => {
    window.api.fetchRequests().then(setReqs);
  }, []);

  // Função para listar itens
  function listarItens() {
    return reqs.map((item) => (
      <div className="side-item" key={item.name}>
        <span className="typeText">{item.type} |</span>
        <span className="nameText"> {item.name}</span>
      </div>
    ));
  }

  // Função para adicionar uma nova requisição
  function adicionarRequisicao() {
    const novaRequisicao = {
      name: `Requisicao ${reqs.length + 1}`, // Nome único
      type: "POST",
      url: `http://exemplo.com/api/`,
      body: "{}",
    };

    window.api
      .createRequests(novaRequisicao)
      .then((novoItem) => {
        setReqs((prevReqs) => [...prevReqs, novoItem]); // Atualiza o estado com a nova requisição
      })
      .catch((error) => {
        console.error("Erro ao adicionar requisição:", error);
      });
  }

  useEffect(() => {
    setConteudo(listarItens());
  }, [reqs]);

  return (
    <div id="Reqs">
      <h2>Nex</h2>
      {/* Botão para adicionar uma nova requisição */}
      <a className="btn" onClick={adicionarRequisicao}>
        Add
      </a>
      {conteudo}
    </div>
  );
}

export default Reqs;
