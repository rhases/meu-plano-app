appControllers.controller("commentModalController", function ($mdDialog) {

    $scope.comment = '';

    $scope.ok = function() {
        return $mdDialog.hide($scope.comment);
    }

	$scope.cancel = function() {
		return $mdDialog.cancel();
	}
});
