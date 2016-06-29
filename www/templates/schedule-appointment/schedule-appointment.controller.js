// Controller of defaultUserInterface.
appControllers.controller('scheduleAppointmentCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog) {

        // FIXME: service para pegar do banco as especialidades
        $scope.specialties = ['Cardiologista', 'Dermatologista', 'Urologista', 'Oftamologista'];

        // Evitando que a opcao em branco apareca na combobox.
        $scope.specialtySelected = $scope.specialties[0];

}); // End of defaultUserInterface controller.
