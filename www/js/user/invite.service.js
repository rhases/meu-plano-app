angular.module('starter').service('inviteService', function($rootScope, $q, $http, localStorage) {

	var INVITE_STATUS_KEY = "INVITE_STATUS";

	function _status(email) {
		if (localStorage.get(INVITE_STATUS_KEY) == "registered")
			return $q(function(resolve) { resolve(localStorage.get(INVITE_STATUS_KEY)); });

		return $http.get(window.globalVariable.backend.schedulerServerUri + "api/invites/status/" + email)
			.then(function(res) {
				localStorage.set(INVITE_STATUS_KEY, res.data.status);
				return res.data.status;
			});
	}

	function _requestInvite(email) {
		// TODO: Implementar isto!!!
	}

	return {
		status: _status,
		requestInvite: _requestInvite
	}
})
