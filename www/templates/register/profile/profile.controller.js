// Controller of Register Page.
appControllers.controller('profileCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading, $rootScope) {

	$scope.appUser = $rootScope.appUser || {};

	if(!$scope.appUser.profile)
		$scope.appUser.profile = {};
	if(!$scope.appUser.profile.healthPlan)
		$scope.appUser.profile.healthPlan = {};

	$scope.save = function() {
		$ionicLoading.show();
		console.log($scope.appUser)
		authService.saveAppUser($scope.appUser)
			.then(function(appUser) {
				if (appUser.status == "not_invited") {
					$state.go('app.notInvited');
				} else {
					$state.go('app.dashboard');
				}
			})
			.catch(function() {
				$mdToast.showSimple('Não foi possível comunicar com o servidor. Tente novamente mais tarde!');
			})
			.then(function() {
				$ionicLoading.hide();
			});
	}

	$scope.states = brazilianInfos.statesAndCities;
	$scope.cities = function() {
		if (!$scope.appUser || !$scope.appUser.profile || !$scope.appUser.profile.state)
			return [];
		return brazilianInfos.getStateByCod($scope.appUser.profile.state).cities;
	}
});
