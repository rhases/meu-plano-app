// Controller of Register Page.
appControllers.controller('notInvitedCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading, $ionicHistory, $rootScope, inviteService, authService) {

	$ionicLoading.show();
	authService.getAppUser()
		.then(function(appUser) {
			return inviteService.requestInvite(appUser)
		})
		.catch(function(err) {
			$mdToast.showSimple('Algum erro aconteceu! :(');
			$state.go('app.profile'); //back so user can submit again
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
		$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
		});
		$state.go('app.login');
	}

});
