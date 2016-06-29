// Controller of defaultUserInterface.
appControllers.controller('scheduleAppointmentCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog) {

        // FIXME: service para pegar do banco as especialidades
        $scope.specialties = ['Cardiologista', 'Dermatologista', 'Urologista', 'Oftamologista'];

        // Evitando que a opcao em branco apareca na combobox.
        $scope.specialtySelected = $scope.specialties[0];

        $scope.availableDays = ['segunda-feira', 'terça-feira', 'quarta-feira',
          'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

}); // End of defaultUserInterface controller.
