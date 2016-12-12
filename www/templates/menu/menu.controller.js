appControllers.controller('menuCtrl', function ($scope, $state, $rootScope, $ionicHistory, $ionicPlatform, analyticsService) {
		//disable slide side and back
    $rootScope.slideSideMenu = false;

    $scope.CURRENT_STATE = $rootScope.CURRENT_STATE;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {

        if (toState.name)
            $scope.CURRENT_STATE = toState.name;
    });

	$ionicHistory.nextViewOptions({
    	disableBack: true
  	});
	$ionicHistory.clearHistory();

	$scope.canShowMenu = function() {
		return !($scope.CURRENT_STATE == 'app.login'
			|| $scope.CURRENT_STATE == 'app.registerInfos'
			|| $scope.CURRENT_STATE == 'app.registerProfile'
			|| $scope.CURRENT_STATE == 'app.registerOperator'
			|| $scope.CURRENT_STATE == 'app.registerHealthplan');
	}

});
