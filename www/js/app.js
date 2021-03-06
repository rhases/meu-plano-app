angular.module('starter')
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $ionicLoading, $http, authService, analyticsService, transformUtils, MAX_RATING) {

        $rootScope.TRANSFORM_UTILS = transformUtils;

        $rootScope.CURRENT_STATE = undefined;

        $rootScope.MAX_RATING = MAX_RATING;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
            // event.preventDefault();
            if (toState.name)
                $rootScope.CURRENT_STATE = toState.name;
        });

        function initialRootScope() {
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
            if(typeof cordova !== 'undefined'){
				cordova.getAppVersion((version) => {
					$rootScope.appVersion = version;
				});
			} else {
				$rootScope.appVersion = 'x.y.z';
			}
        };

        function configSplashScreen() {
            setTimeout(function() {
                try {
                    navigator.splashscreen.hide();
                } catch(e) {
                    console.log("Could not execute 'navigator.splashscreen.hide()'");
                }
            }, 100);
        };

        $ionicPlatform.ready(function () {
            configSplashScreen();

            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            initialRootScope();

            if (!authService.isLoggedIn()) {
                authService.logout();
				$state.go('app.login');
				console.log("Don't have user logged yet!");
			} else {
                // precisa disso, não tirar ;D
                $state.go('app.tabs.infos');
            }
        });

    })

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

        // Use for change ionic spinner to android pattern.
        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

    })

	.constant('$ionicLoadingConfig', {
		template: '<ion-spinner icon="ripple" class="spinner-balanced" />'
	});
