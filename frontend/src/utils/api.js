const validarAPI = (objeto, setDados) => {
    fetch("http://localhost:3001/validar", {
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


const alterarBanco = (text, cancelarTabelaAtual, setAnimation) => {
    setAnimation(true)
    fetch("http://localhost:3001/aplicar", {
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
            })
        .catch(err => {
            setAnimation(false)
            console.log(err)})
    }
    
    export {
        validarAPI,
        alterarBanco
    }