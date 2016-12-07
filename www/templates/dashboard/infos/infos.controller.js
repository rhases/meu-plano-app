appControllers.controller('infosCtrl', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash) {

        $scope.healthPlan = {
            "_id": 471802140,
            "name": "Bradesco Saúde Top Nacional 2 E CA copart",
            "status": "liberada",

            "operator":  5711,

            "coverageTypes": ["ambulatorial", "hospitalar", "obstetricia"],
            "accomodation": "coletiva",
            "moderatorFactor": true,
            "contractType": "coletivo-adesao",

            "coverageAreaType": "nacional",
            "coverageArea": [],

            "maxPrice": {
                "a18orLess": 143.091,
                "a19to23": 178.022,
                "a24to28": 209.001,
                "a29to33": 255.45,
                "a34to38": 284.739,
                "a39to43": 296.543,
                "a44to48": 350.558,
                "a49to53": 409.578,
                "a54to58": 487.24,
                "a59orMore": 858.494,
            }
        }

        $scope.coverageTypes = function() {
            var coverageTypes =  $scope.healthPlan.coverageTypes;
            return lodash.join(coverageTypes, ', ');
        }

});
