// User on rhases-auth
angular.module('starter').service('userProfileService', function($rootScope, $q, $http, localStorage, lodash, SCHEDULER_HOST) {

	var USER_PROFILE_KEY = "USER_PROFILE";

	// Load from server (save locally too)
	function _load(id) {
		console.log("Loading user profile from server...")
		return $http.get(SCHEDULER_HOST + "api/user-profiles/" + id)
			.then(function(res) {
				var userProfile = res.data;
				console.log("User profile loaded.");
				if (userProfile) {
					_store(userProfile);
					return userProfile;
				}
				throw new Error('Can not found user profile.');
			});
	}

	// Save or update on server
	function _save(userProfile) {
		console.log("Saving user profile...");

		delete userProfile.__v;

		// envia para o scheduler-ws.
		return $http.put(SCHEDULER_HOST + "api/user-profiles/" + userProfile._id, userProfile)
			.catch(function(error) {
				return $http.post(SCHEDULER_HOST + "api/user-profiles/", userProfile);
			})
			.then(function(res) {
				userProfile = res.data; // The server return a user profile
				console.log('User profile saved on server: ' + JSON.stringify(userProfile));
				_store(userProfile); // work well save locally
				return userProfile;
			});
	}

	// Get the user profile
	function _get(id, params) {
		if (!params) params = {};
		return $q(function(resolve, reject) {
			if (params.tryReloadFirst) {
				_load(id)
					.then(function(user) { resolve(user); })
					.catch(function(err) { return _restore() }) // if not found try load from server
					.then(function(user) { resolve(user); }) // if server return ok return
					.catch(function(err) { reject(err) }); // if server error break the chain
			} else {
				_restore() // try restore user from localStorage
					.then(function(user) { resolve(user); }) // if found return
					.catch(function(err) { return _load(id) }) // if not found try load from server
					.then(function(user) { resolve(user); }) // if server return ok return
					.catch(function(err) { reject(err) }); // if server error break the chain
			}
		})
	}

	function _store(userProfile) {
		localStorage.set(USER_PROFILE_KEY, userProfile);
		console.log('User profile stored locally.');
	}

	function _restore() {
		return $q(function(resolve, reject) {
			if (localStorage.exist(USER_PROFILE_KEY)) {
				resolve(localStorage.get(USER_PROFILE_KEY));
			} else {
				reject('Can not find "' + USER_PROFILE_KEY + '" on localStorage.');
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
