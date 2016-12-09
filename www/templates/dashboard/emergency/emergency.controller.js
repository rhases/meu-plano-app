// Controller of dashboard.
appControllers.controller('emergencyHospitalsController', function($http, $scope, $rootScope, $timeout, $state, $stateParams, $q, lodash, toasts, $ionicPopup, $ionicModal, $ionicLoading, $cordovaGeolocation, HealthProvider) {
    var geocoder = new google.maps.Geocoder();

    $scope.isAnimated =  $stateParams.isAnimated;

    $scope.emergencyHospitals = [];

    getHospitals()
        .then(function(hospitals) {
            return $q.when()
                .then(getCurrentPosition())
                .then(createMap())
                .then(populateHospitals(hospitals))
                .catch(function(error) {
                    console.log(error.message);
                });
        })
        .catch(function(error) {
            console.log('emergencyHospitalsController ');
            console.log(error.message);
        })

	$scope.doRefresh = function() {
        getHospitals()
            .then(function(hospitals) {
                return $q.when()
                    .then(getCurrentPosition())
                    .then(createMap())
                    .then(populateHospitals(hospitals))
                    .then(function() {
        				$scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
                        animateList();
        			})
                    .catch(function(error) {
                        console.log('emergencyHospitalsController ');
                        console.log(error.message);
                    });
            })
            .catch(function(error) {
                console.log('emergencyHospitalsController ');
                console.log(error.message);
                toasts.showSimple('Algo ruim aconteceu! Verifique sua conexão com a internet.')
            });
	}

	function animateList() {
	    $timeout(function() {
			ionicMaterialMotion.fadeSlideIn();
			ionicMaterialInk.displayEffect();
		}, 100);
	}

	function getHospitals() {
        return HealthProvider.queryAllHospitalsByHealthPlan({'state': 'df', 'city': 'brasilia', 'plan': 471802140}).$promise
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
                if (!hospital.address)
                    return;

                var address = hospital.address.address + ', ';
                address += hospital.address.city + ', ';
                address += hospital.address.state + ', ';
                address += hospital.address.zip + ', BR';

                geocoder.geocode( { 'address': address }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        google.maps.event.addListenerOnce($scope.map, 'idle', function() {
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
                        });
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
            });
        }
    }
});
