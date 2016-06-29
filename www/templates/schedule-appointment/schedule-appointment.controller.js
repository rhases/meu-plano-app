// Controller of defaultUserInterface.
appControllers.controller('scheduleAppointmentCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog) {

        // FIXME: service para pegar do banco as especialidades
        $scope.specialties = ['Cardiologista', 'Dermatologista', 'Urologista', 'Oftamologista'];

}); // End of defaultUserInterface controller.
