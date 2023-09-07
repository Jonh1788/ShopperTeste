const validarIsNaN = (objeto) => {

    objeto.some(objeto => {

        for(const chave in objeto){

            if(isNaN(objeto[chave])){

                return true
            }

        }

        return false
    })
}

const validarDados = (setValidar, dados, setAplicar) => {
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

export {
    validarIsNaN,
    validarDados
}