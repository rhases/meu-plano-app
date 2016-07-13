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
        url: "/app/login", //Url of start page.
        state: "app.login" //State name of start page.
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
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet, $ionicLoading, $http, authService, analyticsService, transformUtils) {

        $rootScope.TRANSFORM_UTILS = transformUtils;

        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
        };

		function checkLogin() {
			return authService.getAppUser({tryReloadFirst: true})
				.then(function(appUser) {
					// If can not load app user
					if(!appUser) {
						authService.logout();
						$state.go('app.login');
						console.log("App User not found! Go to login.");
						return;
					}

					$rootScope.appUser = appUser;

					// Need to complete the registration
					if (!appUser.name
						|| !appUser.email
						|| !appUser.phone
						|| !appUser.birthdate
						|| !appUser.gender) {
						$state.go('app.register');
					}

					// Need to complete the profile
					else if(!appUser.profile.state
						|| !appUser.profile.city
						|| !appUser.profile.hasHealthPlan
						|| !appUser.profile.healthPlan
						|| !appUser.profile.healthPlan.name
						|| !appUser.profile.healthPlan.number) {
						$state.go('app.profile');
					}

					// Check invite status status
					else if (!appUser.isInvited) {
						$state.go('app.notInvited');
					}

					// Go to dashboard
					else {
						$state.go('app.dashboard');
						console.log("The user '" + appUser.name + "' successful logged!");
            analyticsService.track.user(appUser);
					}
				})
				.catch(function(err) {
					console.log(err);
					authService.logout();
					$state.go('app.login');
					console.log("App User not found! Go to login.");
				})
		}

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

			// checkInternet()
			// 	.catch( $mdToast.show("Sem conexão com a internet.") );

			if (!authService.isLoggedIn()) {
				$state.go('app.login');
				console.log("Don't have user logged yet!");
			} else {
				$ionicLoading.show();
				checkLogin()
					.then(function() { $ionicLoading.hide(); });
			}

			$rootScope.$on("login:successful", function(userId) {
				$ionicLoading.show();
				checkLogin()
					.then(function() { $ionicLoading.hide(); });
			})
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
