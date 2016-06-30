// Controller of Register Page.
appControllers.controller('registerCtrl', function ($mdBottomSheet, $mdToast, $scope, $stateParams, $filter, $mdDialog, $ionicHistory) {

    // initialForm is the first activity in the controller.
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {

    }; //End initialForm.

    // getContractData is for get contract detail data.
    $scope.getContractData = function (actionDelete, contractDetail) {
        // tempContract is  temporary contract data detail.
        var tempContract = {
            id: null,
            firstName: '',
            lastName: '',
            telephone: '',
            email: '',
            createDate: $filter('date')(new Date(), 'MMM dd yyyy'),
            age: null,
            isEnable: false
        }
        // If actionDelete is true Contract Detail Page will show contract detail that receive form contract list page.
        // else it will show tempContract for user to add new data.
        return (actionDelete ? angular.copy(contractDetail) : tempContract);
    };//End get contract detail data.

    // saveContract is for save contract.
    // Parameter :
    // contract(object) = contract object that presenting on the view.
    // $event(object) = position of control that user tap.
    $scope.saveContract = function (contract, $event) {
        //$mdBottomSheet.hide() use for hide bottom sheet.
        $mdBottomSheet.hide();
        //mdDialog.show use for show alert box for Confirm to save data.
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "Confirm to save data?",
                    content: "Data will save to SQLite.",
                    ok: "Confirm",
                    cancel: "Close"
                }
            }
        }).then(function () {

            // For confirm button to save data.
            try {
                // To update data by calling ContractDB.update(contract) service.
                if ($scope.actionDelete) {
                    if ($scope.contract.id == null) {
                        $scope.contract.id = $scope.contractList[$scope.contractList.length - 1].id;
                    }
                    //ContractDB.update(contract);
                } // End update data.

                // To add new data by calling ContractDB.add(contract) service.
                else {
                    //ContractDB.add(contract);
                    //$scope.contractList = ContractDB.all();
                    $scope.actionDelete = true;
                }// End  add new  data.

                // Showing toast for save data is success.
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 400,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: "Data Saved !"
                        }
                    }
                });//End showing toast.
            }
            catch (e) {
                // Showing toast for unable to save data.
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: window.globalVariable.message.errorMessage
                        }
                    }
                });//End showing toast.
            }
        }, function () {
            // For cancel button to save data.
        });// End alert box.
    };// End save contract.

    // deleteContract is for remove contract.
    // Parameter :
    // contract(object) = contract object that presenting on the view.
    // $event(object) = position of control that user tap.
    $scope.deleteContract = function (contract, $event) {
        //$mdBottomSheet.hide() use for hide bottom sheet.
        $mdBottomSheet.hide();
        //mdDialog.show use for show alert box for Confirm to delete data.
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "Confirm to remove data?",
                    content: "Data will remove form SQLite.",
                    ok: "Confirm",
                    cancel: "Close"
                }
            }
        }).then(function () {
            // For confirm button to remove data.
            try {
                // Remove contract by calling ContractDB.remove(contract)service.
                if ($scope.contract.id == null) {
                    $scope.contract.id = $scope.contractList[$scope.contractList.length - 1].id;
                }
                //ContractDB.remove(contract);
                $ionicHistory.goBack();
            }// End remove contract.
            catch (e) {
                // Showing toast for unable to remove data.
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: window.globalVariable.message.errorMessage
                        }
                    }
                });// End showing toast.
            }
        }, function () {
            // For cancel button to remove data.
        });// End alert box.
    };// End remove contract.

    // validateRequiredField is for validate the required field.
    // Parameter :
    // form(object) = contract object that presenting on the view.
    $scope.validateRequiredField = function (form) {
        return !(   (form.firstName.$error.required == undefined)
        && (form.lastName.$error.required == undefined)
        && (form.telephone.$error.required == undefined));
    };// End validate the required field.

    // showListBottomSheet is for showing the bottom sheet.
    // Parameter :
    // $event(object) = position of control that user tap.
    // contractForm(object) = contract object that presenting on the view.
    $scope.showListBottomSheet = function ($event, contractForm) {
        $scope.disableSaveBtn = $scope.validateRequiredField(contractForm);
        $mdBottomSheet.show({
            templateUrl: 'contract-actions-template',
            targetEvent: $event,
            scope: $scope.$new(false),
        });
    };// End showing the bottom sheet.

    $scope.initialForm();

});// End  Contract Detail page Controller.
