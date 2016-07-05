// Controller of Register Page.
appControllers.controller('registerCtrl', function ($mdBottomSheet, $mdToast, $scope, $stateParams, $filter, $mdDialog, $ionicHistory, userService) {

	$scope.user = userService.getAppUser();
	console.log('Current User: ' + JSON.stringify($scope.user));
});
