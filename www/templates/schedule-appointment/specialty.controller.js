appControllers.controller('specialtyCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    $state, scheduleAppointmentRequestService) {

        $scope.specialties = medicalInfos.specializations;

        $scope.selectSpecialty = function(specialty) {
            scheduleAppointmentRequestService.setSpecialty(specialty);
            $state.go('app.scheduleAppointment.days');
        }
});
