appControllers.controller('infosCtrl', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, HealthPlan, $ionicPopover, popoverText) {

        $scope.userProfile = {
            "age": 35
        }

        // $scope.healthPlan = healthPlanService.getById('463945116');
        HealthPlan.get({ id: '471802140' }).$promise
        .then(function(healthPlan) {
            if (healthPlan)
                $scope.healthPlan = healthPlan;
        });

        console.log($scope.healthPlan);

        $scope.prettyCoverageType = function(coverageType) {
            if(coverageType === 'ambulatorial')
                return 'Consultas/Exames e Emergência';
            if(coverageType === 'hospitalar')
                return 'Cirurgia e Internação';
            if(coverageType === 'obstetricia')
                return 'Parto';
            if(coverageType === 'odontologia')
                return 'Odontologia';
            return '';
        }

        $scope.prettyCoverageAreaType = function() {
            if ($scope.healthPlan && $scope.healthPlan.coverageAreaType === 'nacional')
                return 'Em todo território nacional';
        }

        $scope.prettyAccomodation = function() {
            if ($scope.healthPlan && $scope.healthPlan.accomodation === 'coletiva')
                return 'Enfermaria';
            else
                return 'Quarto privado';
        }

        $scope.prettyModeratorFactor = function() {
            if ($scope.healthPlan && $scope.healthPlan.moderatorFactor)
                return 'Sim, seu plano possui coopartição';
            else
                return 'Não é preciso pagar nada quando utilizar o plano';
        }

        $scope.showMaxPrice = function() {
            if ($scope.healthPlan && $scope.healthPlan.maxPrice)
                return true;
            else
                return false;
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

        $ionicPopover.fromTemplateUrl('templates/dashboard/infos/info-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openCoverageTypePopover = function($event, coverageType) {
            $scope.popoverText = popoverText.coverageTypeText(coverageType);;
            $scope.openPopover($event);
        }

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
});
