appControllers.controller('daysPeriodsCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService) {

        $scope.appointment = appointmentService.appointment;

});
