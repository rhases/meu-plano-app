appControllers.controller('infosCtrl', function ($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, HealthPlan, $ionicPopover, popoverText, ageUtil, authService, toasts, $ionicLoading) {

        var appUser;
        $scope.isLoading = true;
        $ionicLoading.show();

        authService.getAppUser()
            .then(function (_appUser) {
                appUser = _appUser;
                $scope.userAge = ageUtil.getAgeFromDate(appUser.birthdate);
                return HealthPlan.get({codId: appUser.healthPlan.cod, operatorId: appUser.healthPlan.operator }).$promise;
            })
            .then(function(healthPlan) {
                $scope.healthPlan = healthPlan;
            })
            .catch(function() {
                toasts.showSimple('Algum erro aconteceu! :(');
            })
            .then(function() {
                $scope.isLoading = false;
                $ionicLoading.hide();
            });

        // $scope.userAge = ageUtil.getAgeFromDate('1988-06-20T03:00:00.000Z');

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
                return 'Sim, seu plano possui coparticipação';
            else
                return 'Não é preciso pagar nada quando utilizar o plano';
        }

        $scope.showMaxPrice = function() {
            return $scope.healthPlan && $scope.healthPlan.maxPrice;
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

        $scope.openModeratorFactorPopover = function($event) {
            $scope.popoverText = popoverText.moderatorFactorText();
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
