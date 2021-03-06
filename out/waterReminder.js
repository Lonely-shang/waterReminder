"use strict";
/*
 * @Author: Miliky
 * @Date: 2022-04-30 17:49:53
 * @LastEditTime: 2022-05-01 17:58:19
 * @LastEditors: Eliauk
 * @Description: Water Reminder
 * @FilePath: /waterReminder/src/waterReminder.ts
 * 爱意随风起，风止意难平。（talk is cheap,show me the code）
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.waterReminder = void 0;
const vscode = require("vscode");
const fs = require("fs");
const tools_1 = require("./shared/tools");
const vscodePath_1 = require("./shared/vscodePath");
const config = {
    remindTime: 1000,
    totalWater: "2000ml"
};
class WaterReminder {
    constructor() {
        this._rawCss = '';
        // 获取相关配置
        this.config = vscode.workspace.getConfiguration('waterReminder');
    }
    init() {
        this.getCssForCode();
        const lastConfig = this.config;
        const config = vscode.workspace.getConfiguration('waterReminder');
        if ((0, tools_1.isChanged)(lastConfig, config)) {
            return;
        }
        // 两次配置均未启动插件
        if (!lastConfig.enabled && !config.enabled) {
            return;
        }
        // 保存当前配置, 更新配置列表
        this.config = config;
        // 关闭插件调用卸载方法
        if (!config.enabled) {
            this.uninstall();
        }
        // 进行相关设置
    }
    // 插件卸载时触发
    uninstall() {
    }
    remind() {
        this.timmer = setTimeout(() => {
            this.showMassage();
        }, 2000);
    }
    showMassage() {
        const that = this;
        vscode.window.showInformationMessage("健康小贴士: 双手离开键盘休息一会，补充一点水！", 'OK')
            .then(function (select) {
            if (select === 'OK') {
                clearTimeout(that.timmer);
                that.remind();
                return;
            }
            that.showMassage();
        });
    }
    getCssForCode() {
        this._rawCss = fs.readFileSync(vscodePath_1.vscodePath.cssPath, 'utf-8');
        return this._rawCss;
    }
    setCssToCode(content) {
        if (!!content) {
            fs.writeFileSync(vscodePath_1.vscodePath.cssPath, content, 'utf-8');
        }
    }
    watch() {
        this.init();
        return vscode.workspace.onDidChangeConfiguration(() => this.init());
    }
}
const waterReminder = new WaterReminder();
exports.waterReminder = waterReminder;
//# sourceMappingURL=waterReminder.js.map