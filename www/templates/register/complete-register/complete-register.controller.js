// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading) {

	$scope.appUser = $rootScope.appUser || {};

	$scope.save = function() {
		$ionicLoading.show();
		console.log($scope.appUser);
		authService.saveAppUser($scope.appUser)
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
