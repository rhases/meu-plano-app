appControllers.controller('locationsCtrl', function ($scope, $state,
	scheduleAppointmentRequestService, ionicMaterialMotion, ionicMaterialInk, $timeout) {

    $scope.locations = [
            {label: 'Asa Norte', checked: false},
            {label: 'Asa Sul', checked: false},
            {label: 'Taguatinga', checked: false},
    ];

	$timeout(function() {
		ionicMaterialMotion.fadeSlideIn();
		ionicMaterialInk.displayEffect();
	}, 100);

    $scope.continue = function() {
        var selectedLocations = $scope.locations.filter(function(element) { return element.checked });
        scheduleAppointmentRequestService.setLocations(selectedLocations);
        $state.go('app.scheduleAppointment::observations');
    }

    $scope.validateOptions = function() {
        return $scope.locations.some(function(location) {
            return location.checked;
        });
    }
});
