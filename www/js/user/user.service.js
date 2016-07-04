angular.module('starter').service('userService', function($rootScope, $cordovaPushV5, $q, $http) {

	var _user;
	var _authToken;

	function _getCurrentUser() {
		return _user;
	}

	function _getAuthToken() {
		return _authToken;
	}

	function _facebookSignUp(facebookInfo) {

		// verifica se o usuario ja esta registrado
		// Se esta, somente carrega suas informacoes.
		// Se nao, salva no auth-ws e cria o usuario no schedule-ws
		return _newUser(facebookInfo);
	}

	function _newUser(facebookInfo) {
		_user = {
			name: facebookInfo.name,
			email: facebookInfo.email,
			picture : "https://graph.facebook.com/" + facebookInfo.id + "/picture?type=large"
		};
		_saveAuthUser(_user, facebookInfo);
		return _user;
	}

	function _saveAuthUser(user, facebookInfo) {
		var authUser = {
		    name: user.name,
		    email: user.email,
		    facebook: facebookInfo
		};
		// TODO envia para o rhases-auth.
	}

	function _saveUserProfile(user) {
		var userProfile = {
			_id: user.email, // email
			name: user.name,
			hasHealthPlan: user.hasHealthPlan,
			healthPlanNumber: user.healthPlanNumber,
			healthPlanOperator: user.healthPlanOperator
		};
		// TODO envia para o rhases-auth.
	}

	return {
		currentUser: _getCurrentUser,
		authToken: _getAuthToken,
		facebookSignUp: _facebookSignUp,
	}
})
