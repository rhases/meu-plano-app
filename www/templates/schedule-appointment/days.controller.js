appControllers.controller('daysCtrl', function ($scope, $stateParams, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService) {

        $scope.appointment = appointmentService.appointment;

        $scope.appointment.specialty = $stateParams.specialtyChosen;

});
