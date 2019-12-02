import * as ko from "knockout";
import rootViewModel from "./appController";
import "ojs/ojknockout";
import "ojs/ojbutton";
import "ojs/ojtoolbar";
import "ojs/ojmenu";

export default class Root {
  constructor() {
    // if running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
    // event before executing any code that might interact with Cordova APIs or plugins.
    if (document.body.classList.contains("oj-hybrid")) {
      document.addEventListener("deviceready", this.init);
    } else {
      this.init();
    }
  }
  
  init(): void {
    // bind your ViewModel for the content of the whole page body.
    ko.applyBindings(rootViewModel, document.getElementById("globalBody"));
  }
}