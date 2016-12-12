// Controller of Register Page.
appControllers.controller('healthplanRegisterCtrl', function ($scope, authService, toasts, $ionicLoading, $rootScope, $stateParams, HealthPlan, $state) {

    $ionicLoading.show();

    $scope.isLoading = true;
    $scope.appUser = {};
    $scope.healthPlans = [];
    var operatorId = null;

    if ($stateParams.operator)
        operatorId= $stateParams.operator;

    authService.getAppUser()
		.then(function(appUser) {
            $scope.appUser = appUser;

            return HealthPlan.queryByStateCityAndOperator({'state': appUser.state, 'city': appUser.city, 'operator': operatorId}).$promise;
        })
        .then(function(healthPlans) {
            $scope.healthPlans = healthPlans;
        })
        .catch(function() {
            toasts.showSimple('Algum erro aconteceu! :(');
        })
        .then(function() {
            $ionicLoading.hide();
            $scope.isLoading = false;
        });

	$scope.select = function(healthPlan) {
		$ionicLoading.show();

        $scope.appUser.healthPlan = {'cod': healthPlan._id.cod, 'operator': healthPlan._id.operator._id};

		authService.saveAppUser($scope.appUser)
			.then(function(user) {
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
