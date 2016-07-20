appControllers.controller('happyEndCtrl', function ($scope, $state, $ionicHistory,
	ionicMaterialMotion, ionicMaterialInk, $timeout) {

	$timeout(function() {
		ionicMaterialMotion.fadeSlideIn();
		ionicMaterialInk.displayEffect();
	}, 100);

});
