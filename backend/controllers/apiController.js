const { selectAll  } = require("../models/db")


const getApiData = async (req,res) => {
    try {
        const valores = await selectAll()
        res.json(valores)
    } catch (err) {
        res.status(500).json({erro:'Internal server error'})
    }
}

module.exports = { 
    getApiData 
}