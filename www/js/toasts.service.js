'use strict';

// https://github.com/fezvrasta/snackbarjs

angular.module('starter')
	.factory('toasts', function() {
		return {
			// Add authorization token to headers
			showSimple: function(text) {
				$.snackbar({ content: text, htmlAllowed: true });
			},
		};
	});
