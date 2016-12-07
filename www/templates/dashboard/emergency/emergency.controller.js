// Controller of dashboard.
appControllers.controller('emergencyHospitalsController', function($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, ionicMaterialMotion, ionicMaterialInk, APPOINTMENT_STATUS, APPOINTMENT_REQUEST_STATUS, transformUtils, toasts, $ionicHistory, $ionicPopup, $ionicModal, $ionicLoading, Hospitals) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;
	$scope.emergencyHospitals = [{
        "_id": 3019608,
        "name": "HOSPITAL SANTA HELENA",
        "image": "",
        "address":  {
    	    "label": "sede",
    	    "name": "",
    	    "state": "df",
    	    "city": "brasilia",
    	    "area": "Asa Norte",
    	    "address": "SHLN 516 CONJUNTO D",
    	    "zip":  "70770560",
    	    "phones": ["3215-0150"],
    	},
        "operators": [ 5711 ],
        "healthPlans": [{
    		"plan": 471802140,
            "services": [ "pronto-socorro" ],
            "medicalSpecialties": [],
            "procedures": [],
        }]
    }];

	// getHospitals()
	// 	.then(function(emergencyHospitals) {
	// 		$scope.emergencyHospitals = emergencyHospitals;
	// 	})
	// 	.cathc(function(error) {
	// 		console.log(error);
	// 	});

	$scope.doRefresh = function() {
		return appointmentRequestService.get({tryReloadFirst: true})
	        .then(function(appointmentRequests) {
				$scope.appointmentRequests = appointmentRequests;
				return appointmentService.get({tryReloadFirst: true});
			})
			.then(function(appointments) {
				$scope.appointments = appointments;
				animateList();
			})
	        .catch(function(err) { toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.') })
			.then(function() {
				$scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
			});
	}

    $scope.relativeDateFormat = function(data) {
        return moment(String(data)).locale('pt-BR').fromNow();
    };

    $scope.formatDate = function(data) {
        return moment(String(data)).locale("pt-BR").format("DD/MM/YY [às] HH:mm");
    };

    $scope.outdatedDate = function(dateP) {
		var nowTime = Date.now();
		var date = new Date(String(dateP));

		return now > date.getTime();
	}

    function showConfirm(title, body) {
        return confirmPopup = $ionicPopup.confirm({
            title: title,
            template: body,
			buttons: [
				{ text: "NÃO" },
				{
					text: "SIM",
					type: "button-positive",
					onTap: function(e) {
						return true;
					}
				}
			]
        });
     }

	function showModalComment(title) {
		return $q(function(resolve, reject) {
			$ionicModal.fromTemplateUrl('templates/dashboard/comment-modal/comment-modal.html', {
					scope: $scope,
					animation: 'slide-in-up'
				})
				.then(function(modal) {
					var commentModal = {
						title: title,
						ok: function() {
							modal.remove();
							resolve($scope.commentModal);
							delete $scope.commentModal;
						},
						cancel: function() {
							modal.remove();
							reject();
							delete $scope.commentModal;
						}
					}

					$scope.commentModal = commentModal;
					modal.show();
				});
		})
	}

	function animateList() {
	    $timeout(function() {
			ionicMaterialMotion.fadeSlideIn();
			ionicMaterialInk.displayEffect();
		}, 100);
	}

	function getHospitals() {
		return Hospitals.getEmergencyHospitals($scope.userProfile);
	}

});
