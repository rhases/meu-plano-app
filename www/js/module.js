angular.module('starter',
	[
		'ionic',
		'ionic.service.core',
		'ionic.service.analytics',
		'ngIOS9UIWebViewPatch',
		'starter.controllers',
		'starter.services',
		'ngMaterial',
		'ngMessages',
		'ngCordova',
		'ngLodash'
	]
)

var appControllers = angular.module('starter.controllers', []); // Use for all controller of application.
var appServices = angular.module('starter.services', []);// Use for all service of application.
