angular.module('starter')
    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

        //$stateProvider is using for add or edit HTML view to navigation bar.
        //
        //Schema :
        //state_name(String)      : Name of state to use in application.
        //page_name(String)       : Name of page to present at localhost url.
        //cache(Bool)             : Cache of view and controller default is true. Change to false if you want page reload when application navigate back to this view.
        //html_file_path(String)  : Path of html file.
        //controller_name(String) : Name of Controller.
        //
        //Learn more about ionNavView at http://ionicframework.com/docs/api/directive/ionNavView/
        //Learn more about  AngularUI Router's at https://github.com/angular-ui/ui-router/wiki
        $stateProvider
			// MENU
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/menu.html",
                controller: 'menuCtrl'
            })

			// DASHBOARD 
            .state('app.dashboard::emergencyHospitals', {
                url: "/emergency-hospitals",
				cache: false,
                params:{
                    isAnimated: true,
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard/emergency/emergency.html",
                        controller: 'emergencyHospitalsController'
                    }
                }
            })
			.state('app.dashboard::network', {
                url: "/network",
				cache: false,
                params:{
                    isAnimated: true,
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard/network/network.html",
                        controller: 'networkController'
                    }
                }
            })
            .state('app.dashboard::infos', {
                url: "/infos",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard/infos/infos.html",
                        controller: 'infosCtrl'
                    }
                }
            })

        //Use $urlRouterProvider.otherwise(Url);
        // $urlRouterProvider.otherwise(localStorage['AUTH_TOKEN'] ? '/app/dashboard' : '/app/login');
        $urlRouterProvider.otherwise('/app/emergency-hospitals');

    });
