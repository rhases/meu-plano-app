// Controller of Register Page.
appControllers.controller('profileCtrl', function ($scope, $state, authService, toasts,
	$ionicLoading, $rootScope) {

	$scope.appUser = {};

	$ionicLoading.show();

	authService.getAppUser()
		.then(function(appUser) {
			$scope.appUser = appUser || {};

			if(!$scope.appUser.profile)
				$scope.appUser.profile = {};

			if(!$scope.appUser.profile.healthPlan)
				$scope.appUser.profile.healthPlan = {};
		})
		.catch(function() {
			$scope.appUser = {};
			toasts.showSimple('Algum erro aconteceu! :(');
		})
		.then(function() {
			$ionicLoading.hide();
		});


	$scope.save = function() {
		$ionicLoading.show();

		authService.saveAppUser($scope.appUser)
			.then(function(appUser) {
				$state.go('app.registerOperator');
			})
			.catch(function(ignore) {
				toasts.showSimple('Não foi possível comunicar com o servidor. Tente novamente mais tarde!');
			})
			.then(function() {
				$ionicLoading.hide();
			});
	}

	$scope.states = brazilianInfos.statesAndCities;

	$scope.cities = function() {
		if (!$scope.appUser || !$scope.appUser.state)
			return [];
		return brazilianInfos.getStateByCod($scope.appUser.state).cities;
	}



});
