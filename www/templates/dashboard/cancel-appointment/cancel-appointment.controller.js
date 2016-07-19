appControllers.controller("cancelAppointmentController", function ($scope, $timeout, $state, $stateParams, $ionicHistory, lodash, appointmentService, transformUtils) {

    $scope.appointment = lodash.isNil($stateParams.appointment) ? undefined : $stateParams.appointment;

    $scope.formatTitle = function() {
        return "Cancelamento " + transformUtils.getMedicalSpecialtyLabelByCod($scope.appointment.doctor.speciality);
    }

    function changeStatus(appointment, status, comment) {
		$ionicLoading.show();

		var oldStatus = appointment.status;
		appointment.status = status;
		appointment.comment = comment;

		return appointmentService.update(appointment)
			.then(function() {
				console.log('Appointment status change from ' + oldStatus + ' to ' + status + '.');
			})
			.catch(function(err) { appointment.status = oldStatus; $mdToast.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.') })
			.then(function() { $ionicLoading.hide(); })
	}

});
