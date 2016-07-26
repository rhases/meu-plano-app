// For send email you have to install $cordovaSocialSharing by running the following
// command in your cmd.exe for windows or terminal for mac:
// $ cd your_project_path
// $ ionic plugin remove nl.x-services.plugins.socialsharing
// $ ionic plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
//
// Learn more about $cordovaSocialSharing :
// http://ngcordova.com/docs/plugins/socialSharing/
//
// For send message you have to install $cordovaSMS by running the following
// command in your cmd.exe for windows or terminal for mac:
// $ cd your_project_path
// $ ionic plugin remove com.cordova.plugins.sms
// $ ionic plugin add https://github.com/cordova-sms/cordova-sms-plugin.git
//
// Learn more about $cordovaSMS :
// http://ngcordova.com/docs/plugins/sms/
//
//
// For using mobile calling you must go to yourProjectPath/config.xml
// and put this following code in the access area.
// <access origin="tel:*" launch-external="yes"/>
//
// Controller of contact us page.
appControllers.controller('talkWithUsCtrl', function ($scope, $cordovaSocialSharing, $cordovaSms) {

    // This function is the first activity in the controller.
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.contactInfo is store contact us data
        $scope.contactInfo = {
            telephone: "(061) 993-913-443",
            email: "contato@rhases.com.br"
        };
    };// End initialForm.

    // sendSms is for send message by calling $cordovaSms
    // Parameter :
    // phoneNumber = number of sending message
    $scope.sendSms = function (phoneNumber) {
        //config options to send message
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default.
            android: {
                intent: 'INTENT' // send SMS with the native android SMS messaging.
                //intent: '' // send SMS without open any other app.
            }
        };
        // calling $cordovaSms to send message
        $cordovaSms.send(phoneNumber, " ", options);
    }

    // sendEmail is for send email by calling $cordovaSocialSharing.
    // Parameter :
    // email = email of receiver
    $scope.sendEmail = function (email) {
        $cordovaSocialSharing.shareViaEmail("", "", email, "", "", "");
        // format of send email by using $cordovaSocialSharing is :
        //$cordovaSocialSharing.shareViaEmail(message, subject, toArr, ccArr, bccArr,file)
        // toArr, ccArr and bccArr must be an array, file can be either null, string or array.
    }

    // callTo is for using mobile calling.
    // Parameter :
    // number = number that going to call.
    $scope.callTo = function (number) {
        window.open("tel:" + number);
    }// End callTo.

    $scope.initialForm();

});// End of contact us controller.
