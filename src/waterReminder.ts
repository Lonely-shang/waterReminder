/*
 * @Author: Miliky
 * @Date: 2022-04-30 17:49:53
 * @LastEditTime: 2022-04-30 18:52:26
 * @LastEditors: Eliauk
 * @Description: Water Reminder
 * @FilePath: /waterReminder/src/waterReminder.ts
 * 爱意随风起，风止意难平。（talk is cheap,show me the code）
 */

import * as vscode from 'vscode';
import { isChanged } from './shared/tools';

const config = {
  remindTime: 1000,

  totalWater: "2000ml"
};

class WaterReminder {
  private timmer: NodeJS.Timeout | undefined;
  private date: string | undefined;
  private config: vscode.WorkspaceConfiguration;

  constructor() {
    // 获取相关配置
    this.config = vscode.workspace.getConfiguration('waterReminder');
  }

  private init() {
    const lastConfig = this.config;
    const config = vscode.workspace.getConfiguration('waterReminder');

    //
    if (isChanged(lastConfig, config)) { return; }

    // 两次配置均未启动插件
    if (!lastConfig.enabled && !config.enabled) { return; }

    // 保存当前配置, 更新配置列表
    this.config = config;
  }

  // 插件卸载时触发
  private uninstall () {

  }

  remind () {
    this.timmer = setTimeout(() => {
      this.showMassage();
    }, 2000);
  }

  showMassage () {
    const that = this;
    vscode.window.showInformationMessage("健康小贴士: 停下休息一会，补充一点水！",'OK')
    .then(function(select){
      if (select === 'OK') {
        clearTimeout(that.timmer as NodeJS.Timeout);
        that.remind();
        return;
      }
      that.showMassage();
    });
  }

  public watch(): vscode.Disposable {
    this.init();
    return vscode.workspace.onDidChangeConfiguration(() => this.init());
  }

}

const waterReminder = new WaterReminder();
export {
  waterReminder
};