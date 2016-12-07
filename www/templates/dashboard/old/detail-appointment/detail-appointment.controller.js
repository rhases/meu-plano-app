appControllers.controller("detailAppointmentController", function($scope, $stateParams, lodash) {
    $scope.appointmentRequest = lodash.isNil($stateParams.appointmentRequest) ? {} : $stateParams.appointmentRequest;

    $scope.makeTitle = function(appointmentRequest) {
        var speciality = medicalInfos.getByCod(String(appointmentRequest.speciality));
		if (speciality) {
	        return "Detalhes " + speciality.label;
		}
    }

});
