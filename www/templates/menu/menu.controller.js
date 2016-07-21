appControllers.controller('menuCtrl', function ($scope, $state, $rootScope, $ionicHistory, analyticsService, authService) {

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

});
