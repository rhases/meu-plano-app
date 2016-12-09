// Controller of Register Page.
appControllers.controller('operatorRegisterCtrl', function ($scope, authService, toasts, $ionicLoading, $rootScope, Operator, $state) {

	$ionicLoading.show();

    $scope.operators = [];

	Operator.queryByStateAndCity({'state': $rootScope.appUser.state, 'city': $rootScope.appUser.city}).$promise
        .then(function(operators) {
            $scope.operators = operators;
        })
        .then(function() {
            $ionicLoading.hide();
        })
        .catch(function() {
            toasts.showSimple('Algum erro aconteceu! :(');
        });

    $scope.select = function(operator) {
        $state.go('app.registerHealthplan', {
            'operator': operator._id
        });
    }
});
