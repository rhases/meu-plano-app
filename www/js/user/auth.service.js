angular.module('starter').service('authService', function($rootScope, $q, $http, $ionicHistory, localStorage, lodash, $state) {

	var AUTH_TOKEN_KEY = "AUTH_TOKEN";

	// Token de autenticacao retornado pelo rhases-auth
	var _authToken;

	// Save auth toke
	function _storeAuthToken(token) {
		_authToken = token;
		localStorage.set(AUTH_TOKEN_KEY, _authToken);
		console.log('Auth Token stored: ' + JSON.stringify(_authToken));
		return _authToken;
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

	function _getAppUser() {
		// user
		return $q.when()
			.then(function() {
				var appUser = JSON.parse(_getAuthToken());

				if (appUser && appUser.birthdate)
					appUser.birthdate = new Date(appUser.birthdate);

				return appUser;
			});
		// return userService.get(params)
		// 	.then(function(user) {
		// 		return userProfileService.get(user.email, params)
		// 			.then(function(userProfile) {
		// 				user.profile = userProfile; // user profile
		// 				return inviteService.status(user.email)
		// 					.then(function(status) {
		// 						user.isInvited = (status === 'invited' || status === 'registered');
		// 						user.status = status;
		// 						return user;
		// 					})
		// 					.catch(function(err) {
		// 						console.log("Can not load invite status. " + err);
		// 					});
		// 			})
		// 			.catch(function(err) {
		// 				user.profile = { _id: user.email };
		// 				return user;
		// 			})
		// 	})
	}

	function _saveAppUser(appUser) {
		if (appUser && !appUser._id)
			appUser._id = appUser.email;

		return $q.when(_storeAuthToken(JSON.stringify(appUser)));
		// return userService.save(user)
		// 	.then(function(token) {
		// 		_storeAuthToken(token);
		// 		if (userProfile) {
		// 			return userProfileService.save(userProfile);
		// 		} else {
		// 			return undefined;
		// 		}
		// 	})
		// 	.then(function() {
		// 		return _getAppUser();
		// 	})
		// 	.then(function(appUser) { // TODO melhor fazer isso com evento.
		// 		$rootScope.appUser = appUser;
		// 		return appUser;
		// 	})

	}

	function _isLoggedIn() {
		var res = JSON.parse(_getAuthToken());

		if (res && res.healthPlan)
			return true;
		else
			return false;
	}

	function _logout() {
		localStorage.removeAll();
		$ionicHistory.nextViewOptions({
			historyRoot: true,
			expire: 300,
			disableBack: true
		});

		$ionicHistory.clearHistory();

		$state.go('app.login');
	}

	return {
		logout: _logout,
		isLoggedIn: _isLoggedIn,
		getAppUser: _getAppUser,
		saveAppUser: _saveAppUser,
	}
})
