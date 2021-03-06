'use strict';
angular.module('starter')
    .factory('HealthPlan', function($resource, ANS_WS_URI, $q) {
        return $resource(ANS_WS_URI + 'health-plans/:operatorId-:codId', {}, {
			'query': {
				url: ANS_WS_URI + 'health-plans',
				method: 'GET',
				cache: true,
				isArray: true
			},
			'queryByStateCityAndOperator': {
				url: ANS_WS_URI + 'health-plans/state/:state/city/:city/operator/:operator',
				method: 'GET',
				cache: true,
				isArray: true
			}
		});

		// // TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		// var MOCK_DATA = [
		// 	{
		// 	    "_id": 463945116,
		// 	    "name": "Bradesco Saúde Nacional Flex Q CE B",
		// 	    "status": "liberada",
		//
		// 	    "operator":  5711,
		//
		// 	    "coverageTypes": ["ambulatorial", "hospitalar", "obstetricia"],
		// 	    "accomodation": "individual",
		// 	    "moderatorFactor": false,
		// 	    "contractType": "coletivo-empresarial",
		//
		// 	    "coverageAreaType": "nacional",
		// 	    "coverageArea": [],
		//
		// 	    "maxPrice": null
		// 	},
		// 	{
		// 	    "_id": 471802140,
		// 	    "name": "Bradesco Saúde Top Nacional 2 E CA copart",
		// 	    "status": "liberada",
		//
		// 	    "operator":  5711,
		//
		// 	    "coverageTypes": ["ambulatorial", "hospitalar", "obstetricia"],
		// 	    "accomodation": "coletiva",
		// 	    "moderatorFactor": true,
		// 	    "contractType": "coletivo-adesao",
		//
		// 	    "coverageAreaType": "nacional",
		// 	    "coverageArea": [],
		//
		// 	    "maxPrice": {
		// 	        "a18orLess": 143.091,
		// 	        "a19to23": 178.022,
		// 	        "a24to28": 209.001,
		// 	        "a29to33": 255.45,
		// 	        "a34to38": 284.739,
		// 	        "a39to43": 296.543,
		// 	        "a44to48": 350.558,
		// 	        "a49to53": 409.578,
		// 	        "a54to58": 487.24,
		// 	        "a59orMore": 858.494,
		// 	    }
		// 	}]
		//
		// return {
		// 	'get': function() { return { $promise: $q.when(MOCK_DATA[0]) }; },
		// 	// 'save': function() {},
		// 	'query': function() { return { $promise: $q.when(MOCK_DATA) }; },
		// 	'queryByStateCityAndOperator': function() { return { $promise: $q.when(MOCK_DATA) }; },
		// 	// 'remove': function() {},
		// 	// 'delete': function() {}
		// }
    });
