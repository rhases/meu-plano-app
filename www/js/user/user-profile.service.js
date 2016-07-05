angular.module('starter').service('userProfileService', function($rootScope, $q, $http) {

	function _get(email) {
		return $http.get(window.globalVariable.backend.schedulerServerUri + "/api/user-profiles/" + email);
	}


	function _save(user) {
		var userProfile = {
			_id: user.email, // email
			name: user.name,
			hasHealthPlan: user.hasHealthPlan,
			healthPlanNumber: user.healthPlanNumber,
			healthPlanOperator: user.healthPlanOperator
		};
		// envia para o scheduler-ws.
		return $http.put(window.globalVariable.backend.schedulerServerUri + "/api/user-profiles/" + userProfile._id, userProfile)
			.catch(function(error) {
				return $http.post('/proxy-service/hi/api/health-insurance/user-profiles', userProfile);
			});
	}

	return {
		get: _get,
		save: _save
	}
})
