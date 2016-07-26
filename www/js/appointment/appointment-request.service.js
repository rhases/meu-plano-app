angular.module("starter")
    .factory("appointmentRequestService", function($http, $cacheFactory, $q, authService, lodash, SCHEDULER_SERVER_URI, localStorage) {
        var APPOINTMENT_REQUEST_KEY = "APPOINTMENT_REQUESTS";

		// Load from server (save locally info too)
		function _load() {
			console.log("Loading appointments requests...")
			return $http.get(SCHEDULER_SERVER_URI + "api/appointment-requests")
				.then(function(res) {
					var appointmentRequests = res.data;
					console.log("Appointment requests loaded.");
					// console.log(user)
					if (appointmentRequests) {
						_store(appointmentRequests);
						return appointmentRequests;
					}
					throw new Error('Can not found appointment requests.');
				});
		}

        function _update(appointmentRequest) {
            return $http.put(SCHEDULER_SERVER_URI + "api/appointment-requests/" + appointmentRequest._id, appointmentRequest)
				.then(function(res) {
					if(res.status >= 300)
						throw new Error('Something bad happedned. Status: ' + res.status);
					return res.data;
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
		function _store(appointmentRequests) {
			localStorage.set(APPOINTMENT_REQUEST_KEY, appointmentRequests);
			console.log('Appointment requests saved locally.');
		}

		function _restore() {
			return $q(function(resolve, reject) {
				if (localStorage.exist(APPOINTMENT_REQUEST_KEY)) {
					resolve(localStorage.get(APPOINTMENT_REQUEST_KEY));
				} else {
					reject('Can not find "' + APPOINTMENT_REQUEST_KEY + '" on localStorage.');
				}
			});
		}

        return {
            get: _get,
			update: _update
        };
    });
