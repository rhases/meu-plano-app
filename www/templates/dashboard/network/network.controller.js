// Controller of dashboard.
appControllers.controller('networkController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, ionicMaterialMotion, ionicMaterialInk, transformUtils, toasts, $ionicHistory, $ionicPopup, $ionicModal, $ionicLoading) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	$scope.search = search;
	search();


	function search() {
		return $q.when()
			.then(getMedicalSpecialties())
			.then(getProcedures())
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

	function getMedicalSpecialties() {
		return function() {
			$scope.medicalSpecialties = [
				{
					"_id": 123,
					"name": "Cardiologista"
				}
			];
		}
	}

	function getProcedures() {
		return function() {
			$scope.procedures = [
				{
				    "_id": 4902,
				    "mainDescription": "IMPLANTE DE PRÓTESE SEMI-RÍGIDA (EXCLUI PRÓTESES INFLÁVEIS)",
				    "coverageTypes": [ {} ],
				    "descriptions": [
						"implante (colocação cirúrgica) de prótese semi-rígida (exclui próteses infláveis)",
						"31206140 - Implante de prótese semi-rígida (exclui próteses infláveis)"
					],
				}
			]
		}
	}

}); // End of dashboard controller.
