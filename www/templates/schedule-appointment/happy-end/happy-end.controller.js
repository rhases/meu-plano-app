appControllers.controller('happyEndCtrl', function ($scope, $state) {

        $scope.ok = function() {
            $state.go('app.dashboard');
        }
});
