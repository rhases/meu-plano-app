// Controller of dashboard.
appControllers.controller('emergencyHospitalsController', function($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, toasts, $ionicPopup, $ionicModal, $ionicLoading, $cordovaGeolocation, HealthProvider, authService) {
    var geocoder = new google.maps.Geocoder();

    $scope.isAnimated =  $stateParams.isAnimated;

    $scope.emergencyHospitals = [];

	$scope.doRefresh = _doRefresh;
	_doRefresh();

	function _doRefresh() {
		$scope.loading = true;
		$ionicLoading.show();
        return $q.when()
			.then(getAppUser())
			.then(getCurrentPosition())
	        .then(function(position) {
	            return $q.when()
	                .then(createMap(position))
					.then(getHospitals(position))
	                .then(populateHospitals())
					.then(function() {
					})
	        })
			.then(function() {
				$scope.loading = false;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
			})
	        .catch(function(error) {
	            console.log(error);
	        })
	}

	function getHospitals(position) {
		return function() {
			console.log("GET");
			return getCityAndStateByGeocode(position)
	   			.then(function(geolocation) {
	   				var state = brazilianInfos.getStateByLabel(geolocation.administrative_area_level_1);
	   				if (!state)
	   					state = brazilianInfos.getStateByCod(geolocation.administrative_area_level_1);

	   				var city = brazilianInfos.getCityByLabel(state, geolocation.administrative_area_level_2);
	   				if (!city)
	   					city = brazilianInfos.getCityByCod(state, geolocation.administrative_area_level_2);

	   		    	return HealthProvider.queryAllHospitalsByHealthPlan({ 'state': state.cod, 'city': city.cod, 'planOperatorId': $scope.appUser.healthPlan.operator , 'planoCodId': $scope.appUser.healthPlan.cod }).$promise
	   			})
	   			.then(function(hospitals) {
	   				console.log(hospitals);
	   				$scope.emergencyHospitals = hospitals;
	   				return hospitals;
	   			});
		}
	}

	function getCityAndStateByGeocode(position) {
		var geocoder = new google.maps.Geocoder;

		// console.log(position);
		var deferred = $q.defer();

		if (position && position.coords) {
			geocoder.geocode({ 'location': { lat: position.coords.latitude, lng: position.coords.longitude } },
				function(results, status) {
					// console.log(results);
					if (status === google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var compiledResult = results[0].address_components
								.map(function(e) {
									var a = {};
									a[e.types[0]] = e.long_name;
									return a; })
								.reduce(function(previousValue, currentValue, index) {
									if(!previousValue) previousValue = {};
									_.merge(previousValue, currentValue);
									return previousValue;
								});

							deferred.resolve(compiledResult)
						} else {
							deferred.reject(new Error('No results found'));
						}
					} else {
						deferred.reject(new Error('Geocoder failed due to: ' + status));
					}
				});
		}

		return deferred.promise;
	}

    function getCurrentPosition() {
        return function() {
            return $cordovaGeolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true });
        }
    }

    function createMap(position) {
        return function() {
			console.log("CREATE")
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 10,
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

    function populateHospitals() {
        return function(hospitals) {
			console.log("POPULATE")

			var promises = [];

			var index = 0;
            angular.forEach(hospitals, function(hospital) {
				// var hospital = hospitals[0]
                if (!hospital.address)
                    return;

				promises.push(geocode(index, hospital));

				index++;
            });

			// return $q.race(promises);
			return $q.all(promises);
        }
    }


	function geocode(index, hospital) {
		var deferred = $q.defer();

        var address = hospital.address.address + ', ';
        address += hospital.address.city + ', ';
        address += hospital.address.state + ', ';
        address += hospital.address.zip + ', BR';

		$timeout(function() {
			geocoder.geocode( { 'address': address }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var marker = new google.maps.Marker({
						map: $scope.map,
						animation: google.maps.Animation.DROP,
						position: results[0].geometry.location,
						icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
					});

					var infoWindow = new google.maps.InfoWindow({
						content: hospital.name
					});

					google.maps.event.addListener(marker, 'click', function () {
						infoWindow.open($scope.map, marker);
					});

					deferred.resolve();
				} else {
					console.log("Geocode was not successful for the following reason: " + status)
					deferred.resolve("Geocode was not successful for the following reason: " + status);
				}
			});
		}, index % 5 * 100);

		return deferred.promise;
	}

	function getAppUser() {
		return function() {
			return authService.getAppUser()
				.then(function(appUser) {
					$scope.appUser = appUser;
				})
		}
	}
});
