export type Produtos = {
	product_code: string,
	new_price: string
}


const objectCreate = (separar : string) => {

	const arrayStrings: string[] = separar.replaceAll('\r', '').replaceAll(' ', '').split('\n')
	const arrayObject: Produtos[] = []
	console.log(arrayStrings)
	for(let i = 1; i < arrayStrings.length; i++){
	
	 const proximo: string[] = arrayStrings[i].split(',')
	 if(proximo[0].length > 0){
			const objeto: Produtos = {
				product_code: (isNaN(Number(proximo[0])) ? "NaN": proximo[0]),
				new_price: (isNaN(Number(proximo[1])) ? "NaN": proximo[1]),
			}

			arrayObject.push(objeto)
		}
	}

	return arrayObject
}

export { objectCreate }
