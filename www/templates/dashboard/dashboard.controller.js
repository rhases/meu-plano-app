// Controller of dashboard.
appControllers.controller('dashboardController', function ($http, $scope, $rootScope, $timeout, $state, $stateParams,
	$q, lodash, appointmentService, appointmentRequestService, ionicMaterialMotion, ionicMaterialInk,
	APPOINTMENT_STATUS, APPOINTMENT_REQUEST_STATUS, transformUtils, toasts,
	$ionicHistory, $ionicPopup, $ionicModal, $ionicLoading) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
    $scope.appointmentRequests = [];
	$scope.scheduledAppointments = [];
	$scope.acceptedAppointments = [];

	$rootScope.$on('rhases:appointment:accept', function(event, appointmentId) {
		$scope.refresh()
			.then(findAppointment(appointmentId))
			.then(function(appointment) {
				return $scope.accept(appointment);
			})
			.catch(function() { toasts.showSimple('Algo ruim aconteceu! Feche o aplicativo e abra novamente.') })
	});

	$rootScope.$on('rhases:appointment:refuse', function(event, appointmentId) {
		$scope.refresh()
			.then(findAppointment(appointmentId))
			.then(function(appointment) {
				return $scope.refuse(appointment);
			})
			.catch(function() { toasts.showSimple('Algo ruim aconteceu! Feche o aplicativo e abra novamente.') })
	});

	$rootScope.$on('rhases:appointment:refresh', function() { $scope.refresh().then(function() { console.log("ok"); }) });
	$rootScope.$on('rhases:refresh', function() { $scope.refresh().then(function() { console.log("ok") }); });


	$scope.doRefresh = function() {
		return appointmentRequestService.get({tryReloadFirst: true})
	        .then(function(appointmentRequests) {
				$scope.appointmentRequests = appointmentRequests;
				return appointmentService.get({tryReloadFirst: true});
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

	$scope.refresh = function() {
		console.log("Refreshing...");
		$scope.loading = true;
	    return $scope.doRefresh()
			.then(function() { $scope.loading = false; });
	}

	$scope.refresh();

	$scope.cancelRequest = function(appointmentRequest) {
    var body = "Cancelar " + $rootScope.TRANSFORM_UTILS.getMedicalSpecialtyLabelByCod(appointmentRequest.speciality) + " ?";
        showConfirm("Cancelar solicitação", body)
            .then(function(res) {
                if (res) {
                    changeRequestStatus(appointmentRequest, APPOINTMENT_REQUEST_STATUS.CANCELED)
                        .then(function() {
                            toasts.showSimple('Seu pedido de consulta foi cancelado!')
                        });
                }
            });
	}

	// when you receive the appointment (status: SCHEDULED) you need to accept or reject it
	// put the appointment in status ACCEPTED
	$scope.accept = function(appointment) {
		return changeStatus(appointment, APPOINTMENT_STATUS.ACCEPTED)
			.then(function() { toasts.showSimple('Aguardamos você na sua consulta!') });
	}

	// when you receive the appointment (status: SCHEDULED) you need to accept or reject it
	// put the appointment in status REFUSED
	$scope.goToCancel = function(appointment) {
		$state.go("app.dashboard-cancel", {
				"appointment": appointment
			});
	}

	// One or two days before the appointment the user can really confirm it
	$scope.confirm = function(appointment) {
		return changeStatus(appointment, APPOINTMENT_STATUS.CONFIRMED)
			.then(function() { toasts.showSimple('Consulta confirmada!') });
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
            toasts.showSimple("Algo de errado ocorreu, por favor tente novamente");
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

    $scope.makeAddressClinic = function(clinic) {
        if (!clinic)
            return;

        console.log(clinic.name);
        console.log(clinic.unit.address);
        return clinic.name + ", " + clinic.unit.address;
    }

    function showConfirm(title, body) {
        return confirmPopup = $ionicPopup.confirm({
            title: title,
            template: body,
			buttons: [
				{ text: "NÃO" },
				{
					text: "SIM",
					type: "button-positive",
					onTap: function(e) {
						return true;
					}
				}
			]
        });
     }

	function changeStatus(appointment, status, comment) {
		$ionicLoading.show();

		var oldStatus = appointment.status;
		appointment.status = status;
		appointment.comment = comment

		return appointmentService.update(appointment)
			.then(function() {
				console.log('Appointment status change from ' + oldStatus + ' to ' + status + '.');
				$ionicLoading.hide();
				animateList();
			})
			.catch(function(err) {
				appointment.status = oldStatus;
				toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.');
				$ionicLoading.hide();
				animateList();
				throw err;
			})
	}

	function changeRequestStatus(appointmentRequest, status, comment) {
		$ionicLoading.show();

		var oldStatus = appointmentRequest.status;
		appointmentRequest.status = status;
		appointmentRequest.comment = comment

		return appointmentRequestService.update(appointmentRequest)
			.then(function() {
				console.log('Appointment request status change from ' + oldStatus + ' to ' + status + '.');
				$ionicLoading.hide();
				animateList();
			})
			.catch(function(err) {
				appointmentRequest.status = oldStatus; toasts
				.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.')
				$ionicLoading.hide();
				animateList();
				throw err;

			})
	}

	function findAppointment(appointmentId) {
		return function() {
			i = lodash.findIndex($scope.appointments, function(o) { return o._id == appointmentId; });
			if (i >= 0)
				return $scope.appointments[i];
		}
	}

	function showModalComment(title) {
		return $q(function(resolve, reject) {
			$ionicModal.fromTemplateUrl('templates/dashboard/comment-modal/comment-modal.html', {
					scope: $scope,
					animation: 'slide-in-up'
				})
				.then(function(modal) {
					var commentModal = {
						title: title,
						ok: function() {
							modal.remove();
							resolve($scope.commentModal);
							delete $scope.commentModal;
						},
						cancel: function() {
							modal.remove();
							reject();
							delete $scope.commentModal;
						}
					}

					$scope.commentModal = commentModal;
					modal.show();
				});
		})
	}

	function animateList() {
	    $timeout(function() {
			ionicMaterialMotion.fadeSlideIn();
			ionicMaterialInk.displayEffect();
		}, 100);
	}

}); // End of dashboard controller.
