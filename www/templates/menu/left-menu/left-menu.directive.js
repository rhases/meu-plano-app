appControllers
	.directive('leftMenu', function() {
		// Runs during compile
		return {
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: 'templates/menu/left-menu/left-menu.html',
		}
	});
