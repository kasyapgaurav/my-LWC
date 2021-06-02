import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import registerUser from '@salesforce/apex/gaurav_lwc_homePageController.registerUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Gaurav_lwc_registration extends NavigationMixin(LightningElement) {
    @track username;
    @track email;
    @track firstName;
    @track lastName;
    @track password;

    handlelBaseNavigation() {
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

    changeHandlerEmail(event){
        this.email = event.target.value;
        this.username = this.email + '.org1';
        if(this.email == ''){
            this.username = '';
        }
    }

    handleReset(){
        this.template.querySelectorAll('lightning-input').forEach(element => {
            element.value = null; 
        });
      }

      handleRegister(){
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="First-Name")
                this.firstName=element.value;
            else if(element.name=="Last-Name")
                this.lastName=element.value;
            else if(element.name=="Password")
                this.password=element.value;
        },this);

        registerUser({firstName: this.firstName, lastName: this.lastName, email: this.email, username: this.username, password: this.password})
        .then(result => {
                if(result){
                    this.fireSuccessToast();
                    this.handlelBaseNavigation();
                }else{
                    this.fireErrorToast();
                }
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }

    fireSuccessToast(){
        const evt = new ShowToastEvent({
            title: "WOAHH",
            message: 'Successfully Registered',
            variant: "success",
        });
        this.dispatchEvent(evt);
    }

    fireErrorToast(){
        const evt = new ShowToastEvent({
            title: "Error",
            message: 'Unable to Register, please try again',
            variant: "error",
        });
        this.dispatchEvent(evt);
    }


    get username(){
       return this.username;
    }
}