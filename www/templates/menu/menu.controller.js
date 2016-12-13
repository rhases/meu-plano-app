appControllers.controller('menuCtrl', function ($scope, $state, $rootScope, $ionicHistory, $ionicPlatform, analyticsService, authService, NetworkRequest) {
		//disable slide side and back
    $rootScope.slideSideMenu = false;

	// $ionicHistory.nextViewOptions({
	// 	disableBack: true
	// });
	// $ionicHistory.clearHistory();

    $scope.CURRENT_STATE = $rootScope.CURRENT_STATE;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        if (toState.name) {
			$scope.CURRENT_STATE = toState.name;
		}
    });

	$rootScope.$on('app.new-network-request', function(event, toState, toParams, fromState, fromParams, options) {
        countOpenedNetworkRequest();
    });

	authService.getAppUser()
		.then(function(appUser) {
			if (!appUser || !appUser._id)
				return;

			$scope.appUser = appUser;

			return countOpenedNetworkRequest();
		})

	function countOpenedNetworkRequest() {
		$scope.countingNetworkRequests = true;
		return NetworkRequest.queryByUser({ userId: $scope.appUser._id }).$promise
			.then(function(networkRequests) {
                if (!networkRequests || networkRequests.length == 0)
                    return 0;
                    
				$scope.openedRequestCount = networkRequests
					.map(function(element) {
						return element.status == 'new' ? 1 : 0
					})
					.reduce(function(p, current) {
						if (current)
							p = p + 1;
						return p;
					});
			})
			.then(function() {
				$scope.countingNetworkRequests = false;
			})
	}



	$scope.canShowMenu = function() {
		return !($scope.CURRENT_STATE == 'app.login'
			|| $scope.CURRENT_STATE == 'app.registerInfos'
			|| $scope.CURRENT_STATE == 'app.registerProfile'
			|| $scope.CURRENT_STATE == 'app.registerOperator'
			|| $scope.CURRENT_STATE == 'app.registerHealthplan');
	}

});
