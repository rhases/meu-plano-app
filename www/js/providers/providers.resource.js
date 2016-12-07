'use strict';
angular.module('starter')
    .factory('Providers', function($resource, ANS_WS_URI) {

        return $resource(ANS_WS_URI + 'providers/:plan/:state/:city/:type',
            {},
        {
            'getHospitals': {
                method: 'GET',
                cache: true,
                isArray: true,
                params: {
					type: 'hospital'
				}
            },
            'getProviders': {
                method: 'GET',
                cache: true,
                isArray: true,    
                params: {
					type: 'hospital'
				}
            }
        });

    });
