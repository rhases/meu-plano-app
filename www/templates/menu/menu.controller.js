appControllers.controller('menuCtrl', function ($scope, $state, $rootScope, $ionicHistory, $ionicPlatform, analyticsService) {
		//disable slide side and back
    $rootScope.slideSideMenu = false;

	$ionicHistory.nextViewOptions({
    	disableBack: true
  	});

	$ionicHistory.clearHistory();

	$state.go('app.login');

	$scope.currentState = $state.current.name;
});
