appControllers.controller('specialtyCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    specialtiesService) {

        $scope.specialties = specialtiesService.getAll();

});
