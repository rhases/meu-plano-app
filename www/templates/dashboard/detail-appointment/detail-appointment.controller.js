appControllers.controller("detailAppointmentController", function($scope, $stateParams, lodash) {
    $scope.appointmentRequest = lodash.isNil($stateParams.appointmentRequest) ? {} : $stateParams.appointmentRequest;

    $scope.makeTitle = function(appointmentRequest) {
        var speciality = medicalInfos.getByCod(String(appointmentRequest.speciality));
		if (speciality) {
	        return "Detalhes " + speciality.label;
		}
    }

    $scope.getMedicalSpecialtyLabel = function(specialityP) {
        var speciality = medicalInfos.getByCod(String(specialityP));
		if (!speciality)
	        return;

        return speciality.label;
    }

    $scope.getCityLabel = function(cityCod) {
        var city = brazilianInfos.getCityByCod("df", String(cityCod));

        if (!city)
            return;

        return city.label;
    }

});
