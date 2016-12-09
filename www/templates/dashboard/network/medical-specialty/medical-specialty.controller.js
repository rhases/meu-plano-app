// Controller of dashboard.
appControllers.controller('medicalSpecialtyController', function ($scope, $rootScope, $timeout, $stateParams, $q, ionicMaterialMotion, ionicMaterialInk, toasts, $ionicModal, MedicalSpecialty, HealthProvider, NetworkRequest) {

	MedicalSpecialty.get({ id: $stateParams.id }).$promise
		.then(function (medicalSpecialty) {
			$scope.medicalSpecialty = medicalSpecialty;
		})
		.then(getHealthProviders())
		.then(function() {
			animateList();
		})
        .catch(function(err) {
			toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.')
		})
		.then(function() {
			$scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
		});

	function animateList() {
	    $timeout(function() {
			ionicMaterialMotion.fadeSlideIn();
			ionicMaterialInk.displayEffect();
		}, 100);
	}

	function getHealthProviders() {
		return function() {
			return HealthProvider.queryByHealthPlanAndMedicalSpecialty({ heathPlan: $rootScope.userProfile.healthPlan, medicalSpecialty: $scope.medicalSpecialty._id }).$promise
				.then(function(healthProviders) {
					console.log(healthProviders)
					$scope.healthProviders = healthProviders;
				})
		}
	}

	$scope.requestNetwork = function() {
		showModalComment()
			.then(function(comment) {
				return NetworkRequest.save({
					user: $rootScope.userProfile._id,
					healthPlan: $rootScope.userProfile.healthPlan,

					medicalSpecialty: $scope.medicalSpecialty._id,
					procedure: undefined,

					comment: comment,

					status: "new" // new, answered
				}).$promise
				.then(function() {
					toasts.showSimple('Rede solicitada. :)')
				})
			})
	}

	function showModalComment() {
		return $q(function(resolve, reject) {
			$ionicModal.fromTemplateUrl('templates/dashboard/network/comment-modal.html', {
					scope: $scope,
					animation: 'slide-in-up'
				})
				.then(function(modal) {
					var commentModal = {
						ok: function() {
							modal.remove();
							resolve($scope.commentModal.comment);
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


}); // End of dashboard controller.
