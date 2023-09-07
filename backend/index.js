const Express = require('express')
const cors = require('cors')
const { getApiData } = require('./controllers/apiController')
const { validarArrayData, enviarArrayData } = require('./controllers/validationController')



const app = Express()

app.use(Express.json())
app.use(cors())
app.use(Express.static("../frontend/build"))

app.get('/api', getApiData)

app.post('/validar', validarArrayData)

app.post('/aplicar', enviarArrayData)

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})

