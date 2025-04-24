const ws = require('nodejs-websocket');
const hallRouter = require("./hall")

/**
 * 负责登录服务器
 */
class HallMessage {
    //实现单例方法
    static getInstance() {
        if (!HallMessage.instance) {
            HallMessage.instance = new HallMessage()
            return HallMessage.instance
        } else {
            return HallMessage.instance
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
            console.log('大厅服务启动: localhost:' + port + '');
        })
    }
    //接受客户端消息
    resMessage(type, data, client) {
        switch (type) {
            case 1: //创建房间
                this.createRoom(data)
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
    //创建房间
    createRoom(data) {
        console.log('创建房间', data);
    }
}

module.exports = HallMessage.getInstance()