// Controller of dashboard.
appControllers.controller('networkController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, ionicMaterialMotion, ionicMaterialInk, APPOINTMENT_STATUS, APPOINTMENT_REQUEST_STATUS, transformUtils, toasts, $ionicHistory, $ionicPopup, $ionicModal, $ionicLoading) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	$scope.search = function() {
		return appointmentRequestService.get({ tryReloadFirst: true })
	        .then(function(appointmentRequests) {
				$scope.appointmentRequests = appointmentRequests;
				return appointmentService.get({ tryReloadFirst: true });
			})
			.then(function(appointments) {
				$scope.appointments = appointments;
				animateList();
			})
	        .catch(function(err) { toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.') })
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

}); // End of dashboard controller.
