import { useEffect, useState } from "react"
import { objectCreate } from "./utils/objectFactory"


function App() {

  const [dados, setDados ] = useState([])
  const [text, setText] = useState([])
  const handleFileChange = (event) => {
	const file = event.target.files[0]
	if(file){
		const reader = new FileReader()
		reader.onload = (e) => {
				const fileContent = e.target.result
				setText(objectCreate(fileContent))
			}

			reader.readAsText(file)
			console.log(text)
		}
	}

  const pegarDadosServidor = () => {
    fetch("http://localhost:3001/validar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(text)
    }).then(response => response.json())
    .then(data => {
	const novosDados = [data]
	setDados(novosDados)
			})
    .catch(err => console.log(err))
  }
	
  return (
  <main className="m-0 p-0 h-screen w-full flex justify-center items-center">
	<div className="w-[80%] min-h-[500px] bg-zinc-100 flex flex-col justify-center items-center">
		<input onChange={handleFileChange} placeholder="Oi balde" className="w-full p-2 file:bg-emerald-200 file:border-none file:rounded-full h-8 file:text-sm file:shadow-md file:text-emerald-500 file:font-semibold" type="file" />
				<p>{JSON.stringify(dados)}</p>
				<button onClick={pegarDadosServidor}>Validar</button>
	</div>
  </main>
  );
}

export default App;
