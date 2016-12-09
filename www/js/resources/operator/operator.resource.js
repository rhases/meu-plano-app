'use strict';
angular.module('starter')
    .factory('Operator', function($resource, ANS_WS_URI, $q) {
        // return $resource(ANS_WS_URI + 'network/request/:id', {}, {});

		// TODO: Usar só a linha de cima. Usado só para testar por enquanto.
		var MOCK_DATA = [{
		    "_id" : 5711,
		    "name" : "Bradesco",
		    "ansQualification" : 0.882,
		    "image" : "https://s3-us-west-2.amazonaws.com/rhases-images/operadora/bradesco.cd410ef5.png",
		    "legalName" : "BRADESCO SAÚDE S/A",
		    "numberOfClients" : 3816059,
		    "numberOfComplaints" : 686
		}]

		return {
			'get': function() { return { $promise: $q.when(MOCK_DATA[0]) }; },
			// 'save': function() {},
			'query': function() { return { $promise: $q.when(MOCK_DATA) };; },
			// 'remove': function() {},
			// 'delete': function() {}
		}
    });
