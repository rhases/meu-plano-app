appControllers.controller('daysPeriodsCtrl', function ($scope, $state, scheduleAppointmentRequestService) {

        var periods = schedulerInfos.period;
        periods.forEach (function(period) { period.checked = false; });
        $scope.periods = periods;

        $scope.continue = function() {
            var selectedPeriods = periods.filter(function(element) { return element.checked });
            scheduleAppointmentRequestService.setPeriods(selectedPeriods);
            $state.go('app.scheduleAppointment.locations');
        }
});
