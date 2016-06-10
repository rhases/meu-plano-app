// Controller of expense dashboard page.
appControllers.controller('userProfileCtrl', function ($scope,$state,$stateParams) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

	// doSomeThing is for do something when user click on a button
    $scope.doSomeThing = function () {
    	// You can put any function here.
    } // End doSomeThing.

    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.expenseSetting");
    };// End goToSetting.

});// End of controller expense dashboard.
