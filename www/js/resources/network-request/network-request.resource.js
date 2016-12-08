'use strict';
angular.module('starter')
    .factory('NetworkRequest', function($resource, ANS_WS_URI, $q) {
        // return $resource(ANS_WS_URI + 'network/request/:id', {}, {});


		// TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		var MOCK_DATA = [{
			_id: "",
			user: "contato@rhases.com.br",
			healthPlan: 463945116,

			medicalSpecialty: undefined,
			procedure: 4902,

			status: "new" // new, answered
		}]

		return {
			'get': function() { return { $promise: $q.when(MOCK_DATA[0]) }; },
			'save': function() {},
			'query': function() { return { $promise: $q.when(MOCK_DATA) };; },
			'remove': function() {},
			'delete': function() {}
		}
    });
