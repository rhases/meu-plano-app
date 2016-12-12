// Controller of Register Page.
appControllers.controller('operatorRegisterCtrl', function ($scope, authService, toasts, $ionicLoading, $rootScope, Operator, $state) {

	$ionicLoading.show();
	$scope.isLoading = true;

    $scope.operators = [];

	Operator.queryByStateAndCity({'state': $rootScope.appUser.state, 'city': $rootScope.appUser.city}).$promise
        .then(function(operators) {
            $scope.operators = operators;
        })
		.catch(function() {
			$ionicLoading.hide();
			toasts.showSimple('Algum erro aconteceu! :(');
		})
        .then(function() {
            $ionicLoading.hide();
			$scope.isLoading = false;
        });

    $scope.select = function(operator) {
        $state.go('app.registerHealthplan', {
            'operator': operator._id
        });
    }
});
