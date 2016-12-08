'use strict';
angular.module('starter')
    .factory('MedicalSpecialty', function($resource, ANS_WS_URI) {
        // return $resource(ANS_WS_URI + 'medical-specialty/:id', {}, {});

		// TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		var MOCK_DATA = [{
		    "_id": 123123,
		    "name": "cardiologista",
		}]

		return {
			'get': function() { return MOCK_DATA[0]; },
			'save': function() {},
			'query': function() { return MOCK_DATA; },
			'remove': function() {},
			'delete': function() {}
		}
    });
