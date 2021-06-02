import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import authenticateLogin from '@salesforce/apex/gaurav_lwc_homePageController.authenticateLogin';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Gaurav_lwc_homePage extends NavigationMixin(LightningElement) {

    @track username;
    @track password;
    @api userDetails;

    handleLogin(){
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="username")
                this.username=element.value;

            else if(element.name=="password")
                this.password=element.value;
        },this);

        authenticateLogin({username: this.username, password: this.password})
        .then(result => {
                console.log('##### ' +JSON.stringify(result));
                if(result != null){
                    this.userDetails = result;
                    this.fireSuccessToast();
                    this.handleNavigate();
                }else{
                    this.fireErrorToast();
                }
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }

    handleReset(){
        this.template.querySelectorAll('lightning-input').forEach(element => {
            element.value = null; 
        });
      }

      fireSuccessToast(){
        const evt = new ShowToastEvent({
            title: "WOAHH",
            message: 'Login Verified',
            variant: "success",
        });
        this.dispatchEvent(evt);
    }

    fireErrorToast(){
        const evt = new ShowToastEvent({
            title: "Error",
            message: 'Login failed, please verify username/password',
            variant: "error",
        });
        this.dispatchEvent(evt);
    }

    handleNavigate() {
        var compDefinition = {
            componentDef: "c:gaurav_lwc_SuccessfullLogin",
            attributes: {
                userDetails: this.userDetails
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