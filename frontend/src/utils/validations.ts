import { Produtos } from "./objectFactory"

const validarIsNaN = (objeto : any[]): boolean => {

    objeto.some((objeto: any)  => {

        for(const chave in objeto){

            if(isNaN(objeto[chave])){

                return true
            }

        }

        return false
    })

    return false
}

const validarDados = (setValidar: React.Dispatch<React.SetStateAction<boolean>>, 
  dados: any[], 
  setAplicar: React.Dispatch<React.SetStateAction<boolean>>
  ) => {

    setValidar(true)
    const existeErro = dados.some((objeto: any) => {
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

export {
    validarIsNaN,
    validarDados
}