angular.module('starter').service('authService', function($rootScope, $q, $http, $ionicHistory, localStorage, lodash, $state, UserProfile) {

	var USER = "APP_USER";

	// Token de autenticacao retornado pelo rhases-auth
	var _user;

	// Save auth toke
	function _storeUserToken(token) {
		_user = token;
		localStorage.set(USER, _user);
		console.log('Auth Token stored: ' + JSON.stringify(_user));
		return _user;
	}

	// Get/Recovery auth token
	function _getAuthToken() {
		if(!_user) {
			_user = localStorage.get(USER);
		}
		return lodash.clone(_user);
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
	}

	function _saveAppUser(appUser) {
		var def = $q.defer();

		if (appUser && !appUser._id)
			appUser._id = appUser.email;

		UserProfile.save(appUser).$promise
			.then(function(saveUser) {
				if (!saveUser)
					def.reject('UserNotFound');

				_storeUserToken(JSON.stringify(saveUser));
				def.resolve(saveUser);
			})
			.catch(function(err) {
				UserProfile.update({'id': appUser._id}, appUser).$promise
					.then(function(updateUser) {
						_storeUserToken(JSON.stringify(updateUser));

						def.resolve(updateUser);
					})
					.catch(function(err) {
						def.reject(err);
					});
			});

		return def.promise;
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
