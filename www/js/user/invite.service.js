angular.module('starter').service('inviteService', function($rootScope, $q, $http, localStorage, SCHEDULER_SERVER_URI) {

	var INVITE_STATUS_KEY = "INVITE_STATUS";

	function _status(email) {
		if (localStorage.get(INVITE_STATUS_KEY) == "registered")
			return $q(function(resolve) { resolve(localStorage.get(INVITE_STATUS_KEY)); });

		return $http.get(SCHEDULER_SERVER_URI + "api/invites/status/" + email)
			.then(function(res) {
				localStorage.set(INVITE_STATUS_KEY, res.data.status);
				return res.data.status;
			});
	}

	function _requestInvite(appUser) {
		var inviteRequest = {
			name: appUser.name,
			email: appUser.email,
			phone: appUser.phone,
			healthIssurance: (appUser && appUser.profile && appUser.profile.healthPlan ? appUser.profile.healthPlan.name : ''),
		}

		return $http.post(SCHEDULER_SERVER_URI + "api/invites/request", inviteRequest)
			.then(function(res) {
				return res.data;
			});
	}

	return {
		status: _status,
		requestInvite: _requestInvite
	}
})
