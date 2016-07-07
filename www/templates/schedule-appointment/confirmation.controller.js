appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    $state, scheduleAppointmentRequestService) {

        $scope.appointment = scheduleAppointmentRequestService.getAppointmentRequest();

        $scope.submit = function() {
            scheduleAppointmentRequestService.submit(handleRequestSuccess, handleRequestError);
        }

        var handleRequestSuccess = function() {
            $state.go('app.dashboard');
        }

        var handleRequestError = function(msg) {
            
        }
});
