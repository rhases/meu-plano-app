angular.module('starter').service('userService', function($rootScope, $q, $http, userProfileService) {

	var _user;
	var _authToken;

	function _getCurrentUser() {
		return _user;
	}

	function _getAuthToken() {
		return _authToken;
	}

	function _facebookSignUp(facebookInfo) {
		if(_user) {
			console.log('User already logged in: ' + JSON.stringify(_user));
			return _user;
		}

		// Salva o authUser lá no rhases-auth.
		return _saveAuthUser(facebookInfo)
		// carrega o modelo user e seu status no servidor.
			.then(_loadUserFromFacebookInfo(facebookInfo));
	}

	function _saveAuthUser(facebookInfo) {
		var authUser = {
		    name: facebookInfo.name,
		    email: facebookInfo.email,
		    facebook: facebookInfo
		};

		console.log('Saving user into rhases-auth... ');
		// envia para o rhases-auth.
		return $http.put(window.globalVariable.backend.authServerUri + "/api/users/", authUser)
			.then(function(token) {
				_storeAuthToken(token);
			});
	}

	function _storeAuthToken(token) {
		localStorage.set("authToken", token);
		_authToken = token;
		console.log('User stored. Auth Token: ' + JSON.stringify(_authToken));
	}

	function _storeUser(user) {
		localStorage.set("user", JSON.stringify(user));
		_user = user;
		console.log('User saved: ' + JSON.stringify(_user));
	}

	function _loadUserFromFacebookInfo(facebookInfo) {
		return userProfileService.get(facebookInfo.email)
			.then(function(userProfile) {
				return _userProfileToUser(userProfile);
			})
			.catch(function(error) {
				return _fbInfoToUser(facebookInfo);
			})
			.then(function(user){
				_storeUser(user);
				return _user;
			});
	}

	function _userProfileToUser(userProfile) {
		user = {
			name: userProfile.name,
			email: userProfile.email,
			picture : "https://graph.facebook.com/" + userProfile.facebook.id + "/picture?type=large",
			status: "registered" // TODO userProfile.status
		};
		console.log('User Profile -> User: ' + JSON.stringify(user));
		return user;
	}

	function _fbInfoToUser(facebookInfo) {
		user = {
			name: facebookInfo.name,
			email: facebookInfo.email,
			picture : "https://graph.facebook.com/" + facebookInfo.id + "/picture?type=large",
			status: "invited" // TODO status?
		};
		console.log('Facebook Info -> User: ' + JSON.stringify(user));
		return user;
	}

	return {
		getCurrentUser: _getCurrentUser,
		getAuthToken: _getAuthToken,
		facebookSignUp: _facebookSignUp,
	}
})
