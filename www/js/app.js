angular.module('starter')
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $ionicLoading, $http, authService, analyticsService, transformUtils) {

        $rootScope.TRANSFORM_UTILS = transformUtils;

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

		function checkLogin() {
			return authService.getAppUser({tryReloadFirst: true})
				.then(function(appUser) {
					$ionicHistory.nextViewOptions({
						historyRoot: true,
						expire: 300
					});

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
						$state.go('app.register::infos');
					}

					// Need to complete the profile
					else if(!appUser.profile.state
						|| !appUser.profile.city
						|| !appUser.profile.hasHealthPlan
						|| !appUser.profile.healthPlan
						|| !appUser.profile.healthPlan.name
						|| !appUser.profile.healthPlan.number) {
						$state.go('app.register::profile');
					}

					// Check invite status status
					else if (!appUser.isInvited) {
						$state.go('app.register::notInvited');
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

			// Existe um variavel q diz se está com internet ou não!!!
			// TODO: checkInternet()
			// 	.catch( toasts.show("Sem conexão com a internet.") );

			// TODO: Testar se o token do usuário esta válido

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

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

        // Use for change ionic spinner to android pattern.
        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

    })

	.constant('$ionicLoadingConfig', {
		template: '<ion-spinner icon="ripple" class="spinner-balanced" />'
	});
