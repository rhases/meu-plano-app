// User on rhases-auth
angular.module('starter').service('userProfileService', function($rootScope, $q, $http, localStorage, lodash) {

	var USER_PROFILE_KEY = "USER_PROFILE";

	var _userProfile;

	// Load from server (save locally too)
	function _load(id) {
		console.log("Loading user profile from server...")
		return $http.get(window.globalVariable.backend.schedulerServerUri + "api/user-profiles/" + id)
			.then(function(res) {
				var userProfile = res.data;
				console.log("User profile loaded.");
				if (userProfile) {
					_store(userProfile);
				} else {
					throw new Error('Can not found user profile.');
				}
				return userProfile;
			});
	}

	// Save or update on server
	function _save(userProfile) {
		console.log("Saving user profile...");

		delete userProfile.__v;

		// envia para o scheduler-ws.
		return $http.put(window.globalVariable.backend.schedulerServerUri + "api/user-profiles/" + userProfile._id, userProfile)
			.catch(function(error) {
				return $http.post(window.globalVariable.backend.schedulerServerUri + "api/user-profiles/", userProfile);
			})
			.then(function(res) {
				userProfile = res.data; // The server return a user profile
				console.log('User profile saved on server: ' + JSON.stringify(userProfile));
				_store(userProfile); // work well save locally
				return userProfile;
			});
	}

	// Get the user saved locally
	function _get(id) {
		return $q(function(resolve, reject) {
			if (_userProfile) {
				resolve(lodash.clone(_userProfile));
			} else {
				if (localStorage.exist(USER_PROFILE_KEY)) {
					_userProfile = localStorage.get(USER_PROFILE_KEY);
					resolve(lodash.clone(_userProfile));
				} else {
					_load(id)
						.then(function(userProfile) {
							resolve(lodash.clone(_userProfile));
						})
						.catch(function(err) { reject(err) });
				}
			}
		})
	}

	function _store(userProfile) {
		_userProfile = lodash.clone(userProfile);
		localStorage.set(USER_PROFILE_KEY, _userProfile);
		console.log('User profile stored locally.');
	}


	return {
		load: _load,
		save: _save,
		get: _get,
		store: _store
	}
})
