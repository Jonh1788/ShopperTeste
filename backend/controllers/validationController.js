const { validarArray, enviarArray  } = require("../models/validation")


const validarArrayData = async (req, res) => {
    const value = req.body

    try{
        const resposta = await validarArray(value)
        res.json(resposta)
    } catch (err){
        res.status(500).json({error: err})
    }
}

const enviarArrayData = async (req, res) => {
    const value = req.body

    try{
        const resposta = await enviarArray(value)
        res.json(resposta)
    } catch (err){
        res.status(500).json({error:err})
    }
}


module.exports = {
    enviarArrayData,
    validarArrayData
}