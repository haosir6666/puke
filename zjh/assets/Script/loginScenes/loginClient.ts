import { _decorator, Component, Node, EventTarget } from "cc";
const { ccclass, property } = _decorator;
import { sendData } from "../common/type";

const eventTarget = new EventTarget();
globalThis.eventTarget = eventTarget;

@ccclass("loginClient")
export class loginClient extends Component {
  private _ws: WebSocket | null = null;
  start() {
    this._init();
  }

  update(deltaTime: number) {}

  private _init() {
    globalThis._loginClientMgr = this;
    this._connectServer();
  }

  private _connectServer() {
    const ws = new WebSocket("ws://localhost:3000");
    this._ws = ws;
    ws.onopen = () => {
      console.log("链接成功");
    };
    ws.onmessage = (event) => {
      let resData = JSON.parse(event.data);
      this.getMessage({
        type: resData.type,
        data: resData.data,
        message: resData.message,
      });
    };
    ws.onclose = () => {
      console.log("链接断开");
    };
    ws.onerror = (event) => {
      console.log(`WebSocket 错误: ${event}`);
    };
  }
  //接受消息
  public getMessage(data: sendData) {
    console.log("getMessage", data);
    globalThis.eventTarget.emit(data.type, data);
  }
  //发送消息
  public _sendMessage(data: sendData) {
    this._ws.send(JSON.stringify(data));
  }
}
