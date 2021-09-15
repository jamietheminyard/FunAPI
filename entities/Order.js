const db = require("../database.js");

class Order{
    static async read(id){
        let sql = "select * from orders where ordernum = ?"
        let params = [id]
        return db.get(sql, params)
    }
}

module.exports = Order;