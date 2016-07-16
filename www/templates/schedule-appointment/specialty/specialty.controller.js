appControllers.controller('specialtyCtrl', function ($scope, $state,
	scheduleAppointmentRequestService, ionicMaterialMotion, ionicMaterialInk, $timeout) {

    $scope.specialties = medicalInfos.specializations;

	$timeout(function() {
		ionicMaterialMotion.fadeSlideIn();
		ionicMaterialInk.displayEffect();
	}, 100);

    $scope.selectSpecialty = function(specialty) {
        scheduleAppointmentRequestService.setSpecialty(specialty);
        $state.go('app.scheduleAppointment::days');
    }

    $scope.backToDashboard = function() {
        scheduleAppointmentRequestService.forceCleanRequest();
        $state.go("app.dashboard");
    }
});
