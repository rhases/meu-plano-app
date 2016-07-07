angular.module('starter').service('authService', function($rootScope, $q, $http, localStorage, userService, userProfileService, inviteService, lodash) {

	var AUTH_TOKEN_KEY = "AUTH_TOKEN";

	// Token de autenticacao retornado pelo rhases-auth
	var _authToken;

	// Save auth toke
	function _storeAuthToken(token) {
		_authToken = token;
		localStorage.set(AUTH_TOKEN_KEY, _authToken);
		console.log('Auth Token stored: ' + JSON.stringify(_authToken));
	}

	// Get/Recovery auth token
	function _getAuthToken() {
		if(!_authToken) {
			_authToken = localStorage.get(AUTH_TOKEN_KEY);
		}
		return lodash.clone(_authToken);
	}

	// *********************************************************
	// * APP USER (Virtual model)
	// * Created to make control of user easy
	// *********************************************************

	// function _storeAppUser(appUser) {
	// 	userService.store(appUser);
	// 	userProfileService.store(appUser);
	// }

	function _getAppUser() {
		return userService.get()
			.then(function(user) {
				return userProfileService.get(user.email)
					.then(function(userProfile) {
						user.profile = userProfile;
						return user;
					})
					.catch(function(err) {
						return user;
					})
			})
	}

	function _saveAppUser(appUser) {
		var userProfile = lodash.clone(appUser.profile);
		var user = lodash.clone(appUser);
		delete user.profile;

		return userService.save(user)
			.then(function(token) {
				_storeAuthToken(token);
				if (userProfile) {
					return userProfileService.save(userProfile);
				} else {
					return undefined;
				}
			})
			.then(function() {
				return _getAppUser();
			})
	}

	// *********************************************************

	function _facebookSignUp(facebookInfo) {
		var authUser = {
		    name: facebookInfo.name,
		    email: facebookInfo.email,
		    facebook: facebookInfo
		};

		// Salva o authUser lá no rhases-auth.
		return userService.save(authUser)
			.then(function(token) {
				_storeAuthToken(token);
				return userService.load(); // Garante que foi realmente criado salvo e está realmente logado
			})
			.then(function(user) {
				$rootScope.emit('login:successful', user._id);
				return inviteService.status(facebookInfo.email)
			})
			.then(function(status) {
				return _getAppUser()
					.then(function(appUser) {
						appUser.status = status
						return appUser;
					})
			})
	}

	// function _appUserProfileToUser(userProfile, status) {
	// 	user = {
	// 		name: userProfile.name,
	// 		email: userProfile.email,
	// 		picture : "https://graph.facebook.com/" + userProfile.facebook.id + "/picture?type=large",
	// 		hasHealthPlan: userProfile.hasHealthPlan,
	// 		healthPlanNumber: userProfile.healthPlanNumber,
	// 		healthPlanOperator: userProfile.healthPlanOperator,
	// 		status: status
	// 	};
	// 	console.log('User Profile -> User: ' + JSON.stringify(user));
	// 	return user;
	// }
	//
	// function _fbInfoToUser(facebookInfo, status) {
	// 	user = {
	// 		name: facebookInfo.name,
	// 		email: facebookInfo.email,
	// 		picture : "https://graph.facebook.com/" + facebookInfo.id + "/picture?type=large",
	// 		status: status
	// 	};
	// 	console.log('Facebook Info -> User: ' + JSON.stringify(user));
	// 	return user;
	// }

	function _isLoggedIn() {
		console.log(_getAuthToken());
		if(!_getAuthToken()) {
			return false;
		}

		return true;
	}

	function _logout() {
		localStorage.removeAll();
	}

	return {
		facebookSignUp: _facebookSignUp,
		logout: _logout,
		isLoggedIn: _isLoggedIn,
		getAppUser: _getAppUser,
		saveAppUser: _saveAppUser
	}
})
