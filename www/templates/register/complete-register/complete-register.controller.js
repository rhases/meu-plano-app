// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading, $rootScope) {

	$ionicLoading.show();
	authService.getAppUser()
		.then(function(appUser) {
			$scope.appUser = appUser || {};
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
