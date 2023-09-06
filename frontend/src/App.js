import { useEffect, useState } from "react";


function App() {

  const [dados, setDados ] = useState([])

  const pegarDadosServidor = () => {
    fetch("http://localhost:3001/validar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({product_id: 26, new_value: 5.67})
    }).then(response => response.json())
    .then(data => setDados(dados.concat(data)))
    .catch(err => console.log(err))
  }
  return (
  <main>
    <form>
      <input type="file" />
      <button type="button" onClick={pegarDadosServidor}>Validar</button>
    </form>

    <ul>
      {dados.map((dado) => <li key={dado.code}>{dado.name} {dado?.valueError}</li>)}
    </ul>
  </main>
  );
}

export default App;
