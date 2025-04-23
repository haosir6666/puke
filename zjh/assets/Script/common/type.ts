/**
 * 接受到的数据类型
 */
export interface sendData {
  type: number;
  data: object;
  message: string | undefined;
}
/**
 * 用户信息
 */
export interface userType {
  id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  phone: string | undefined;
  auther: string | undefined;
  room_card: number | undefined;
  room_id: number | undefined;
  nick: string | undefined;
  create_time: string | undefined;
}
