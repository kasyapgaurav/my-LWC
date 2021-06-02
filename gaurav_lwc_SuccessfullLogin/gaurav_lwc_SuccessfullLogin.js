import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Gaurav_lwc_SuccessfullLogin extends NavigationMixin(LightningElement) {
    @api userDetails;

    handleLogout() {
        var compDefinition = {
            componentDef: "c:gaurav_lwc_base",
            attributes: {
                
            }
        };
        // Base64 encode the compDefinition JS object
        var encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedCompDef
            }
        });
    }
}