// Controller of Register Page.
appControllers.controller('profileCtrl', function ($scope, $state, $mdToast, userService, $ionicLoading) {

	$scope.appUser = userService.getAppUser() || {};

	if(!$scope.appUser.healthPlan) {
		$scope.appUser.healthPlan = {};
	}

	$scope.save = function() {
		$ionicLoading.show();
		userService.saveAppUser($scope.appUser)
			.then(function() {
				$state.go('app.dashboard');
			})
			.catch(function() {
				$mdToast.showSimple('Não foi possível comunicar com o servidor. Tente novamente mais tarde!');
			})
			.then(function() {
				$ionicLoading.hide();
			});
	}
});
