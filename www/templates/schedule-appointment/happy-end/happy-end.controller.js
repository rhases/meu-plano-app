appControllers.controller('happyEndCtrl', function ($scope, $state, $ionicHistory,
	ionicMaterialMotion, ionicMaterialInk, $timeout) {

	$timeout(function() {
		ionicMaterialMotion.fadeSlideIn();
		ionicMaterialInk.displayEffect();
	}, 100);

    $scope.ok = function() {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $state.go('app.dashboard');
    }
});
