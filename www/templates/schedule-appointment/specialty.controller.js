appControllers.controller('specialtyCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService, specialtiesService) {

        $scope.appointment = appointmentService;

        $scope.specialties = specialtiesService.getAll();

        $scope.appointment.specialty = $scope.specialties[0];

});
