import { _decorator, Component, game, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("createRoom")
export class createRoom extends Component {
  public _gameNum: number = 1; // 游戏局数
  public _isBanShuJieSan: boolean = true; // 是否半局结束

  start() {}

  update(deltaTime: number) {}

  // 关闭弹窗
  onClose() {
    this.node.active = false;
  }
  // 确认创建房间
  onConfirm() {
    console.log("创建房间");
    let data = {
      type: 1,
      data: {
        userId: globalThis.userInfo.id,
        gameNum: this._gameNum,
        isBanShuJieSan: this._isBanShuJieSan,
      },
    };
    globalThis._hallClientMgr._sendMessage(data);
    this.node.active = true;
  }
  // 游戏局数变化
  onGameNumChange(target: Node, data: number) {
    this._gameNum = data;
  }
  // 是否半局结束变化
  onIsBanShuJieSanChange() {
    this._isBanShuJieSan = !this._isBanShuJieSan;
  }
}
