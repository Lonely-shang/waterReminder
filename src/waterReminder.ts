
import * as vscode from 'vscode';

const config = {
  remindTime: 1000,

  totalWater: "2000ml"
};

class WaterReminder {
  private timmer: NodeJS.Timeout | undefined;
  private date: string | undefined;

  constructor() {

  }

  private init() {

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