appControllers.controller('infosCtrl', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, HealthPlan, $ionicPopover, popoverText, ageUtil) {

        $scope.userAge = ageUtil.getAgeFromDate($rootScope.appUser.birthdate);

        // $scope.healthPlan = healthPlanService.getById('463945116');
        HealthPlan.get({ operatorId: '5711', codId: '421545991' }).$promise
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
            var ageRange = ageUtil.getAgeRange($scope.userAge);
            return maxPrice[ageRange];
        }

        $ionicPopover.fromTemplateUrl('templates/dashboard/infos/info-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openCoverageTypePopover = function($event, coverageType) {
            $scope.popoverText = popoverText.coverageTypeText(coverageType);
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
