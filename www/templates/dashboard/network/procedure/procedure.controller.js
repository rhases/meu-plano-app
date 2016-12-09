// Controller of dashboard.
appControllers.controller('procedureController', function($scope, $rootScope, $timeout, $stateParams, $q, ionicMaterialMotion, ionicMaterialInk, toasts, $ionicModal, Procedure, HealthProvider, NetworkRequest) {

	Procedure.get({ id: $stateParams.id }).$promise
		.then(function (procedure) {
			$scope.procedure = procedure;
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
			return HealthProvider.queryByHealthPlanAndProcedure({ state: $rootScope.userProfile.state, city: $rootScope.userProfile.city, plan: $rootScope.userProfile.healthPlan, procedure: $scope.procedure._id }).$promise
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
