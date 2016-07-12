appControllers.controller('happyEndCtrl', function ($scope, $state, $ionicHistory) {

        $scope.ok = function() {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('app.dashboard');
        }
});
