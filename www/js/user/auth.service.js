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
		// user
		return userService.get()
			.then(function(user) {
				return userProfileService.get(user.email)
					.then(function(userProfile) {
						// user profile
						user.profile = userProfile;
						return user;
					})
					.catch(function(err) {
						user.profile = { _id: user.email }
						return user;
					})
			})
	}

	function _saveAppUser(appUser) {
		// user profile
		var userProfile = lodash.clone(appUser.profile);
		userProfile._id = appUser.email;

		// user
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
			// TODO melhor fazer isso com evento.
			.then(function(appUser) {
				$rootScope.appUser = appUser;
				return appUser;
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
				$rootScope.$emit('login:successful', user._id);
				return inviteService.status(facebookInfo.email)
			})
			.then(function(status) {
				return _getAppUser()
					.then(function(appUser) {
						appUser.status = status
						if(status == "registered") {
							// TODO melhor fazer isso com evento.
							$rootScope.appUser = appUser;
						}
						return appUser;
					})
			})
	}

	function _isLoggedIn() {
		console.log(_getAuthToken());
		if(!_getAuthToken()) {
			return false;
		}

		return true;
	}

	function _logout() {
		localStorage.removeAll();

		// TODO melhor fazer isso com evento.
		$rootScope.appUser = undefined;
	}

	return {
		facebookSignUp: _facebookSignUp,
		logout: _logout,
		isLoggedIn: _isLoggedIn,
		getAppUser: _getAppUser,
		saveAppUser: _saveAppUser
	}
})
