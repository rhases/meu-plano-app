// Controller of dashboard.
appControllers.controller('procedureController', function($scope, $rootScope, $timeout, $stateParams, $q, ionicMaterialMotion, ionicMaterialInk, toasts, $ionicModal, Procedure, HealthProvider, NetworkRequest, authService) {

	Procedure.get({ id: $stateParams.id }).$promise
		.then(function (procedure) {
			$scope.procedure = procedure;
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

					medicalSpecialty: undefined,
					procedure: $scope.procedure._id,

					comment: comment,

					status: "new" // new, answered
				}).$promise
				.then(function() {
					toasts.showSimple('Rede solicitada. :)')
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
			return HealthProvider.queryByHealthPlanAndProcedure({ state: $scope.appUser.state, city: $scope.appUser.city, plan: $scope.appUser.healthPlan, procedure: $scope.procedure._id }).$promise
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
