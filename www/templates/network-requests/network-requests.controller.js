// Controller of dashboard.
appControllers.controller('networkRequestsController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, ionicMaterialMotion, ionicMaterialInk, transformUtils, toasts, $ionicHistory, $ionicPopup, $ionicModal, $ionicLoading, NetworkRequest, Procedure) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	$scope.loadNetworkRequests = _loadNetworkRequests;
	_loadNetworkRequests();

	function _loadNetworkRequests() {
		return NetworkRequest.queryByUser().$promise
			.then(populate())
			.then(function(networkRequests) {
				console.log(networkRequests)
				$scope.networkRequests = networkRequests;
			})
			.then(function() {
				animateList();
			})
	        .catch(function(err) {
				toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.')
			})
			.then(function() {
				$scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
			});
	}

	function animateList() {
	    $timeout(function() {
			ionicMaterialMotion.fadeSlideIn();
			ionicMaterialInk.displayEffect();
		}, 100);
	}

	function populate() {
		return function(networkRequests) {
			return $q.all(networkRequests.map(function(networkRequest) {
				return Procedure.get({ id: networkRequest.procedure }).$promise
					.then(function(procedure) {
						networkRequest.procedure = procedure;
						return networkRequest;
					})
			}))
		}
	}

}); // End of dashboard controller.
