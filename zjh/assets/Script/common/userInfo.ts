import { _decorator, Component, Node, EditBox } from "cc";
const { ccclass, property } = _decorator;
import { userType } from "./type";

@ccclass("userInfo")
export class userInfo extends Component {
  public userInfo: userType;
  static instance: any; //用户对象实例

  public static getInstance() {
    if (userInfo.instance == null) {
      userInfo.instance = new userInfo();
      return userInfo.instance;
    } else {
      return userInfo.instance;
    }
  }

  start() {
    globalThis.userInfo = userInfo.getInstance();
  }

  update(deltaTime: number) {}
}
