angular.module("starter")
    .factory("appointmentRequestService", function($http, $cacheFactory, $q, authService, lodash, SCHEDULER_HOST) {
        var _appointmentRequestList;
        var _defaultKey = "default";
        var _cache;

        function _getAppointmentRequestList() {
            var deferred = $q.defer();

            $http.get(SCHEDULER_HOST + "/api/appointment-requests")
                .success(function(appointments) {
                    _appointmentRequestList = appointments;

                    // _updateChace(appointments);

                    deferred.resolve(_appointmentRequestList);
                })
                .error(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function _refresh() {
            $http.get(SCHEDULER_HOST + "/api/appointment-requests")
                .success(function(appointmentRequest) {
                    _appointmentRequestList = appointmentRequest;

                    // _updateChace(appointmentRequest);
                })
                .error(function(ignore) {
                    console.log(ignore);
                });
        }

        function _updateChace(cacheData) {
            // if (!lodash.isNil(_cache))
            //     _initCache();

            if (!lodash.isEmpty(cacheData) && !lodash.isNil(cacheData)) {
                _cache.put("appointment-requests", cacheData);
            }
        }

        function _initCache() {
            if (lodash.isNil(_cache)) {
                var key = _defaultKey;

                _cache = $cacheFactory(key, 10);
            }
        }

        return {
            getAppointmentRequestList: _getAppointmentRequestList,
            refresh: _refresh
        };
    });
