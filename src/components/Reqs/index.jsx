import "./styles.css";
import { useEffect, useState } from "react";
function Reqs() {
  const [conteudo, setConteudo] = useState(<p>Carregando</p>);
  const [reqs, setReqs] = useState(JSON.parse(localStorage.getItem("reqs")));

  function listarItens() {
    try {
      const itens = reqs;

      // Retorna os personagens mapeados em componentes Card
      return itens.map((item) => (
        <div className="side-item">
          <span className="typeText">{item.type} |</span>
          <span className="nameText"> {item.name}</span>
        </div>
      ));
    } catch (error) {
      console.error(error);
      setConteudo(<p>Erro ao carregar a lista</p>);
    }
  }
  useEffect(() => {
    function getConteudo() {
      const itens = listarItens();
      setConteudo(itens);
    }
    getConteudo();
  }, [reqs]);
  return (
    <div id="Reqs">
      <h2>Nex</h2>
      {conteudo}
    </div>
  );
}
export default Reqs;
