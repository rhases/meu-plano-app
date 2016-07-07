// Controller of dashboard.
appControllers.controller('dashboardListCtrl', function ($scope, $timeout, $state, $stateParams, $ionicHistory, lodash, $mdDialog, appointmentService, APPOINTMENT_STATUS) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
    $scope.acceptedAppointment = [];
    $scope.scheduledAppointment = [];

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
    $scope.navigateTo = function (stateName) {
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
    $scope.goToSetting = function () {
        $state.go("app.setting");
    };// End goToSetting.

    // cancel appointment
    $scope.cancelAppointment = function ($event) {
    }// End cancel appointment.

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

}); // End of dashboard controller.
