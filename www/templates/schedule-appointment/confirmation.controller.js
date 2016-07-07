appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    scheduleAppointmentService) {

        $scope.appointment = scheduleAppointmentService.appointment;

});
