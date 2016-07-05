appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService) {

        $scope.appointment = appointmentService.appointment;

        $scope.selectedDays = appointmentService.getSelectedDays();

        $scope.selectedPeriods = appointmentService.getSelectedPeriods();

        $scope.selectedLocations = appointmentService.getSelectedLocations();
});
