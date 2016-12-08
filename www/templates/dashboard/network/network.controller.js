// Controller of dashboard.
appControllers.controller('networkController', function ($scope, $timeout, $state, $stateParams, $q, ionicMaterialMotion, ionicMaterialInk, toasts, MedicalSpecialty, Procedure) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	if ($stateParams.searchText) {
		$scope.searchText = $stateParams.searchText;
	}


	$scope.search = _search;
	_search();

	function _search() {
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
			return MedicalSpecialty.query().$promise
				.then(function(medicalSpecialties) {
					$scope.medicalSpecialties = medicalSpecialties;
				})
		}
	}

	function getProcedures() {
		return function() {
			return Procedure.query().$promise
				.then(function(procedures) {
					$scope.procedures = procedures;
				})
		}
	}

}); // End of dashboard controller.
