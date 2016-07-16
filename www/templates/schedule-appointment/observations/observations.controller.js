appControllers.controller('observationsCtrl', function ($scope, $state,
	scheduleAppointmentRequestService, ionicMaterialMotion, ionicMaterialInk, $timeout) {

	$scope.model = {
		comments:""
	}

	$scope.continue = function() {
		// console.log('observations:' + $scope.model.comments);
		scheduleAppointmentRequestService.setObservations($scope.model.comments);
		$state.go('app.scheduleAppointment::confirmation');
	}
});
