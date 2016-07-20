appControllers.controller('menuCtrl', function ($scope, $timeout, $log, $ionicHistory, $state, $ionicPlatform, analyticsService, authService, $rootScope) {

	$scope.logout = function() {
		authService.logout();
    	$rootScope.slideSideMenu = false;
		$state.go('app.login');
	}

}); // End of menu toggle controller.
