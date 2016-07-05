angular.module("starter")
    .factory("appointmentService", function($http, $cacheFactory, $q, userService, lodash, SCHEDULER_HOST) {
        var _appointmentList;
        var _defaultKey = "default";
        var _cache;

        function _getAppointmentList() {
            var deferred = $q.defer();

            _initCache();

            if (lodash.isNil(_cache.get("appointment"))) {
                $http.get(SCHEDULER_HOST + "/api/appointments")
                    .success(function(appointments) {
                        _appointmentList = appointments;

                        _updateChace(appointments);

                        deferred.resolve(_appointmentList);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
            } else {
                deferred.resolve(_cache.get("appointment"));
            }

            return deferred.promise;
        }

        function _refresh() {
            $http.get(SCHEDULER_HOST + "/api/appointments")
                .success(function(appointment) {
                    _appointmentList = appointment;

                    _updateChace(appointment);
                })
                .error(function(ignore) {
                    console.log(error);
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
                var key = lodash.isNil(userService.getCurrentUser()) ? _defaultKey : userService.getCurrentUser().name;

                _cache = $cacheFactory(key, number=10);
            }
        }

        return {
            getAppointmentList: _getAppointmentList,
            refresh: _refresh
        };
    });
