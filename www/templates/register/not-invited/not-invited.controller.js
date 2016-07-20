// Controller of Register Page.
appControllers.controller('notInvitedCtrl', function ($scope, $state, toasts,
	authService, $ionicLoading, $ionicHistory, $rootScope, inviteService, authService) {

	$ionicLoading.show();
	authService.getAppUser()
		.then(function(appUser) {
			return inviteService.requestInvite(appUser)
		})
		.catch(function(err) {
			toasts.showSimple('Algum erro aconteceu! :(');
			$state.go('app.register::profile'); //back so user can submit again
		})
		.then(function() {
			$ionicLoading.hide();
		})

	$scope.close = function() {
		console.log("Closing app...")
		ionic.Platform.exitApp();
	}

	$scope.logout = function() {
		authService.logout();
		$state.go('app.login');
	}

});
