const mysql = require('mysql2/promise');


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12060317',
  database: 'shopper',
});

async function GroupReturn(){
    await db.query("SET SESSION sql_mode = ''")
}

async function selectOne(id){

    const res = await db.query('SELECT * FROM products WHERE code = ?', [id])
    return res[0]
}

async function hasPack(id){
    const res = await db.query('SELECT * FROM packs WHERE pack_id = ? OR product_id = ?', [id, id])
    const resulta = res[0].length > 0 ? true : false
    return resulta
}

async function isPack(id){
    const res = await db.query('SELECT * FROM packs WHERE pack_id = ?', [id])
    const resulta = res[0].length > 0 ? true : false
    return resulta
}

async function selectAll(){
    const res = await db.query('SELECT * FROM products')
    return res[0]
}


async function selectUnits(id){
    const res = await db.query('SELECT p_unit.name, p_unit.code AS unity_code,p_unit.sales_price, p_unit.cost_price, p_pack.name AS packName, p_pack.code AS pack_code, p_pack.sales_price AS packPrice, p_pack.cost_price AS packCostPrice, packs.qty, GROUP_CONCAT(packs.product_id) AS productID FROM packs INNER JOIN products AS p_unit ON p_unit.code = packs.product_id INNER JOIN products AS p_pack ON p_pack.code = packs.pack_id WHERE p_unit.code = ? OR p_pack.code = ?', [id, id])

    if(res.length > 0){
        
        const products = res[0][0].productID.split(',')
        res[0][0].productID = products
    }
    return res[0]
}

async function atualizar(id, novoValor){
    await db.query('UPDATE products SET sales_price = ? WHERE code = ?', [novoValor ,id])
}

module.exports = {
    selectAll,
    selectOne,
    atualizar,
    selectUnits,
    hasPack, 
    isPack,
    GroupReturn
}