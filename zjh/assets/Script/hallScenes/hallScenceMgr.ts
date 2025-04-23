import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("hallScenceMgr")
export class hallScenceMgr extends Component {
  @property(Label)
  public nameLabel: Label;
  @property(Label)
  public idLabel: Label;
  start() {
    this._init();
  }
  update(deltaTime: number) {}
  _init() {
    this.nameLabel.string = globalThis.userInfo.nick || "没得";
    this.idLabel.string = "ID: " + globalThis.userInfo.id || "没得";
  }
  //点击创建房间
  public onCreateRoom() {}
}
