// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, authService, toasts, $ionicLoading, $rootScope) {

	moment().locale('pt-br');
	moment.tz.setDefault("America/Sao_Paulo");

	$scope.appUser = {};

	$ionicLoading.show();

	authService.getAppUser()
		.then(function(appUser) {
			console.log(appUser);
			$scope.appUser = appUser || {};
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
			.then(function() {
				$state.go('app.registerProfile');
			})
			.catch(function() {
				toasts.showSimple('Não foi possível comunicar com o servidor. Tente novamente mais tarde!');
			})
			.then(function() {
				$ionicLoading.hide();
			});
	}
});
