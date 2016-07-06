// Controller of Register Page.
appControllers.controller('profileCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading) {

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
			$mdToast.showSimple('Algum erro aconteceu! :(');
		})
		.then(function() {
			$ionicLoading.hide();
		});


	$scope.save = function() {
		$ionicLoading.show();
		console.log($scope.appUser)
		authService.saveAppUser($scope.appUser)
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
