// Controller of Register Page.
appControllers.controller('healthplanRegisterCtrl', function ($scope, authService, toasts, $ionicLoading, $rootScope, $stateParams, HealthPlan) {

    $ionicLoading.show();

    $scope.healthPlans = [];
    var operatorId = null;
    if ($stateParams.operator)
        operatorId= $stateParams.operator;

    HealthPlan.queryByStateAndCityAndOperator({'state': $rootScope.appUser.state, 'city': $rootScope.appUser.city, 'operator': operatorId}).$promise
        .then(function(healthPlans) {
            $scope.healthPlans = healthPlans;
        })
        .then(function() {
            $ionicLoading.hide();
        })
        .catch(function() {
            toasts.showSimple('Algum erro aconteceu! :(');
        });

	$scope.save = function(healthPlan) {
		$ionicLoading.show();

        $rootScope.appUser.healthPlan = healthPlan._id;

		authService.saveAppUser($rootScope.appUser)
			.then(function(user) {
                $rootScope.appUser = user;
				$state.go('app.tabs.infos');
			})
			.then(function() {
				$ionicLoading.hide();
			})
            .catch(function() {
                toasts.showSimple('Não foi possível comunicar com o servidor. Tente novamente mais tarde!');
            });
	}
});
