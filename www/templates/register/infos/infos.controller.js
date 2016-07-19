// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, authService, toasts,
	$ionicLoading, $rootScope) {

	moment().locale('pt-br');
	moment.tz.setDefault("America/Sao_Paulo");

	$scope.appUser = {};
	$ionicLoading.show();
	authService.getAppUser()
		.then(function(appUser) {
			$scope.appUser = appUser || {};

			console.log($scope.appUser)
			console.log($scope.appUser.birthdate)

			if ($scope.appUser.birthdate) {
				console.log(moment(new Date($scope.appUser.birthdate)).format('L'))
				$scope.birthdate = moment(new Date($scope.appUser.birthdate)).format('L');
			}
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

		$scope.appUser.birthdate = moment($scope.birthdate).format();

		authService.saveAppUser($scope.appUser)
			.then(function() {
				$state.go('app.register::profile');
			})
			.catch(function() {
				toasts.showSimple('Não foi possível comunicar com o servidor. Tente novamente mais tarde!');
			})
			.then(function() {
				$ionicLoading.hide();
			});
	}
});
