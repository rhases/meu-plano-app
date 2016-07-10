// Controller of dashboard.
appControllers.controller('listAppointmentController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $ionicHistory, lodash, $mdDialog, $mdToast, $ionicLoading, appointmentService, appointmentRequestService, APPOINTMENT_STATUS, APPOINTMENT_REQUEST_STATUS) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
    $scope.appointmentRequests = [];
	$scope.scheduledAppointments = [];
	$scope.acceptedAppointments = [];

	$rootScope.$on('rhases:appointment:accept', function(appointmentId) {
		// TODO: Get appointment by id
		$scope.accept(appointment)
			.then(function() { return $scope.refresh(); });
	})

	$rootScope.$on('rhases:appointment:refuse', function(appointmentId) {
		// TODO: Get appointment by id
		$scope.refuse(appointment)
			.then(function() { return $scope.refresh(); });
	})
	$rootScope.$on('rhases:appointment:refresh', $scope.refresh)
	$rootScope.$on('rhases:refresh', $scope.refresh);


    appointmentRequestService.getAppointmentRequestList()
        .then(function(appointments) {
            $scope.appointmentRequests = appointments;
        })
        .catch(function(error) {
            console.log(error);
        });

    appointmentService.getAppointmentList()
        .then(function(appointments) {
			$scope.appointments = appointments;
            divideByStatus(appointments);
        })
        .catch(function(error) {
            console.log(error);
        });


	$scope.refresh = function() {
		// TODO
	}

    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    $scope.navigateTo = function(stateName) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.

    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function() {
        $state.go("app.setting");
    };// End goToSetting.

    $scope.relativeDateFormat = function(data) {
        return moment(String(data)).locale('pt-BR').fromNow();
    };

    $scope.formatDate = function(data) {
        return moment(String(data)).locale("pt-BR").format("DD/MM/YY [às] HH:mm");
    };

    // $scope.cancelAppointment = function(appointment) {
    //     $state.go("app.dashboard-detail", {
    //         "appointment": appointment
    //     });
    // };

	// when you receive the appointment (status: SCHEDULED) you need to accept or reject it
	// put the appointment in status ACCEPTED
	$scope.accept = function(appointment) {
		return changeStatus(appointment, APPOINTMENT_STATUS.ACCEPTED)
			.then(function() { $mdToast.showSimple('Aguardamos você na sua consulta!') });
	}

	// when you receive the appointment (status: SCHEDULED) you need to accept or reject it
	// put the appointment in status REFUSED
	$scope.refuse = function(appointment) {
		return $mdDialog.show({
			controller: 'commentModalController',
			templateUrl: 'templates/dashboard/list-appointment/comment-modal/comment-modal.html',
			// parent: angular.element(document.body),
			// targetEvent: ev,
			// clickOutsideToClose:true,
			// fullscreen: true
		})
		.then(
			function(comment) {
				changeStatus(appointment, APPOINTMENT_STATUS.REFUSED, comment)
					.then(function() { $mdToast.showSimple('Consulta recusada!') });
			});
	}

	// when the user accept the appointment at any time he can cancel it
	// put the appointment in status CANCELED
	$scope.cancel = function(appointment) {
		return $mdDialog.show({
			controller: 'commentModalController',
			templateUrl: 'templates/dashboard/list-appointment/comment-modal/comment-modal.html',
			// parent: angular.element(document.body),
			// targetEvent: ev,
			// clickOutsideToClose:true,
			// fullscreen: false
		})
		.then(
			function(comment) {
				changeStatus(appointment, APPOINTMENT_STATUS.CANCELED, comment)
					.then(function() { $mdToast.showSimple('Consulta cancelada!') });
			});
	}

	// One or two days before the appointment the user can really confirm it
	$scope.confirm = function(appointment) {
		return changeStatus(appointment, APPOINTMENT_STATUS.CONFIRMED)
			.then(function() { $mdToast.showSimple('Consulta confirmada!') });
	}

	// Only can confirm 48h before the appointment
	$scope.canConfirm = function(appointment) {
		return new Date(appointment.when).getTime() - new Date().getTime() > 1000 * 60 * 60 * 48;
	}

	function changeStatus(appointment, status, comment) {
		$ionicLoading.show();

		var oldStatus = appointment.status;
		appointment.status = status;
		appointment.comment = comment

		return appointmentService.update(appointment)
			.then(function() {
				console.log('Appointment status change from ' + oldStatus + ' to ' + status + '.');
			})
			.catch(function(err) { appointment.status = oldStatus; $mdToast.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.') })
			.then(function() { $ionicLoading.hide(); })
	}

    $scope.getMedicalSpecialization = function(specialityId) {
		// console.log(specialityId);
		var speciality = medicalInfos.getByCod(String(specialityId))
		if (speciality) {
	        return speciality.label;
		}
    };

	function divideByStatus(listAppointment) {
        var scheduledAppointments = listAppointment.filter(function(appointment) {
            return appointment.status === APPOINTMENT_STATUS.SCHEDULED;
        });

        if (!lodash.isNil(scheduledAppointments))
            $scope.scheduledAppointments = scheduledAppointments;

        var acceptedAppointments = listAppointment.filter(function(appointment) {
            return appointment.status === APPOINTMENT_STATUS.ACCEPTED;
        });

        if (!lodash.isNil(acceptedAppointments))
            $scope.acceptedAppointments = acceptedAppointments;
    }

    // function filterRequest(requestList) {
    //     var requestList = requestList.filter(function(request) {
    //         return request.status === APPOINTMENT_REQUEST_STATUS.NEW;
    //     });
    //
    //     if (!lodash.isNil(requestList))
    //         $scope.appointmentRequests = requestList;
    //
    //     return requestList;
    // }

}); // End of dashboard controller.
