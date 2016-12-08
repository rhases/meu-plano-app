'use strict';
angular.module('starter')
    .factory('Procedure', function($resource, ANS_WS_URI, $q) {
        // return $resource(ANS_WS_URI + 'network/request/:id', {}, {});

		// TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		var MOCK_DATA = [{
		    "_id": 4902,
		    "mainDescription": "IMPLANTE DE PRÓTESE SEMI-RÍGIDA (EXCLUI PRÓTESES INFLÁVEIS)",
		    "coverageTypes": [ {} ],
		    "descriptions": [
				"implante (colocação cirúrgica) de prótese semi-rígida (exclui próteses infláveis)",
				"31206140 - Implante de prótese semi-rígida (exclui próteses infláveis)"
			],
		}]

		return {
			'get': function() { return { $promise: $q.when(MOCK_DATA[0]) }; },
			'save': function() {},
			'query': function() { return { $promise: $q.when(MOCK_DATA) };; },
			'remove': function() {},
			'delete': function() {}
		}
    });
