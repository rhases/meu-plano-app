appControllers.controller('menuCtrl', function ($scope, $state, $rootScope, $ionicHistory, $ionicPlatform, analyticsService, authService) {

	$scope.appVersion = "?v";

	$scope.logout = function() {
		authService.logout();

		//disable slide side and back
    $rootScope.slideSideMenu = false;
		$ionicHistory.nextViewOptions({
    	disableBack: true
  	});
		$ionicHistory.clearHistory();

		$state.go('app.login');
	}

	$ionicPlatform.ready(function() {
		if(typeof cordova !== 'undefined'){
			cordova.getAppVersion((version) => {
		  	$scope.appVersion = version;
		  });
		}
	});

});
