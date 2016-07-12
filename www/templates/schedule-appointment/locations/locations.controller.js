appControllers.controller('locationsCtrl', function ($scope, $state, scheduleAppointmentRequestService) {

        $scope.locations = [
                {label: 'Asa Norte', checked: false},
                {label: 'Asa Sul', checked: false},
                {label: 'Taguatinga', checked: false},
        ];

        $scope.continue = function() {
            var selectedLocations = $scope.locations.filter(function(element) { return element.checked });
            scheduleAppointmentRequestService.setLocations(selectedLocations);
            $state.go('app.scheduleAppointment.observations');
        }

});
