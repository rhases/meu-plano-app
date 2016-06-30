angular.module('starter').service('pushService', function($rootScope, $cordovaPushV5, $http) {

	function _updateUser(userId, updateData) {
		return $http.put(window.globalVariable.backend.authServerUri + "/api/users/" + userId, updateData)
	}

	function _updateAppointment(appointmentId, updateData) {
		return $http.put(window.globalVariable.backend.schedulerServerUri + "/api/appointments/" + appointmentId, updateData)
	}

	function _register() {
		if (ionic.Platform.is('browser')) {
			console.log("You are running on browser, please switch to your device. Otherwise you won't get notifications");
			return;
		}

		// register push notification and get local push token
		$cordovaPushV5.initialize(  // important to initialize with the multidevice structure !!
			{
				android: {
					senderID: window.globalVariable.push.gcmSenderId,
					icon: "icon",
					iconColor: "#006838"
				},
				ios: {
					alert: 'true',
					badge: true,
					sound: 'false',
					clearBadge: true
				},
				windows: {}
			}
		).then(function () {
			console.log("Push initialized.");

			$cordovaPushV5.onNotification(); // enable the plugin to emit the notification event
			$cordovaPushV5.onError(); // enable the plugin to emit the notification event

			$cordovaPushV5.register()
				.then(function (deviceToken) {
					console.log("Push registered. " + deviceToken);

					// localStorage.pushId = deviceToken;

					// TODO: Get autorization id
					// TODO: Get real user logged
					// var user = { _id: 'abc'}
					_updateUser(user._id,
						{
							appInfo: {
								pushId: deviceToken,
								platform: ionic.Platform.platform(),
								platformVersion: ionic.Platform.version()
							}
						})
						.then(function (res) {
							console.log("PushId sent to auth server.", err);
						});
				}, function (err) {
					console.log("Error on push register." + err);
				});
		});
	}


	function _startListeners() {
		window.app = {
			pushListener: {
				appointment: {
					accept: function(pushMessage) {
						console.log("\n>>> ACCEPT " + JSON.stringify(pushMessage) + "\n");
						_updateAppointment(pushMessage.additionalData.appointmentId, { status: 'ACCEPTED' })
							.then(function (res) {
								console.log("Appointment accepted.");
								$state.go('app.dashboard');
								$rootScope.emit('rhases:refresh'); // send event to refresh the home
							});
					},
					reject: function(pushMessage) {
						console.log("\n>>> REJECT " + JSON.stringify(pushMessage) + "\n");
						_updateAppointment(pushMessage.additionalData.appointmentId, { status: 'REFUSED' })
							.then(function (res) {
								console.log("Appointment rejected.");
								$state.go('app.dashboard');
								$rootScope.emit('rhases:refresh'); // send event to refresh the home
							});
					},
				}
			}
		}


		/*
		 * Push notification events
		 */
		$rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {  // use two variables here, event and data !!!
			console.log('\n>>> NOTIFICATION ' + JSON.stringify(data))

			// Tell to app he need to update yout infos
			$rootScope.emit('rhases:refresh')

			// needed by IOS
			$cordovaPushV5.finish()
				.then(function (result) {
					console.log("Finished push notification. " + result);
				}, function (err) {
					console.log("Finished with error. " + err);
				});
		});
	}

	return {
		register: _register,
		startListeners: _startListeners
	}
})
