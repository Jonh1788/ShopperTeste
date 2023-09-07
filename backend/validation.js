const { selectOne, atualizar, selectUnits, hasPack, GroupReturn, isPack } = require("./db")

const validar = async (prodID, newValue) => {

    await GroupReturn();
    const id = Number(prodID)
    const novoValor = Number(newValue)
    const res = await hasPack(id) ? await selectUnits(id) : await selectOne(id)
    const dados = res[0]

    if(res.length === 0){
        
        return {foundError: `Produto com code ${prodID} não encontrado` }
    }
	dados.newValue = novoValor

    let sales_price = 0
    let cost_price = 0

    if(await isPack(id)){
        sales_price = dados.packPrice
        cost_price = dados.packCostPrice

    } else {
        sales_price = dados.sales_price
        cost_price = dados.cost_price
    }
    

    if(novoValor < cost_price) {
        
        dados.custError = "Preço do produto abaixo do preço de custo!"
        
    }

    const diffValue = (novoValor - sales_price).toFixed(2)
    const diffValueAbs = Math.abs(diffValue)
    if(diffValueAbs !== Number((sales_price * 0.10).toFixed(2))){

        dados.valueError = "Novo preço não pode ser menor ou maior que 10% do valor atual"
        return dados
    }

    dados.diffValue = diffValue

    return dados

}

const enviar = async (prodID, new_value)  => {

    const dados = await validar(prodID, new_value)
    console.log(dados)
    const id = Number(prodID)
    const novoValor = Number(new_value)
    if(await isPack(id)){

        await atualizar(id, novoValor)
        if(dados.productID.length > 1){ 
            return dados
        }
        
        const productID = dados.productID[0]
        const valorUnit = novoValor/dados.qty
        console.log(valorUnit.toFixed(2))
        await atualizar(productID, valorUnit)
        dados.products = await selectOne(productID)
        return dados
    }

    if(dados.packPrice){

        console.log(dados.diffValue)
        const newPackPrice = (dados.diffValue * Number(dados.qty)) + Number(dados.packPrice)
        
        await atualizar(dados.pack_code, newPackPrice)
        

    }

    await atualizar(id, novoValor)
}

const validarArray = async (objetos) => {
        
	const objetosValidados = []

	
        for(const objeto of objetos){
	const objetoValidado = await validar(Number(objeto.product_code), Number(objeto.new_price))
	objetosValidados.push(objetoValidado)
	}
	
	console.log(objetosValidados)
	return objetosValidados
}

module.exports = {
    validar,
    enviar,
    validarArray
}
