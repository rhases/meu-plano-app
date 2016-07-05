appControllers.controller('locationsCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService) {

        $scope.appointment = appointmentService.appointment;

});
