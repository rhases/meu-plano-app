// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading, $rootScope) {

	$scope.birthdate = null;
	$scope.appUser = {};
	$ionicLoading.show();
	authService.getAppUser()
		.then(function(appUser) {
			$scope.appUser = appUser || {};

			console.log($scope.appUser)
			console.log($scope.appUser.birthdate)

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

		console.log($scope.birthdate);
		if ($scope.birthdate)
			$scope.appUser.birthdate = $scope.birthdate.toISOString();

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
