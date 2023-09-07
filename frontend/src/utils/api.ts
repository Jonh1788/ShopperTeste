


const validarAPI = (objeto : any, 
    setDados: React.Dispatch<React.SetStateAction<any[]>>) => {
    fetch("/validar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
    
          body: JSON.stringify(objeto)
        }).then(response => response.json())
        .then(data => {
      const novosDados = [data]
      console.log(novosDados)
      setDados(novosDados[0])
          })
        .catch(err => console.log(err))
    }


const alterarBanco = (text: any, 
    cancelarTabelaAtual: () => void, 
    setAnimation : React.Dispatch<React.SetStateAction<boolean>>,
    setAviso : React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    setAnimation(true)
    fetch("/aplicar", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
    
            body: JSON.stringify(text)
        })
        .then(response => response.json())
        .then(data => {
            setAnimation(false)
            cancelarTabelaAtual()
            setAviso(true)
            setTimeout(() => {
                setAviso(false)
            }, 3000);
            })
        .catch(err => {
            setAnimation(false)
            console.log(err)})
    }
    
    export {
        validarAPI,
        alterarBanco
    }