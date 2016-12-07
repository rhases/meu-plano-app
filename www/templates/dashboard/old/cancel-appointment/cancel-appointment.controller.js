appControllers.controller("cancelAppointmentController", function ($scope, $state, $stateParams, lodash, appointmentService, transformUtils, $ionicLoading, toasts, APPOINTMENT_STATUS) {

    $scope.appointment = lodash.isNil($stateParams.appointment) ? undefined : $stateParams.appointment;

    $scope.formatTitle = function() {
        return "Cancelamento " + transformUtils.getMedicalSpecialtyLabelByCod($scope.appointment.doctor.speciality);
    }

    $scope.cancel = function() {
        var nextState = $scope.appointment.status === APPOINTMENT_STATUS.SCHEDULED ? APPOINTMENT_STATUS.REFUSED : APPOINTMENT_STATUS.CANCELED;

        changeStatus($scope.appointment, nextState, $scope.comment)
            .then(function() {
                toasts.showSimple("Cancelado com sucesso.");
                setTimeout(function () {
                    $state.go("app.dashboard");
                }, 1000);
            });
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
			.catch(function(err) {
                appointment.status = oldStatus;
                toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.')
            })
			.then(function() {
                $ionicLoading.hide();
            });
	}

});
