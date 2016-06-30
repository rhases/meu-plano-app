// Controller of defaultUserInterface.
appControllers.controller('scheduleAppointmentCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog,
    appointmentService, specialtiesService) {

        $scope.appointment = appointmentService;
        console.log($scope.appointment.specialty);

        $scope.specialties = specialtiesService.getAll();

        $scope.availableDays = ['segunda-feira', 'terça-feira', 'quarta-feira',
          'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

}); // End of defaultUserInterface controller.
