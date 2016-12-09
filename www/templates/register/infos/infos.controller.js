// Controller of Register Page.
appControllers.controller('registerCtrl', function ($scope, $state, authService, toasts,
	$ionicLoading, $rootScope) {

	moment().locale('pt-br');
	moment.tz.setDefault("America/Sao_Paulo");

	$scope.appUser = {};

	// $rootScope.userProfile = {
	// 	_id: "contato@rhases.com.br", // email
	// 	state: "df",
	// 	city: "brasilia",
	// 	name: "Marvio Lúcio Silva",
	// 	healthPlan: 463945116
	// };
	
	$ionicLoading.show();

	authService.getAppUser()
		.then(function(appUser) {
			$scope.appUser = appUser || {};

			console.log($scope.appUser)
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
