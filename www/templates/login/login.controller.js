appControllers.controller('loginCtrl', function($scope, authService, $rootScope) {
    if (!$rootScope.appUser || !$rootScope.appUser.healthPlan)
        authService.logout();
});
