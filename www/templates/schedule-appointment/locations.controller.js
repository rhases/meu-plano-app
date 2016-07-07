appControllers.controller('locationsCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    $state, scheduleAppointmentService) {

        $scope.appointment = scheduleAppointmentService.appointment;

        $scope.locations = [
                {label: 'Asa Norte', checked: false},
                {label: 'Asa Sul', checked: false},
                {label: 'Taguatinga', checked: false},
        ];

        $scope.continue = function() {
            var selectedLocations = $scope.locations.filter(function(element) { return element.checked });
            scheduleAppointmentService.setLocations(selectedLocations);
            $state.go('app.scheduleAppointment.confirmation');
        }

});
