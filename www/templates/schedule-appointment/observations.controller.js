appControllers.controller('observationsCtrl', function ($scope, $state, scheduleAppointmentRequestService) {

        var observations = "";

        $scope.observations = observations;

        $scope.continue = function() {
            scheduleAppointmentRequestService.setObservations(observations);
            $state.go('app.scheduleAppointment.confirmation');
        }
});
