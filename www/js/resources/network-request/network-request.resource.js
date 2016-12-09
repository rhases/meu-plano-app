'use strict';
angular.module('starter')
    .factory('NetworkRequest', function($resource, ANS_WS_URI, $q) {
        // return $resource(ANS_WS_URI + 'network/request/:id', {}, {});


		// TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		var MOCK_DATA = [{
			_id: "1",
			user: "contato@rhases.com.br",
			healthPlan: 463945116,

			medicalSpecialty: undefined,
			procedure: 4902,

			comment: "Os prestadores atuais só tem vaga para daqui a dois meses. Como podemos fazer?",

			status: "new" // new, answered
		},
		{
			_id: "2",
			user: "contato@rhases.com.br",
			healthPlan: 463945116,

			medicalSpecialty: undefined,
			procedure: 4902,

			comment: "Preciso de pestadores da minha região.",

			status: "answered" // new, answered
		}]

		return {
			'get': function() { return { $promise: $q.when(MOCK_DATA[0]) }; },
			'save': function(data) { MOCK_DATA.push(data); return { $promise: $q.when() }; },
			'query': function() { return { $promise: $q.when(MOCK_DATA) };; },
			'queryByUser': function() { return { $promise: $q.when(MOCK_DATA) };; },
			'remove': function() {},
			'delete': function() {}
		}
    });
