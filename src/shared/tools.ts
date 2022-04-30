/*
 * @Author: Miliky
 * @Date: 2022-04-30 18:09:55
 * @LastEditTime: 2022-04-30 18:46:44
 * @LastEditors: Eliauk
 * @Description: tools
 * @FilePath: /waterReminder/src/shared/tools.ts
 * 爱意随风起，风止意难平。（talk is cheap,show me the code）
 */

export function isChanged(oldVal: Object, newVal: Object): boolean {
  return Object.is(oldVal, newVal) || Object.is(JSON.stringify(oldVal), JSON.stringify(newVal));
}

