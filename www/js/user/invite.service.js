angular.module('starter').service('inviteService', function($rootScope, $q, $http) {

	function _status(email) {
		return $http.get(window.globalVariable.backend.schedulerServerUri + "api/invites/status/" + email)
			.then(function(res) {
				return res.data.status;
			});
	}

	return {
		status: _status,
	}
})
