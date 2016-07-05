appControllers.controller('daysCtrl', function ($scope, $stateParams, $mdBottomSheet, $mdToast, $mdDialog,
    scheduleAppointmentService) {

        $scope.appointment = scheduleAppointmentService.appointment;

        $scope.appointment.specialty = $stateParams.specialtyChosen;

});
