"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscodePath = void 0;
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
// 基础目录
const fileName = require.main?.filename;
const base = path.dirname(fileName);
// css文件路径
const cssName = parseFloat(vscode.version) >= 1.38 ? 'workbench.desktop.main.css' : 'workbench.main.css';
const webCssName = 'workbench.web.api.css';
const cssPath = (() => {
    const getCssPath = (cssFileName) => path.join(base, 'vs', 'workbench', cssFileName);
    const defPath = getCssPath(cssName);
    const webPath = getCssPath(webCssName);
    if (!fs.existsSync(defPath) && fs.existsSync(webPath)) {
        return webPath;
    }
    return defPath;
})();
// electron 入口文件所在文件夹
const indexDir = path.join(base, 'vs', 'workbench', 'electron-browser', 'bootstrap');
exports.vscodePath = {
    base,
    cssPath,
    indexDir
};
//# sourceMappingURL=vscodePath.js.map