appControllers.controller('daysCtrl', function ($scope, $stateParams, $state, scheduleAppointmentRequestService) {

        var weekdays = schedulerInfos.allBusinessWeekdays();
        weekdays.forEach( function (day) { day.checked = false });
        $scope.weekdays = weekdays;

        $scope.continue = function() {
            var selectedDays = weekdays.filter(function(element) { return element.checked });
            scheduleAppointmentRequestService.setWeekDays(selectedDays);
            $state.go('app.scheduleAppointment.daysPeriods');
        }

        $scope.validateOptions = function() {
            return $scope.weekdays.some(function(weekday) {
                return weekday.checked;
            });
        }

        $scope.back = function() {
            console.log("Aqui carai");
            $state.go("app.scheduleAppointment");
        }

});
