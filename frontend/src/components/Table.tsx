type ProdutoBancoDeDados = {
  
    isPack?: boolean
    pack_code?: string
    unity_code?: string
    code?: string
    foundError?: string
    packName?: string
    name?: string
    packPrice?: string
    sales_price?: string
    newValue?: string
    valueError?: string
    custError?: string
  
}

type TableProps = {
  dados: ProdutoBancoDeDados[];
  validar: boolean;
};

const Table : React.FC<TableProps> = ({ dados, validar }) => {

    return(
        <table className="w-[100%] h-auto">
        <thead>
        
         <tr className="">
          
          <th>Código</th>
          <th>Nome</th>
          <th>Preço Atual</th>
          <th>Novo preço</th>

         </tr>
        </thead>
        
        <tbody>
          
        {dados.map((dado) => {
          if (dado.foundError) {
            return (

              <tr key={dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}>
                <td className="bg-red-400">{dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}</td>
                <td className="bg-red-400">{dado.foundError}</td>
              </tr>

            )
          }

          return (
            <tr key={dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}>
              <td>
                {dado.isPack ? dado.pack_code : (dado.unity_code || dado.code)}
                </td>
              <td>{dado.isPack ? dado.packName : dado.name}</td>
              <td>
                {dado.isPack ? dado.packPrice : dado.sales_price}
                
                </td>
              <td>
                {dado.newValue}
                {validar && dado.valueError && (<p className="bg-red-400">{dado.valueError}</p>)}
                {validar && dado.custError && (<p className="bg-red-400">{dado.custError}</p>)}
                </td>
            </tr>
          );
        })}
        
        </tbody>
      </table>
    )
}

export default Table