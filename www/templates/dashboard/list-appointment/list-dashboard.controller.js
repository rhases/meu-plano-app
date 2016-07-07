// Controller of dashboard.
appControllers.controller('listAppointmentController', function ($http, $scope, $timeout, $state, $stateParams, $ionicHistory, lodash, $mdDialog, appointmentService, appointmentRequestService, APPOINTMENT_STATUS, APPOINTMENT_REQUEST_STATUS) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
    $scope.acceptedAppointment = [];
    $scope.scheduledAppointment = [];
    $scope.appointmentRequests = [];

    appointmentRequestService.getAppointmentRequestList()
        .then(function(appointments) {
            $scope.appointmentRequests = appointments;
        })
        .catch(function(error) {
            console.log(error);
        });

    appointmentService.getAppointmentList()
        .then(function(appointments) {
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
    }

    $scope.formatDate = function(data) {
        return moment(String(data)).locale("pt-BR").format("DD/MM/YY [as] h:mm");
    }

    $scope.cancelAppointment = function(appointment) {
        $state.go("app.dashboard-detail", {
            "appointment": appointment
        });
    }

    function divideByStatus(listAppointment) {
        var scheduledAppointment = listAppointment.filter(function(appointment) {
            return appointment.status === APPOINTMENT_STATUS.SCHEDULED;
        });

        if (!lodash.isNil(scheduledAppointment))
            $scope.scheduledAppointment = scheduledAppointment;

        var acceptedAppointment = listAppointment.filter(function(appointment) {
            return appointment.status === APPOINTMENT_STATUS.ACCEPTED;
        });

        if (!lodash.isNil(acceptedAppointment))
            $scope.acceptedAppointment = acceptedAppointment;
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
