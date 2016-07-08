// User on rhases-auth
angular.module('starter').service('userService', function($rootScope, $q, $http, localStorage, lodash) {

	var USER_KEY = "USER";

	// Load from server (save locally info too)
	function _load() {
		console.log("Loading complete user from server...")
		return $http.get(window.globalVariable.backend.authServerUri + "api/users/me")
			.then(function(res) {
				var user = res.data;
				console.log("User loaded.");
				// console.log(user)
				if (user) {
					_store(user);
					return user;
				}
				throw new Error('Can not found user.');
			});
	}

	// Save or update on server (OBS.: return a token) (save locally info too)
	function _save(user) {
		console.log("Saving user...");

		delete user.__v;

		// envia para o scheduler-ws.
		return $http.put(window.globalVariable.backend.authServerUri + "api/users/" + user._id, user)
			.catch(function(error) {
				return $http.post(window.globalVariable.backend.authServerUri + "api/users/", user);
			})
			.then(function(res) {
				console.log('User saved on RHASES AUTH server.');

				_load() // REQUIRED!!! Update the resources
					.then(function() { console.log("Loaded after save.") })
					.catch(function(err) { console.log("Can not load. " + err) })

				//_store(user); // work well save locally
				return res.data.token;
			});
	}

	// Get the user
	function _get(params) {
		if (!params) params = {};
		return $q(function(resolve, reject) {
			if (params.tryReloadFirst) {
				_load()
					.then(function(user) { resolve(user); })
					.catch(function(err) { return _restore() }) // if not found try load from server
					.then(function(user) { resolve(user); }) // if server return ok return
					.catch(function(err) { reject(err) }); // if server error break the chain
			} else {
				_restore() // try restore user from localStorage
					.then(function(user) { resolve(user); }) // if found return
					.catch(function(err) { return _load() }) // if not found try load from server
					.then(function(user) { resolve(user); }) // if server return ok return
					.catch(function(err) { reject(err) }); // if server error break the chain
			}
		})
	}

	// Store the user on local store [SYNCH]
	function _store(user) {
		if (!user._id)
			throw new Error('Can not store a user without id.');
		localStorage.set(USER_KEY, user);
		console.log('User stored locally.');
	}

	function _restore() {
		return $q(function(resolve, reject) {
			if (localStorage.exist(USER_KEY)) {
				resolve(localStorage.get(USER_KEY));
			} else {
				reject('Can not find "' + USER_KEY + '" on localStorage.');
			}
		});
	}


	return {
		load: _load,
		save: _save,
		get: _get,
		store: _store
	}
})
