const ws = require('nodejs-websocket');
const userRouter = require("./user")

/**
 * 负责登录服务器
 */
class LoginMessage {
    //实现单例方法
    static getInstance() {
        if (!LoginMessage.instance) {
            LoginMessage.instance = new LoginMessage()
            return LoginMessage.instance
        } else {
            return LoginMessage.instance
        }
    }
    constructor() {

    }
    //启动ws服务
    createServer(port) {
        const server = ws.createServer((client) => {
            client.on('text', (res) => {

                let resData = JSON.parse(res);
                this.resMessage(
                    resData.type,
                    resData.data,
                    client
                );
            });
            //接受客户端消息
            client.on('binary', (res) => {
                console.log('收到二进制数据', res);
            });
            client.on('close', (code, reason) => {
                console.warn('有个客户端断开连接了', code, reason);
            });
            client.on('error', (err) => {
                console.warn('有个客户端链接发生错误', err);
            });
        });


        server.listen(port, () => {
            console.log('服务启动: localhost:' + port + '');
        })
    }
    //接受客户端消息
    resMessage(type, data, client) {
        switch (type) {
            case 1: //登录
                this.userLogin(data.id).then(res => {
                    this.sendMessage(1, res, client)
                })
                break;
            case 2: //心跳
                console.log('心跳消息', data);
                break;
        }

    }
    //发送消息
    sendMessage(type, data, client) {
        client.send(JSON.stringify({
            type: type,
            data: data
        }))
    }
    //用户登录了
    userLogin(id) {
        return new Promise((resolve, reject) => {
            //查询用户信息
            userRouter.getUserInfo(id).then(res => {
                if (res) {
                    resolve({
                        code: 200,
                        data: {
                            data: res[0],
                            message: '登录成功'
                        }
                    })
                } else {
                    resolve({
                        code: 401,
                        data: {
                            data: null,
                            message: '用户不存在'
                        }
                    })
                }
            })
        })

    }
}

module.exports = LoginMessage.getInstance()