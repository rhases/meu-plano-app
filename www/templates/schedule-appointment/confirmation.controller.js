appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    scheduleAppointmentRequestService) {

        $scope.appointment = scheduleAppointmentRequestService.getAppointmentRequest();

});
