// Controller of dashboard.
appControllers.controller('networkRequestsController', function ($scope, $rootScope, $timeout, $state, $stateParams, $q, ionicMaterialMotion, ionicMaterialInk, toasts, $ionicHistory, NetworkRequest, Procedure, MedicalSpecialty) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	$scope.loadNetworkRequests = _loadNetworkRequests;
	_loadNetworkRequests();

	function _loadNetworkRequests() {
		return NetworkRequest.queryByUser($rootScope.userProfile._id).$promise
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
				if (networkRequest.procedure) {
					return Procedure.get({ id: networkRequest.procedure }).$promise
						.then(function(procedure) {
							networkRequest.procedure = procedure;
							return networkRequest;
						})
				} else if (networkRequest.medicalSpecialty) {
						return MedicalSpecialty.get({ id: networkRequest.medicalSpecialty }).$promise
							.then(function(medicalSpecialty) {
								networkRequest.medicalSpecialty = medicalSpecialty;
								return networkRequest;
							})
				}
			}))
		}
	}

}); // End of dashboard controller.
