// Controller of dashboard.
appControllers.controller('medicalSpecialtyController', function ($scope, $rootScope, $timeout, $stateParams, $q, ionicMaterialMotion, ionicMaterialInk, toasts, $ionicModal, MedicalSpecialty, HealthProvider, NetworkRequest, authService) {

	MedicalSpecialty.get({ id: $stateParams.id }).$promise
		.then(function (medicalSpecialty) {
			$scope.medicalSpecialty = medicalSpecialty;
		})
		.then(getAppUser())
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

	$scope.requestNetwork = function() {
		showModalComment()
			.then(function(comment) {
				return NetworkRequest.save({
					user: $scope.appUser._id,
					healthPlan: $scope.appUser.healthPlan,

					medicalSpecialty: $scope.medicalSpecialty._id,
					procedure: undefined,

					comment: comment,

					status: "new" // new, answered
				}).$promise
				.then(function() {
					toasts.showSimple('Rede solicitada. :)')
					$rootScope.$emit('app.new-network-request')
				})
			})
	}

	function animateList() {
	    $timeout(function() {
			ionicMaterialMotion.fadeSlideIn();
			ionicMaterialInk.displayEffect();
		}, 100);
	}

	function getHealthProviders() {
		return function() {
			return HealthProvider.queryByHealthPlanAndMedicalSpecialty({ state: $scope.appUser.state, city: $scope.appUser.city, plan: $scope.appUser.healthPlan, medicalSpecialty: $scope.medicalSpecialty._id }).$promise
				.then(function(healthProviders) {
					console.log(healthProviders)
					$scope.healthProviders = healthProviders;
				})
		}
	}

	function getAppUser() {
		return function() {
			return authService.getAppUser()
				.then(function(appUser) {
					$scope.appUser = appUser;
				})
		}
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
