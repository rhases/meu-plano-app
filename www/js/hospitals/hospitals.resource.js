'use strict';
angular.module('starter')
    .factory('Hospitals', function($http, ANS_WS_URI) {

        function _getEmergencyHospitals(userProfile) {
            return $http.get(ANS_WS_URI + '/hospitals/' + userProfile.healthPlan + '/' + userProfile.state + '/' + userProfile.city);
        }

        return {
            getEmergencyHospitals: _getEmergencyHospitals
        };

    });
