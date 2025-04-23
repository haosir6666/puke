const Mysql = require("mysql2")

/**
 * 数据库连接类
 */
class DB {
    //实现单例方法
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB()
            return DB.instance
        } else {
            return DB.instance
        }
    }
    constructor() {
        this.mysql
    }
    /**
     * 连接数据库
     */
    connectSql() {
        this.mysql = Mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'root',
            database: 'puke'
        })
        this.mysql.connect(function (err) {
            if (err) {
                console.warn('数据库连接失败')
            } else {
                console.warn('数据库连接成功')
            }
        })
    }
    /**
        * sql查询方法
        * @param {*} sql 
        * @returns {Promise}
        */
    query(sql) {
        return new Promise((resolve, reject) => {
            if (!this.mysql) {
                reject(new Error('数据库未连接'))
                return
            }
            this.mysql.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}
module.exports = DB