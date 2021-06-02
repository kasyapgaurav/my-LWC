import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";
export default class Gaurav_lwc_base extends NavigationMixin(LightningElement) {
  handlelRegistration() {
    var compDefinition = {
      componentDef: "c:gaurav_lwc_registration",
      attributes: {}
    };
    // Base64 encode the compDefinition JS object
    var encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedCompDef
      }
    });
  }
}
