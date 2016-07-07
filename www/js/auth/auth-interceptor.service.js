'use strict';
angular.module('starter')
	.factory('authInterceptor', function(localStorage) {
		var state;
		return {
			// Add authorization token to headers
			request: function(config) {
				config.headers = config.headers || {};

				config.headers.Authorization = 'Bearer ' + localStorage.get('AUTH_TOKEN');

				return config;
			},

			// Intercept 401s and redirect you to login
			// responseError: function(response) {
			//   if (response.status === 401) {
			// 	(state || (state = $injector.get('$state'))).go('login');
			// 	// remove any stale tokens
			// 	$cookies.remove('token');
			//   }
			//   return $q.reject(response);
			// }
		};
	});
