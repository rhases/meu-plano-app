// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading, $rootScope) {

	$scope.appUser = {};
	$ionicLoading.show();
	authService.getAppUser()
		.then(function(appUser) {
			$scope.appUser = appUser || {};

			if ($scope.appUser.birthdate)
				$scope.birthdate = new Date($scope.appUser.birthdate);
		})
		.catch(function() {
			$scope.appUser = {};
			$mdToast.showSimple('Algum erro aconteceu! :(');
		})
		.then(function() {
			$ionicLoading.hide();
		});

	$scope.save = function() {
		$ionicLoading.show();

		$scope.appUser.birthdate = $scope.birthdate.toISOString();

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
