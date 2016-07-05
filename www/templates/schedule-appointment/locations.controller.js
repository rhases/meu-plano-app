appControllers.controller('locationsCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    scheduleAppointmentService) {

        $scope.appointment = scheduleAppointmentService.appointment;

});
