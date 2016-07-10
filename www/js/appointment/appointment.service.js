angular.module("starter")
    .factory("appointmentService", function($http, $cacheFactory, $q, authService, lodash, SCHEDULER_HOST) {
        var _appointmentList;
        var _defaultKey = "default";
        var _cache;

        function _getAppointmentList() {
            var deferred = $q.defer();

            $http.get(SCHEDULER_HOST + "/api/appointments")
                .success(function(appointments) {
                    _appointmentList = appointments;

                    // _updateChace(appointments);

                    deferred.resolve(_appointmentList);
                })
                .error(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function _refresh() {
            $http.get(SCHEDULER_HOST + "/api/appointments")
                .success(function(appointment) {
                    _appointmentList = appointment;

                    // _updateChace(appointment);
                })
                .error(function(ignore) {
                    console.log(error);
                });
        }


        function _update(appointment) {
			console.log(appointment);
            return $http.put(SCHEDULER_HOST + "/api/appointments/" + appointment._id, appointment)
				.then(function(res) {
					if(res.status >= 300)
						throw new Error('Something bad happedned. Status: ' + res.status);
					return res.data;
				});
        }

        function _updateChace(cacheData) {
            if (!lodash.isNil(_cache))
                _initCache();

            if (!lodash.isEmpty(cacheData) && !lodash.isNil(cacheData)) {
                _cache.put("appointment", cacheData);
            }
        }

        function _initCache() {
            if (lodash.isNil(_cache)) {
                var key = _defaultKey;

                _cache = $cacheFactory(key, number=10);
            }
        }

        return {
            getAppointmentList: _getAppointmentList,
            refresh: _refresh,
			update: _update
        };
    });
