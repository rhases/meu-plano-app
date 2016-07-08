// Controller of dashboard.
appControllers.controller('listAppointmentController', function ($http, $scope, $timeout, $state, $stateParams, $ionicHistory, lodash, $mdDialog, $mdToast, $ionicLoading, appointmentService, appointmentRequestService, APPOINTMENT_STATUS, APPOINTMENT_REQUEST_STATUS) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
    $scope.appointmentRequests = [];
	$scope.scheduledAppointments = [];
	$scope.acceptedAppointments = [];


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
	// put the appointment in state ACCEPTED
	$scope.accept = function(appointment) {
		changeState(appointment, "ACCEPTED")
			.then(function() { $mdToast.showSimple('Consulta aceitada!') });
	}

	// when you receive the appointment (status: SCHEDULED) you need to accept or reject it
	// put the appointment in state REFUSED
	$scope.refuse = function(appointment) {
		$mdDialog.show({
			controller: 'commentModalController',
			templateUrl: 'templates/dashboard/list-appointment/comment-modal/comment-modal.html',
			parent: angular.element(document.body),
			// targetEvent: ev,
			// clickOutsideToClose:true,
			// fullscreen: false
		})
		.then(
			function(comment) {
				changeState(appointment, "REFUSED", comment)
					.then(function() { $mdToast.showSimple('Consulta recusada!') });
			});
	}

	// when the user accept the appointment at any time he can cancel it
	// put the appointment in state CANCELED
	$scope.cancel = function(appointment) {
		$mdDialog.show({
			controller: 'commentModalController',
			templateUrl: 'templates/dashboard/list-appointment/comment-modal/comment-modal.html',
			parent: angular.element(document.body),
			// targetEvent: ev,
			// clickOutsideToClose:true,
			// fullscreen: false
		})
		.then(
			function(comment) {
				changeState(appointment, "CANCELED", comment)
					.then(function() { $mdToast.showSimple('Consulta cancelada!') });
			});
	}

	// One or two days before the appointment the user can really confirm it
	$scope.confirm = function(appointment) {
		changeState(appointment, "CONFIRMED")
			.then(function() { $mdToast.showSimple('Consulta confirmada!') });
	}

	// Only can confirm 48h before the appointment
	$scope.canConfirm = function(appointment) {
		return new Date(appointment.when).getTime() - new Date().getTime() > 1000 * 60 * 60 * 48;
	}

	function changeState(appointment, state) {
		$ionicLoading.show();

		var oldState = appointment.state;
		appointment.state = state;

		return appointmentService.update(appointment)
			.then(function() {
				console.log('Appointment state change from ' + oldState + ' to ' + state + '.');
			})
			.catch(function(err) { appointment.state = oldState; })
			.then(function() { $ionicLoading.hide(); })
	}

    $scope.getMedicalSpecialization = function(specialityId) {
		console.log(medicalInfos.getByCod(String(specialityId)).label);
        return medicalInfos.getByCod(String(specialityId)).label;
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
