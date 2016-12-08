// Controller of dashboard.
appControllers.controller('emergencyHospitalsController', function($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, toasts, $ionicPopup, $ionicModal, $ionicLoading, $cordovaGeolocation, HealthProvider) {

    $scope.isAnimated =  $stateParams.isAnimated;

    $scope.emergencyHospitals = [];

    getHospitals()
        .then(function(hospitals) {
            return $q.when()
                .then(getCurrentPosition())
                .then(createMap())
                .then(populateHospitals(hospitals));
        })

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

        return HealthProvider.getHospitals({'state': 'df', 'city': 'brasilia', 'plan': 471802140}).$promise
                .then(function(hospitals) {
                    $scope.emergencyHospitals = hospitals;
                    return hospitals;
                });
	}

    function getCurrentPosition() {
        var options = {timeout: 10000, enableHighAccuracy: true};

        return function() {
            return $cordovaGeolocation.getCurrentPosition(options);
        }
    }

    function createMap() {
        return function(position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Você"
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open($scope.map, marker);
                });
            });
        }
    }

    function populateHospitals(hospitals) {
        return function() {
            angular.forEach(hospitals, function(hospital) {
                if (!hospital.address.geo)
                    return;

                var latLng = new google.maps.LatLng(hospital.address.geo.latitude, hospital.address.geo.longitude);

                google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        animation: google.maps.Animation.DROP,
                        position: latLng,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    });

                    var infoWindow = new google.maps.InfoWindow({
                        content: hospital.name
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.open($scope.map, marker);
                    });
                });
            });
        }
    }
});
