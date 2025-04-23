import { _decorator, Component, Node, EditBox, director } from "cc";
const { ccclass, property } = _decorator;
import { userType } from "../common/type";
@ccclass("login")
export class login extends Component {
  @property(Node)
  public eidtBox: Node;
  start() {
    globalThis.eventTarget.on(1, this.onLoginMessage, this);
  }

  update(deltaTime: number) {}

  public login() {
    let str = this.eidtBox.getComponent(EditBox).string;
    globalThis._loginClientMgr._sendMessage({
      type: 1,
      data: { id: str },
    });
  }
  /**
   * 处理玩家信息
   */
  public onLoginMessage(data: any) {
    globalThis.userInfo = data.data.data.data;
    //导演.加载大厅界面
    director.loadScene("hallScence");
  }
}
