angular.module('starter')
    .run(function ($ionicPlatform, pushService) {
		$ionicPlatform.ready(function () {
			pushService.register();
			pushService.startListeners();
		});
	})
