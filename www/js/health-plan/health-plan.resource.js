'use strict';
angular.module('starter')
    .factory('HealthPlan', function($resource, ANS_WS_URI) {
        return $resource(ANS_WS_URI + 'health-plans/:id', {});
    });
