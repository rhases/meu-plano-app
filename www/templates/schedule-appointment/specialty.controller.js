appControllers.controller('specialtyCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService, specialtiesService) {

        $scope.specialties = specialtiesService.getAll();

});
