angular.module('starter').service('userService', function($rootScope, $cordovaPushV5, $q, $http) {

	var _user;
	var _authToken;

	function _getCurrentUser() {
		return _user;
	}

	function _getAuthToken() {
		return _authToken;
	}

	function _facebookSignUp(facebookInfo) {

		// Salva o authUser lá no rhases-auth
		_saveAuthUser(facebookInfo)
			.then();
		// verifica se o usuario ja esta registrado ou se possui convite.
		status = _getPersonStatus(facebookInfo.email)
		.then(function(status) {

			// Cria model do usuario no app
			user = _fbProfileToUser(facebookInfo, status);

			if(status === "invited") {
			}

		})
		.catch(function(error) {
			console.log('facebookSignUp error ' + JSON.stringify(error), error);
		});
		// TODO Se esta, somente carrega suas informacoes.
		// Se nao, salva no auth-ws e cria o usuario no schedule-ws
		return
	}

	function _getPersonStatus(email) {
		var deferred = $q.defer();

		// TODO consulta status no schedule-ws
		deferred.resolve("invited");
		// invited, not_invited, registered
		return deferred.promise;
	}

	function _fbProfileToUser(facebookInfo, status) {
		_user = {
			name: facebookInfo.name,
			email: facebookInfo.email,
			picture : "https://graph.facebook.com/" + facebookInfo.id + "/picture?type=large",
			status: status
		};
		return _user;
	}

	function _saveAuthUser(facebookInfo) {
		var authUser = {
		    name: facebookInfo.name,
		    email: facebookInfo.email,
		    facebook: facebookInfo
		};
		// envia para o rhases-auth.
		return $http.put(window.globalVariable.backend.authServerUri + "/api/users/", authUser)
			.then(function(token) {
				_storeAuthToken(token);
			});
	}

	function _storeAuthToken(token) {
		localStorage.put("authToken", token);
		_authToken = token;
	}

	function _saveUserProfile(user) {
		var userProfile = {
			_id: user.email, // email
			name: user.name,
			hasHealthPlan: user.hasHealthPlan,
			healthPlanNumber: user.healthPlanNumber,
			healthPlanOperator: user.healthPlanOperator
		};
		// TODO envia para o scheduler-ws.
	}

	return {
		getCurrentUser: _getCurrentUser,
		getAuthToken: _getAuthToken,
		facebookSignUp: _facebookSignUp,
	}
})
