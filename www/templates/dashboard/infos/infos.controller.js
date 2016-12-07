appControllers.controller('infosCtrl', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash) {

        $scope.userProfile = {
            "age": 35
        }

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

        $scope.maxPrice = function() {
            var maxPriceUnformatted = retrieveMaxPrice();
            var maxPriceTwoDecimal = maxPriceUnformatted.toFixed(2);
            return maxPriceTwoDecimal.toLocaleString();
        }

        function retrieveMaxPrice() {
            var maxPrice = $scope.healthPlan.maxPrice;
            var userAge = $scope.userProfile.age;
            var ageRange = getAgeRange(userAge);
            return maxPrice[ageRange];
        }

        var FULL_LIFE_RANGE_KEYS =
        	['a18orLess', 'a19to23', 'a24to28', 'a29to33', 'a34to38', 'a39to43', 'a44to48', 'a49to53', 'a54to58', 'a59orMore'];

        function getAgeRange(age) {
    		if (age <= 18) {
    			return FULL_LIFE_RANGE_KEYS[0];
    		} else if ((age > 18) && (age <= 23)) {
    			return FULL_LIFE_RANGE_KEYS[1];
    		} else if ((age > 23) && (age <= 28)) {
    			return FULL_LIFE_RANGE_KEYS[2];
    		} else if ((age > 28) && (age <= 33)) {
    			return FULL_LIFE_RANGE_KEYS[3];
    		} else if ((age > 33) && (age <= 38)) {
    			return FULL_LIFE_RANGE_KEYS[4];
    		} else if ((age > 38) && (age <= 43)) {
    			return FULL_LIFE_RANGE_KEYS[5];
    		} else if ((age > 43) && (age <= 48)) {
    			return FULL_LIFE_RANGE_KEYS[6];
    		} else if ((age > 48) && (age <= 53)) {
    			return FULL_LIFE_RANGE_KEYS[7];
    		} else if ((age > 53) && (age <= 58)) {
    			return FULL_LIFE_RANGE_KEYS[8];
    		} else if (age > 58) {
    			return FULL_LIFE_RANGE_KEYS[9];
    		}
    	}
});
