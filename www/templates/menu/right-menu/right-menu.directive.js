appControllers
	.directive('rightMenu', function() {
		// Runs during compile
		return {
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			controller: 'rightMenuController',
			templateUrl: 'templates/menu/right-menu/right-menu.html',
		}
	});
