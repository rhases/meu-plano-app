appControllers.controller("commentModalController", function ($scope, $mdDialog) {

    $scope.comment = '';

    $scope.ok = function() {
        return $mdDialog.hide($scope.comment);
    }

	$scope.cancel = function() {
		return $mdDialog.cancel();
	}
});
