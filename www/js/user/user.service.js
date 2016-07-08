// User on rhases-auth
angular.module('starter').service('userService', function($rootScope, $q, $http, localStorage, lodash) {

	var USER_KEY = "USER";

	var _user;

	// Load from server (save locally info too)
	function _load() {
		console.log("Loading complete user from server...")
		return $http.get(window.globalVariable.backend.authServerUri + "api/users/me")
			.then(function(res) {
				var user = res.data;

				console.log("User loaded.");
				console.log(user)
				if (user) {
					_store(user);
					return user;
				}

				throw new Error('Can not found user.');
			});
	}

	// Save or update on server (OBS.: return a token) (save locally info too)
	function _save(user) {
		console.log("Saving user... " + JSON.stringify(user));

		// envia para o scheduler-ws.
		return $http.put(window.globalVariable.backend.authServerUri + "api/users/" + user._id, user)
			.catch(function(error) {
				return $http.post(window.globalVariable.backend.authServerUri + "api/users/", user);
			})
			.then(function(res) {
				console.log('User saved on RHASES AUTH server.');

				//_store(user); // work well save locally
				return res.data.token;
			});
	}

	// Get the user saved locally
	function _get() {
		return $q(function(resolve, reject) {
			if (_user) {
				resolve(lodash.clone(_user));
			} else {
				if (localStorage.exist(USER_KEY)) {
					_user = localStorage.get(USER_KEY);
					resolve(lodash.clone(_user));
				} else {
					_load()
						.then(function(user) {
							_user = user;
							resolve(lodash.clone(_user));
						})
						.catch(function(err) { reject(err) });
				}
			}
		})
	}

	// Store the user on local store [SYNCH]
	function _store(user) {
		if (!user._id)
			throw new Error('Can not store a user without id.');
		_user = lodash.clone(user);
		localStorage.set(USER_KEY, _user);
		console.log('User stored locally.');
	}


	return {
		load: _load,
		save: _save,
		get: _get,
		store: _store
	}
})
