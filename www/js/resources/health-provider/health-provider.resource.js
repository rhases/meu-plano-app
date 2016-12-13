'use strict';
angular.module('starter')
    .factory('HealthProvider', function($resource, ANS_WS_URI, $q) {

        return $resource(ANS_WS_URI + 'health-providers/:id', {},
	        {
	            'queryAllHospitalsByHealthPlan': {
					url: ANS_WS_URI + 'health-providers/:planOperatorId-:planoCodId/:state/:city/:type',
	                method: 'GET',
	                cache: true,
	                isArray: true,
	                params: {
						type: 'hospital'
					}
	            },
				'queryByHealthPlanAndProcedure': {
					url: ANS_WS_URI + 'health-providers/:planOperatorId-:planoCodId/:state/:city/procedure/:procedure',
	                method: 'GET',
	                cache: false,
	                isArray: true
	            },
				'queryByHealthPlanAndMedicalSpecialty': {
					url: ANS_WS_URI + 'health-providers/:planOperatorId-:planoCodId/:state/:city/medical-specialty/:medicalSpecialty',
	                method: 'GET',
	                cache: false,
	                isArray: true
	            }
	        });


		// // TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		// var MOCK_DATA = [{
		//     "_id": 3019608,
		//     "name": "HOSPITAL SANTA HELENA",
		//     "image": "",
		// 	"type": "hospital",
		//     "address":  {
		// 	    "label": "sede",
		// 	    "name": "",
		// 	    "state": "df",
		// 	    "city": "brasilia",
		// 	    "area": "Asa Norte",
		// 	    "address": "SHLN 516 CONJUNTO D",
		// 	    "zip":  "70770560",
		// 	    "phones": ["3215-0150"],
		// 		"geo": {
		// 			"latitude": -15.8414079,
		// 			"longitude":  -47.8877947
		// 		}
		// 	},
		//     "operators": [ 5711 ],
		//     "healthPlans": [{
		// 		"plan": 471802140,
		//         "services": [ "pronto-socorro" ],
		//         "medicalSpecialties": [],
		//         "procedures": [],
		//     }]
		// }]
		//
		// return {
		// 	'get': function() { return { $promise: $q.when(MOCK_DATA[0]) }; },
		// 	// 'save': function() {},
		// 	// 'query': function() { return { $promise: $q.when(MOCK_DATA) }; },
		// 	// 'remove': function() {},
		// 	// 'delete': function() {},
		// 	'queryAllHospitalsByHealthPlan': function() { return { $promise: $q.when(MOCK_DATA) }; },
		// 	'queryByHealthPlanAndProcedure': function() { return { $promise: $q.when(MOCK_DATA) }; },
		// 	'queryByHealthPlanAndMedicalSpecialty': function() { return { $promise: $q.when() }; },
		// }

    });
