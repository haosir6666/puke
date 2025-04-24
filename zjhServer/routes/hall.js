const DB = require('../utils/db')

class hallRouter extends DB {
    //实现单例方法
    static getInstance() {
        if (!hallRouter.instance) {
            hallRouter.instance = new hallRouter()
            return hallRouter.instance
        } else {
            return hallRouter.instance
        }
    }

    constructor() {
        super()
        this.connectSql()
    }

    getUserInfo(id) {
        let sql = `SELECT * FROM user_info WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            this.query(sql, resolve, reject).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
module.exports = hallRouter.getInstance()