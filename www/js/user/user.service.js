angular.module('starter').service('userService', function($rootScope, $q, $http, localStorage, userProfileService) {

	// Merge do user do rhases-auth e do user-profile do scheduler-ws.
	var _user;

	// Token de autenticacao retornado pelo rhases-auth
	var _authToken;

	function _getAppUser() {
		if(!_user) {
			_user = localStorage.get("user");
		}
		return _user;
	}

	function _saveAppUser(user) {
		return _saveAuthUser(user)
			.then(function() {
				return userProfileService.save(user);
			})
			.then(function() {
				_storeAppUser(user);
			});
	}

	function _getAuthToken() {
		return _authToken;
	}

	function _facebookSignUp(facebookInfo) {
		if(_user) {
			console.log('User already logged in: ' + JSON.stringify(_user));
			return _user;
		}

		var authUser = {
		    name: facebookInfo.name,
		    email: facebookInfo.email,
		    facebook: facebookInfo
		};

		// Salva o authUser lá no rhases-auth.
		return _saveAuthUser(authUser)
		// carrega o modelo user e seu status no servidor.
			.then(function() {
				return _loadUserFromFacebookInfo(facebookInfo);
			});
	}

	function _saveAuthUser(authUser) {
		console.log('Saving user into rhases-auth... ');
		// envia para o rhases-auth.
		return $http.post(window.globalVariable.backend.authServerUri + "api/users/", authUser)
			.then(function(res) {
				_storeAuthToken(res.data.token);
			});
	}

	function _storeAuthToken(token) {
		localStorage.set("authToken", token);
		_authToken = token;
		console.log('Auth Token stored: ' + JSON.stringify(_authToken));
	}

	function _storeAppUser(user) {
		localStorage.set("user", user);
		_user = user;
		console.log('User stored: ' + JSON.stringify(_user));
	}

	function _loadUserFromFacebookInfo(facebookInfo) {
		return userProfileService.invitationStatus(facebookInfo.email)
			.then(function(response) {
				userStatus = response.data.status;
				if(userStatus == "registered") {

					// Se ja esta registrado, obtem os dados do usuario do servidor
					return userProfileService.get(facebookInfo.email)
						.then(function(userProfile) {
							return _userProfileToUser(userProfile, userStatus);
						});
				} else {
					return _fbInfoToUser(facebookInfo, userStatus);
				}
			})
			// Salva o usuario localmente
			.then(function(user){
				_storeAppUser(user);
				return _user;
			});
	}

	function _userProfileToUser(userProfile, status) {
		user = {
			name: userProfile.name,
			email: userProfile.email,
			picture : "https://graph.facebook.com/" + userProfile.facebook.id + "/picture?type=large",
			hasHealthPlan: userProfile.hasHealthPlan,
			healthPlanNumber: userProfile.healthPlanNumber,
			healthPlanOperator: userProfile.healthPlanOperator,
			status: status
		};
		console.log('User Profile -> User: ' + JSON.stringify(user));
		return user;
	}

	function _fbInfoToUser(facebookInfo, status) {
		user = {
			name: facebookInfo.name,
			email: facebookInfo.email,
			picture : "https://graph.facebook.com/" + facebookInfo.id + "/picture?type=large",
			status: status
		};
		console.log('Facebook Info -> User: ' + JSON.stringify(user));
		return user;
	}

	return {
		getAppUser: _getAppUser,
		getAuthToken: _getAuthToken,
		facebookSignUp: _facebookSignUp,
		saveAppUser: _saveAppUser
	}
})
