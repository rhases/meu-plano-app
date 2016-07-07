appControllers.controller("detailAppointmentController", function ($scope, $timeout, $state, $stateParams, $ionicHistory, lodash, $mdDialog, appointmentService, APPOINTMENT_STATUS) {

    $scope.appointment = lodash.isNil($stateParams.appointment) ? undefined : $stateParams.appointment;

    $scope.formatTitle = function() {
        return "alguma coisa";
    }

});
