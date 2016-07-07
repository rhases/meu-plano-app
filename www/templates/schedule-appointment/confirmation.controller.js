appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    $state, scheduleAppointmentRequestService) {

        $scope.appointment = scheduleAppointmentRequestService.getAppointmentRequest();

        $scope.submit = function() {
            scheduleAppointmentRequestService.submit(handleRequestSuccess, handleRequestError);
        }

        var handleRequestSuccess = function() {
            $state.go('app.scheduleAppointment.happy-end');
        }

        var handleRequestError = function(msg) {

        }
});
