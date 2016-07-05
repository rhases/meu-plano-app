appControllers.controller('daysPeriodsCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    scheduleAppointmentService) {

        $scope.appointment = scheduleAppointmentService.appointment;

});
