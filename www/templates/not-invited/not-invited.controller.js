// Controller of Register Page.
appControllers.controller('notInvitedCtrl', function ($scope, $state, $mdToast, authService, $ionicLoading, $rootScope, inviteService) {

	// TODO: send post to invite
	// inviteService

	$ionicLoading.show();
	authService.getAppUser()
		.then(function(appUser) {
			return inviteService.requestInvite(appUser.email)
		})
		.then(function() {
			$ionicLoading.hide();
		})

});
