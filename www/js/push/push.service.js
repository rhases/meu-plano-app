angular.module('starter').service('pushService', function($rootScope, $cordovaPushV5, $http, authService, $state, AUTH_SERVER_URI, GCM_SENDER_ID) {

	function _updateUser(userId, updateData) {
		return $http.put(AUTH_SERVER_URI + "api/users/" + userId, updateData)
	}

	function _register() {
		console.log("The platform recognized is '" + ionic.Platform.platform() + "'.");
		if (!ionic.Platform.isAndroid() && !ionic.Platform.isIOS()) {
			console.log("You are running on browser, please switch to your device. Otherwise you won't get notifications");
			return;
		}

		// register push notification and get local push token
		$cordovaPushV5.initialize(  // important to initialize with the multidevice structure !!
			{
				android: {
					senderID: GCM_SENDER_ID,
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

					var sendPushIdToServer = function(userId) {
						_updateUser(userId,
							{
								appInfo: {
									pushId: deviceToken,
									platform: ionic.Platform.platform(),
									platformVersion: ionic.Platform.version()
								}
							})
							.then(function (res) {
								console.log("PushId sent to auth server.", res);
							});
					}

					$rootScope.$on('login:successful', sendPushIdToServer)
					if (authService.isLoggedIn()) {
						authService.getAppUser()
							.then(function(appUser) {
								if (appUser && appUser._id)
									sendPushIdToServer(appUser._id);
							})
					}
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
						$rootScope.$emit('rhases:appointment:accept', pushMessage.additionalData.appointmentId.toString()); // send event to refresh the home
						$state.go('app.dashboard');
					},
					reject: function(pushMessage) {
						console.log("\n>>> REFUSE " + JSON.stringify(pushMessage) + "\n");
						$rootScope.$emit('rhases:appointment:refuse', pushMessage.additionalData.appointmentId.toString()); // send event to refresh the home
						$state.go('app.dashboard');
					},
				}
			}
		}


		/*
		 * Push notification events
		 */
		$rootScope.$on('$cordovaPushV5:notificationReceived', function(event, pushMessage) {  // use two variables here, event and data !!!
			console.log('\n>>> NOTIFICATION ' + JSON.stringify(pushMessage))

			// Tell to app he need to update yout infos
			if (pushMessage.additionalData.appointmentId) {
				$rootScope.$emit('rhases:appointment:refresh', pushMessage.additionalData.appointmentId)
			} else {
				$rootScope.$emit('rhases:refresh')
			}

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
