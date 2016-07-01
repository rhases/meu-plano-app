appControllers.controller('daysPeriodsCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService) {

        $scope.appointment = appointmentService.appointment;

        $scope.daysSelected = $scope.appointment.days.filter(function(day) { return day.checked });

});
