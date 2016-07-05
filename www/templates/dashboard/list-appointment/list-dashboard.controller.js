// Controller of dashboard.
appControllers.controller('dashboardListCtrl', function ($scope, $timeout, $state, $stateParams, $ionicHistory, $mdDialog, appointmentService) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.

    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.setting");
    };// End goToSetting.

    // cancel appointment
    $scope.cancelAppointment = function ($event) {
    }// End cancel appointment.

}); // End of dashboard controller.
