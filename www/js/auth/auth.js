angular.module('starter')
    .config(function ($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	})
