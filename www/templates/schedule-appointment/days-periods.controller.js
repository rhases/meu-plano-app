appControllers.controller('daysPeriodsCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    $state, scheduleAppointmentService) {

        $scope.appointment = scheduleAppointmentService.appointment;

        var periods = schedulerInfos.period;
        periods.forEach (function(period) { period.checked = false; });
        $scope.periods = periods;

        $scope.continue = function() {
            var selectedPeriods = periods.filter(function(element) { return element.checked });
            scheduleAppointmentService.setPeriods(selectedPeriods);
            $state.go('app.scheduleAppointment.locations');
        }
});
