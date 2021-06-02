public with sharing class gaurav_lwc_homePageController {

    @AuraEnabled
    public static RegisteredUser_Wrapper authenticateLogin(String username, String password){
        try {
            List<Registered_User__c> regUserList = [SELECT Id, Name, Email__c,User_Name__c,Password__c FROM Registered_User__c where User_Name__c = : username Limit 1];
            if(!regUserList.isEmpty() && regUserList[0].Password__c == password){
                RegisteredUser_Wrapper wrap = new RegisteredUser_Wrapper();
                wrap.fullName   = regUserList[0].Name;
                wrap.email      = regUserList[0].Email__c;
                wrap.username   = regUserList[0].User_Name__c;
                return wrap;
            }else{
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean registerUser(String firstName, String lastName, String email, String username, String password){
        Boolean bol = false;
        try {
            Registered_User__c regUser = new Registered_User__c();
            regUser.Name            = firstName + ' ' + lastName;
            regUser.Email__c        = email;
            regUser.User_Name__c    = username;
            regUser.Password__c     = password;

            insert regUser;
            bol = true;
        } catch (Exception e) {
            bol = false;
            throw new AuraHandledException(e.getMessage());
        }

        return bol;
    }

    public class RegisteredUser_Wrapper{
        @AuraEnabled
        public String fullName;
        @AuraEnabled
        public String email;
        @AuraEnabled
        public String username;
    }

}