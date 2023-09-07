const Express = require('express')
const cors = require('cors')
const { selectAll, selectPacks } = require('./db')
const { validar, enviar, validarArray } = require('./validation')



const app = Express()

app.use(Express.json())
app.use(cors())

app.get('/api', async (req, res) => {
    const valores = await selectAll()
    res.json(valores)
})

app.post('/validar', async (req, res) => {

    const value = req.body
    const resposta = await validarArray(value)
    //console.log(resposta)
    res.json(resposta)
})

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})

