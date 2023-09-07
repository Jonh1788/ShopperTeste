import { useRef, useState } from "react"
import { objectCreate } from "./utils/objectFactory"
import Table from "./components/Table"
import { validarDados, validarIsNaN } from "./utils/validations"
import { alterarBanco, validarAPI } from "./utils/api"
import { Loader2 } from 'lucide-react'


function App() {

  const [dados, setDados ] = useState<any[]>([])
  const [produtos, setProdutos] = useState<any[]>([])
  const [validar, setValidar] = useState<boolean>(false)
  const [aplicar, setAplicar] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [aviso, setAviso] = useState<boolean>(false)
  const [animation, setAnimation] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
  
	const file = event.target.files?.[0]
  
	if(file){
    
		const reader = new FileReader()
		reader.onload = (e) => {
      
				const fileContent = e.target?.result as string
        const resultFactory = objectCreate(fileContent)

				setProdutos(resultFactory)

        if(validarIsNaN(resultFactory)) {
          setModal(true)
          setProdutos([])

        } else { 
          
          validarAPI(resultFactory, setDados)
        
			  }			
		}

    reader.readAsText(file)
  }  
}

  const cancelarTabelaAtual = () =>{
    setProdutos([])
    setDados([])
    setValidar(false)
    
  }

  const fecharModal = () => {
    setModal(false)
    if(inputRef.current){
      inputRef.current.value = ""
    }
    
  }

  
	
  return (
  <main className="m-0 p-0 h-screen w-full flex justify-center items-center">
    <div className="w-[80%] min-h-[600px] bg-zinc-100 flex flex-col justify-center items-center rounded overflow-y-auto">
      
     {produtos.length === 0 ? (
      <div>
        {aviso && <h1 className=" h-10 font-semibold text-emerald-500 bg-emerald-200 border-0 rounded-full ">Novos preços aplicados</h1>}
         <h1 className="text-xl mb-2">Insira um arquivo abaixo para iniciar a validação</h1>
         <input onChange={handleFileChange} ref={inputRef} accept=".csv" className="w-full block text-sm file:bg-emerald-200 file:border-0 file:mr-4 file:py-2 file:rounded-full file:text-sm  file:text-emerald-500 file:font-semibold hover:file:bg-emerald-300" type="file"/>
         </div>
     ) : (
      <div className="w-full flex flex-col justify-between h-[600px]">

      <Table dados={dados} validar={validar} />

      <div className="ml-auto flex flex-row gap-2 p-3">

      <button onClick={() => validarDados(setValidar, dados, setAplicar)} className="w-28 h-10 font-semibold text-emerald-500 bg-emerald-200 border-0 rounded-full hover:bg-emerald-300">Validar</button>
      <button onClick={() => alterarBanco(produtos, cancelarTabelaAtual, setAnimation, setAviso)} disabled={!aplicar} className="disabled:bg-gray-400 disabled:text-zinc-900 w-28 h-10 font-semibold text-emerald-500 bg-emerald-200 border-0 rounded-full hover:bg-emerald-300 flex justify-center items-center">{animation ? <Loader2 className="text-emerald-500 animate-spin" strokeWidth={4} /> : "Atualizar"}</button>
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
  
  )}

export default App;
