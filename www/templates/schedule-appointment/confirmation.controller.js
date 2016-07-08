appControllers.controller('confirmationCtrl', function ($scope, $mdBottomSheet, $mdToast, $mdDialog, $ionicLoading, $state, analyticsService, scheduleAppointmentRequestService) {

        $scope.appointment = scheduleAppointmentRequestService.getAppointmentRequest();

        $scope.submit = function() {
          $ionicLoading.show({
            template: 'Solicitando agendamento...'
          });
            scheduleAppointmentRequestService.submit(handleRequestSuccess, handleRequestError);

        }

        var handleRequestSuccess = function() {
            $state.go('app.scheduleAppointment.happy-end');
            $ionicLoading.hide();
        }

        var handleRequestError = function(error) {
          analyticsService.track.logError('appointment-request-error: requesting:' + JSON.stringify(error) );
          analyticsService.track.appointment('requesting', 'error', error)

          $ionicLoading.hide();

          $mdToast.showSimple('Desculpe. Está ocorrendo um erro ao enviar solicitação. Por favor, tente novamente em alguns segundos');
        };
});
