const objectCreate = (separar) => {

	const arrayStrings = separar.replaceAll('\r', '').replaceAll(' ', '').split('\n')
	const headers = arrayStrings[0].split(',')
	const arrayObject = []
	console.log(arrayStrings)
	for(let i = 1; i < arrayStrings.length; i++){
	
	 const proximo = arrayStrings[i].split(',')
	 if(proximo[0].length > 0){
			Number(proximo[0])
			const objeto = {
				[headers[0]]: (isNaN(Number(proximo[0])) ? "NaN": proximo[0]),
				[headers[1]]: (isNaN(Number(proximo[1])) ? "NaN": proximo[1]),
			}

			arrayObject.push(objeto)
		}
	}

	return arrayObject
}

export { objectCreate }
