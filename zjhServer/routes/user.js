const DB = require('../utils/db')

class userRouter extends DB {
    //实现单例方法
    static getInstance() {
        if (!userRouter.instance) {
            userRouter.instance = new userRouter()
            return userRouter.instance
        } else {
            return userRouter.instance
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
module.exports = userRouter.getInstance()