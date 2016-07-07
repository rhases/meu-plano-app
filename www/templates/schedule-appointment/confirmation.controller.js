appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    scheduleAppointmentService) {

        $scope.appointment = scheduleAppointmentService.appointment;

        $scope.selectedPeriods = scheduleAppointmentService.getSelectedPeriods();

        $scope.selectedLocations = scheduleAppointmentService.getSelectedLocations();
});
