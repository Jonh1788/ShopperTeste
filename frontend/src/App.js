import { useEffect, useRef, useState } from "react"
import { objectCreate } from "./utils/objectFactory"


function App() {

  const [dados, setDados ] = useState([])
  const [text, setText] = useState([])
  const [validar, setValidar] = useState(false)
  const [aplicar, setAplicar] = useState(false)
  const [modal, setModal] = useState(false)
  const inputRef = useRef(null)

  const handleFileChange = (event) => {
	const file = event.target.files[0]
	if(file){
		const reader = new FileReader()
		reader.onload = (e) => {
				const fileContent = e.target.result
        const resultFactory = objectCreate(fileContent)

				setText(resultFactory)
        

        if(resultFactory.some(objeto => {

          for(const chave in objeto){

              if(isNaN(objeto[chave])){

                  return true
              }

          }

          return false
      })){
          setModal(true)
          setText([])

        } else { fetch("http://localhost:3001/validar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
    
          body: JSON.stringify(resultFactory)
        }).then(response => response.json())
        .then(data => {
      const novosDados = [data]
      console.log(novosDados)
      setDados(novosDados[0])
          })
        .catch(err => console.log(err))}
        
			}
			reader.readAsText(file)
		}

    
	}

  const cancelarTabelaAtual = () =>{
    setText([])
    setDados([])
    setValidar(false)
    
  }

  const fecharModal = () => {
    setModal(false)
    inputRef.current.value = null
  }

  const alterarBanco = () => {

    fetch("http://localhost:3001/aplicar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
    
          body: JSON.stringify(text)
        })
        .then(response => response.json())
        .then(data => {
            cancelarTabelaAtual()
          })
        .catch(err => console.log(err))
    }

  

  const validarDados = () => {
    setValidar(true)
    const existeErro = dados.some(objeto => {
      for(const chave in objeto){
        if(chave.toLowerCase().includes('err')){
          return true
        }
      }
      return false
    })

    if(existeErro){
      setAplicar(false)
    } else {
      setAplicar(true)
    }

  }
  console.log(dados)
	
  return (
  <main className="m-0 p-0 h-screen w-full flex justify-center items-center">
    <div className="w-[80%] min-h-[500px] bg-zinc-100 flex flex-col justify-center items-center rounded overflow-y-auto">
      
     {text.length === 0 ? (
      <div>
         <h1 className="text-xl mb-2">Insira um arquivo abaixo para iniciar a validação</h1>
         <input onChange={handleFileChange} ref={inputRef} accept=".csv" className="w-full block text-sm file:bg-emerald-200 file:border-0 file:mr-4 file:py-2 file:rounded-full file:text-sm  file:text-emerald-500 file:font-semibold hover:file:bg-emerald-300" type="file"/>
         </div>
     ) : (
      <div className="w-full flex flex-col justify-between h-[500px]">
      <table className="w-[100%] h-auto">
        <thead>
        
         <tr className="">
          
          <th>Código</th>
          <th>Nome</th>
          <th>Preço Atual</th>
          <th>Novo preço</th>

         </tr>
        </thead>
        
        <tbody>
          
        {dados.map((dado) => {
          if (dado.foundError) {
            return (

              <tr key={dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}>
                <td className="bg-red-400">{dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}</td>
                <td className="bg-red-400">{dado.foundError}</td>
              </tr>

            )
          }

          return (
            <tr key={dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}>
              <td>
                {dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}
                </td>
              <td>{dado.isPack ? dado.packName : dado.name}</td>
              <td>
                {dado.isPack ? dado.packPrice : dado.sales_price}
                
                </td>
              <td>
                {dado.newValue}
                {validar && dado.valueError && (<p className="bg-red-400">{dado.valueError}</p>)}
                {validar && dado.custError && (<p className="bg-red-400">{dado.custError}</p>)}
                </td>
            </tr>
          );
        })}
        
        </tbody>
      </table>

      <div className="ml-auto flex flex-row gap-2 p-3">
      <button onClick={validarDados} className="w-28 h-10 font-semibold text-emerald-500 bg-emerald-200 border-0 rounded-full hover:bg-emerald-300">Validar</button>
      <button onClick={alterarBanco} disabled={!aplicar} className="disabled:bg-gray-400 disabled:text-zinc-900 w-28 h-10 font-semibold text-emerald-500 bg-emerald-200 border-0 rounded-full hover:bg-emerald-300">Aplicar</button>
      <button onClick={cancelarTabelaAtual} className="w-28 h-10 font-semibold text-emerald-500 bg-emerald-200 border-0 rounded-full hover:bg-emerald-300">Cancelar</button>
      </div>
      </div>
     )}
       

    </div>
    <div className={"fixed flex flex-col gap-4 justify-center items-center inset-0 flex items-center justify-center z-50 bg-emerald-300/60" + (modal ? "" : " hidden")}>
      <h1 className="text-xl font-semibold mb-6">Existem valores vazios ou que não são números no seu arquivo.</h1>
      <button onClick={fecharModal} className="w-28 h-10 font-semibold text-zinc-300 bg-slate-950 border-0 rounded-full hover:bg-slate-700">Fechar</button>
    </div> 
  </main>
  );
}

export default App;
