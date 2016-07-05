appControllers.controller('loginCtrl', function($scope, $state, $q, $ionicLoading, $mdToast, userService) {

  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

  	var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      var user = userService.facebookSignUp(profileInfo)
			$ionicLoading.hide();
			console.log('User Signed in: ' + JSON.stringify(user));
      $state.go('app.register');

    }, function(fail){
      fbLoginError(fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError ' + JSON.stringify(error), error);
    $ionicLoading.hide();

		// User Cancelled (4201)
		$mdToast.showSimple('Não foi possível acessar o seu perfil.\n Feche o app do Facebook e tente novamente!');
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var deferred = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log('GetProfileInfo success:  ' + JSON.stringify(response));
        deferred.resolve(response);
      },
      function (response) {
				console.log('GetProfileInfo failed: ' + JSON.stringify(response));
        deferred.reject(response);
      }
    );
    return deferred.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {

    facebookConnectPlugin.getLoginStatus(function(success){
			$ionicLoading.show({
				template: 'Conectando com o Facebook...'
			});

      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus ' + success.status);

    		// Check if we have our user saved
    		if(userService.getCurrentUser()){
					console.log('Usuario ja logado. Redirecionando...');
					$state.go('app.home');
				} else {
					console.log('Efetuando login...');
					fbLoginSuccess(success);
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus (status != connected) ' + success.status);

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
});// End of facebook friend list controller.
