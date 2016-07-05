// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, $mdToast, userService, $ionicLoading) {

	$scope.appUser = userService.getAppUser() || {};

	$scope.save = function() {
		$ionicLoading.show();
		userService.saveAppUser($scope.appUser)
			.then(function() {
				$state.go('app.profile');
			})
			.catch(function() {
				$mdToast.showSimple('Não foi possível comunicar com o servidor. Tente novamente mais tarde!');
			})
			.then(function() {
				$ionicLoading.hide();
			});
	}
});
