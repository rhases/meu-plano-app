//
//Welcome to app.js
//This is main application config of project. You can change a setting of :
//  - Global Variable
//  - Theme setting
//  - Icon setting
//  - Register View
//  - Spinner setting
//  - Custom style
//
//Global variable use for setting color, start page, message, oAuth key.
var db = null; //Use for SQLite database.
window.globalVariable = {
    startPage: {
        url: "/app/list-dashboard",//Url of start page.
        state: "app.dashboard"//State name of start page.
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    },
    oAuth: {
      facebook: "1702791466664692",//Use for Facebook API appID.
      googlePlus: "your_api_key",//Use for Google API clientID.
    },
	push: {
		gcmSenderId: "835746108347"
	},
	backend: {
		authServerUri: "http://auth.api.rhases.com.br/",
		schedulerServerUri: "http://scheduler.api.rhases.com.br/",
	}

};// End Global variable

angular.module('starter')
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet, $ionicLoading, $http, analyticsService) {

        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
        };

        $ionicPlatform.ready(function () {
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            initialRootScope();
            analyticsService.setup();

      			if (!authService.isLoggedIn()) {
      				$state.go('app.login');
      				console.log("User not logged!");
      			}
        });

    })

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette, $mdIconProvider) {

        // Use for change ionic spinner to android pattern.
        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

    })

	.constant('$ionicLoadingConfig', {
		template: '<ion-spinner icon="ripple" class="spinner-balanced" />'
	});
