angular.module('starter')
  .run(function ($ionicPlatform, $rootScope, analyticsService) {
    $ionicPlatform.ready(function () {
      analyticsService.setup();
        //Checking if view is changing it will go to this function.
      $rootScope.$on("$ionicView.beforeEnter", analyticsService.onView);
    });

  });
