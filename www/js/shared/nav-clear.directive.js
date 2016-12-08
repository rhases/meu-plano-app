appServices.directive('navClear', function($ionicHistory, $timeout) {
	return {
		restrict: 'AC',
		link: function($scope, $element) {
			// console.log("===> BIND")
			console.log($element)
			$element.bind('click', function() {
				// console.log("===> CLICK!!!")
				$ionicHistory.nextViewOptions({
					historyRoot: true,
					// disableAnimate: true,
					expire: 300
				});
				// // if no transition in 300ms, reset nextViewOptions
				// // the expire should take care of it, but will be cancelled in some
				// // cases. This directive is an exception to the rules of history.js
				// $timeout(function() {
				// 	$ionicHistory.nextViewOptions({
				// 		historyRoot: false,
				// 		disableAnimate: false
				// 	});
				// }, 300);
			});
		}
	};
});
