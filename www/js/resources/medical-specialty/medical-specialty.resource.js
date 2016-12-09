'use strict';
angular.module('starter')
    .factory('MedicalSpecialty', function($resource, ANS_WS_URI, $q) {
        return $resource(ANS_WS_URI + 'medical-specialties/:id', {}, {});

		// // TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		// var MOCK_DATA = [{
		//     "_id": 123123,
		//     "name": "Cardiologista",
		// }]
		//
		// return {
		// 	'get': function() { return { $promise: $q.when(MOCK_DATA[0]) }; },
		// 	'save': function() {},
		// 	'query': function() { return { $promise: $q.when(MOCK_DATA) };; },
		// 	'remove': function() {},
		// 	'delete': function() {}
		// }
    });
