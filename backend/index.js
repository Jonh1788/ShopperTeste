const Express = require('express')
const cors = require('cors')
const { selectAll, selectPacks } = require('./db')
const { validar, enviar } = require('./validation')



const app = Express()

app.use(Express.json())
app.use(cors())

app.get('/api', async (req, res) => {
    const valores = await selectAll()
    res.json(valores)
})

app.post('/validar', async (req, res) => {

    const value = req.body
    console.log(value)
    const resposta = await validar(value.product_id, value.new_value)
    console.log(resposta)
    res.json(resposta)
})

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})

