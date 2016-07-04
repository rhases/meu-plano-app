appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService) {

        $scope.appointment = appointmentService.appointment;

});
