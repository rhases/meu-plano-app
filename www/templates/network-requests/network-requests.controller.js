// Controller of dashboard.
appControllers.controller('networkRequestsController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, ionicMaterialMotion, ionicMaterialInk, transformUtils, toasts, $ionicHistory, $ionicPopup, $ionicModal, $ionicLoading, NetworkRequest) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	$scope.loadNetworkRequests = loadNetworkRequests;
	loadNetworkRequests();

	console.log("...............")

	function loadNetworkRequests() {
		// return NetworkRequest.get().$promise
		return $q.when([
				{
					_id: "57d951786a87fb0003f24716",
					user: "contato@rhases.com.br",
					healthPlan: 463945116,

					medicalSpecialty: undefined,
					procedure: 4902,

					status: "new" // new, answered
				}
			])
			.then(populate())
			.then(function(networkRequests) {
				console.log("oi")
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
				// TODO: get from server
				networkRequest.procedure = {
				    "_id": 4902,
				    "mainDescription": "IMPLANTE DE PRÓTESE SEMI-RÍGIDA (EXCLUI PRÓTESES INFLÁVEIS)",
				    "coverageTypes": [ {} ],
				    "descriptions": [
						"implante (colocação cirúrgica) de prótese semi-rígida (exclui próteses infláveis)",
						"31206140 - Implante de prótese semi-rígida (exclui próteses infláveis)"
					],
				}
				return
			}))
		}
	}

}); // End of dashboard controller.
