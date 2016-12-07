// Controller of dashboard.
appControllers.controller('procedureController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, ionicMaterialMotion, ionicMaterialInk, transformUtils, toasts, $ionicHistory, $ionicPopup, $ionicModal, $ionicLoading) {

	$scope.procedure =
		{
			"_id": 4902,
			"mainDescription": "IMPLANTE DE PRÓTESE SEMI-RÍGIDA (EXCLUI PRÓTESES INFLÁVEIS)",
			"coverageTypes": [ {} ],
			"descriptions": [
				"implante (colocação cirúrgica) de prótese semi-rígida (exclui próteses infláveis)",
				"31206140 - Implante de prótese semi-rígida (exclui próteses infláveis)"
			],
		}

	$q.when()
		.then(getHealthProviders())
		.then(function() {
			animateList();
		})
        .catch(function(err) {
			toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.')
		})
		.then(function() {
			$scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
		});

	function animateList() {
	    $timeout(function() {
			ionicMaterialMotion.fadeSlideIn();
			ionicMaterialInk.displayEffect();
		}, 100);
	}

	function getHealthProviders() {
		return function() {
			$scope.healthProviders = [
				{
				    "_id": 3019608,
				    "name": "HOSPITAL SANTA HELENA",
				    "image": "",
					"type": "hospital",
				    "address":  {
					    "label": "sede",
					    "name": "",
					    "state": "df",
					    "city": "brasilia",
					    "area": "Asa Norte",
					    "address": "SHLN 516 CONJUNTO D",
					    "zip":  "70770560",
					    "phones": ["3215-0150"],
					},
				    "operators": [ 5711 ],
				    "healthPlans": [{
						"plan": 471802140,
				        "services": [ "pronto-socorro" ],
				        "medicalSpecialties": [],
				        "procedures": [],
				    }]
				}
			];
		}
	}

}); // End of dashboard controller.
