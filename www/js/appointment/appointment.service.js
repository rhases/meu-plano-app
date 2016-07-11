angular.module("starter")
    .factory("appointmentService", function($http, $cacheFactory, $q, authService, lodash, SCHEDULER_HOST, localStorage) {
        var APPOINTMENT_KEY = "APPOINTMENTS";

		// Load from server
		function _loadOne(id) {
			console.log("Loading appointment with id " + id + "...")
			return $http.get(SCHEDULER_HOST + "api/appointments/" + id)
				.then(function(res) {
					var appointment = res.data;
					console.log("Appointment with id " + id + " loaded.");
					if (appointment) {
						return appointment;
					}
					throw new Error('Can not found appointments.');
				});
		}

		// Load from server (save locally info too)
		function _load() {
			console.log("Loading appointments...")
			return $http.get(SCHEDULER_HOST + "api/appointments")
				.then(function(res) {
					var appointments = res.data;
					console.log("Appointments loaded.");
					if (appointments) {
						_store(appointments);
						return appointments;
					}
					throw new Error('Can not found appointments.');
				});
		}

        function _update(appointment) {
			console.log(appointment);
            return $http.put(SCHEDULER_HOST + "api/appointments/" + appointment._id, appointment)
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
		function _store(appointments) {
			localStorage.set(APPOINTMENT_KEY, appointments);
			console.log('Appointments saved locally.');
		}

		function _restore() {
			return $q(function(resolve, reject) {
				if (localStorage.exist(APPOINTMENT_KEY)) {
					resolve(localStorage.get(APPOINTMENT_KEY));
				} else {
					reject('Can not find "' + APPOINTMENT_KEY + '" on localStorage.');
				}
			});
		}

        return {
            get: _get,
			update: _update,
			loadOne: _loadOne
        };
    });
