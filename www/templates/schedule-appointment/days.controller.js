appControllers.controller('daysCtrl', function ($scope, $stateParams, $mdBottomSheet, $mdToast, $mdDialog,
    $state, scheduleAppointmentRequestService) {

        $scope.appointment = scheduleAppointmentRequestService.getAppointmentRequest();

        var weekdays = schedulerInfos.weekdays;
        weekdays.forEach( function (day) { day.checked = false });
        $scope.weekdays = weekdays;

        $scope.continue = function() {
            var selectedDays = weekdays.filter(function(element) { return element.checked });
            scheduleAppointmentRequestService.setWeekDays(selectedDays);
            $state.go('app.scheduleAppointment.daysPeriods');
        }
});
