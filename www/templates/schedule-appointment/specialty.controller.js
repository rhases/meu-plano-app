appControllers.controller('specialtyCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    $state, scheduleAppointmentService) {

        $scope.specialties = medicalInfos.specializations;

        $scope.selectSpecialty = function(specialty) {
            scheduleAppointmentService.setSpecialty(specialty);
            $state.go('app.scheduleAppointment.days');
        }
});
