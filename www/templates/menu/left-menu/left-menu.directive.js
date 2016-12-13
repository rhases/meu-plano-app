appControllers
	.directive('leftMenu', function() {
		// Runs during compile
		return {
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: 'templates/menu/left-menu/left-menu.html',
			controller: function($scope, authService, $state, $timeout) {
				authService.getAppUser()
					.then(function(appUser) {
						if (!appUser || !appUser._id)
							return;

						$scope.appUser = appUser;
					});

				$scope.logout = function () {
					authService.logout();

					$timeout(function() {
						$state.go('app.login')
					}, 100);
				}
			}
		}
	});
