// Controller of dashboard.
appControllers.controller('listAppointmentController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $ionicHistory, lodash, $mdDialog, $mdToast, $ionicLoading, appointmentService, appointmentRequestService, APPOINTMENT_STATUS, APPOINTMENT_REQUEST_STATUS) {
    console.log($rootScope);
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
	});

	$rootScope.$on('rhases:appointment:refuse', function(appointmentId) {
		// TODO: Get appointment by id
		$scope.refuse(appointment)
			.then(function() { return $scope.refresh(); });
	});

	$rootScope.$on('rhases:appointment:refresh', $scope.refresh);
	$rootScope.$on('rhases:refresh', $scope.refresh);

	$scope.refresh = function() {
	    appointmentRequestService.get({tryReloadFirst: true})
	        .then(function(appointments) {
				$scope.appointmentRequests = appointments;
				return appointmentService.get({tryReloadFirst: true});
			})
			.then(function(appointments) {
				$scope.appointments = appointments;
			})
	        .catch(function(err) { $mdToast.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.') })
			.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});;

	}
	$scope.refresh();


	$scope.cancelRequest = function(appointmentRequest) {
		return changeRequestStatus(appointmentRequest, APPOINTMENT_REQUEST_STATUS.CANCELED)
			.then(function() { $mdToast.showSimple('Seu pedido de consulta foi cancelado!') });
	}

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

    $scope.relativeDateFormat = function(data) {
        return moment(String(data)).locale('pt-BR').fromNow();
    };

    $scope.formatDate = function(data) {
        return moment(String(data)).locale("pt-BR").format("DD/MM/YY [às] HH:mm");
    };

    $scope.moreDetails = function(request) {
        if (!request) {
            $mdToast.showSimple("Algo de errado ocorreu, por favor tente novamente");
            return;
        }

        $state.go("app.dashboard-detail", {
                "appointmentRequest": request
        });
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

	function changeRequestStatus(appointmentRequest, status, comment) {
		$ionicLoading.show();

		var oldStatus = appointmentRequest.status;
		appointmentRequest.status = status;
		appointmentRequest.comment = comment

		return appointmentRequestService.update(appointmentRequest)
			.then(function() {
				console.log('Appointment request status change from ' + oldStatus + ' to ' + status + '.');
			})
			.catch(function(err) { appointmentRequest.status = oldStatus; $mdToast.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.') })
			.then(function() { $ionicLoading.hide(); })
	}

	// function divideByStatus(listAppointment) {
    //     var scheduledAppointments = listAppointment.filter(function(appointment) {
    //         return appointment.status === APPOINTMENT_STATUS.SCHEDULED;
    //     });
	//
    //     if (!lodash.isNil(scheduledAppointments))
    //         $scope.scheduledAppointments = scheduledAppointments;
	//
    //     var acceptedAppointments = listAppointment.filter(function(appointment) {
    //         return appointment.status === APPOINTMENT_STATUS.ACCEPTED;
    //     });
	//
    //     if (!lodash.isNil(acceptedAppointments))
    //         $scope.acceptedAppointments = acceptedAppointments;
    // }

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
