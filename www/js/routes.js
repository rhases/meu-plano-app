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
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/menu.html",
                controller: 'menuCtrl'
            })
			.state('app.login', {
                url: "/login",
				cache: false,
                params:{
                    isAnimated: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/login/login.html",
                        controller: 'loginCtrl'
                    }
                }
            })
			.state('app.register', {
                url: "/complete-register",
				cache: false,
                params:{
                    isAnimated: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/register/complete-register/complete-register.html",
                        controller: 'registerCtrl'
                    }
                }
            })
			.state('app.profile', {
                url: "/profile",
				cache: false,
                params:{
                    isAnimated: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/register/profile/profile.html",
                        controller: 'profileCtrl'
                    }
                }
            })
			.state('app.notInvited', {
                url: "/not-invited",
				cache: false,
                params:{
                    isAnimated: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/not-invited/not-invited.html",
                        controller: 'notInvitedCtrl'
                    }
                }
            })
            .state('app.dashboard', {
                url: "/list-appointment",
				cache: false,
                params: {
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard/list-appointment/list-dashboard.html",
                        controller: 'listAppointmentController'
                    }
                }
            })
            .state('app.dashboard-cancel', {
                url: "/cancel-appointment",
				cache: false,
                params:{
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "../templates/dashboard/cancel-appointment/cancel-appointment.html",
                        controller: 'cancelAppointmentController'
                    }
                }
            })
            .state('app.dashboard-detail', {
                url: "/detail-appointment",
				cache: false,
                params:{
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "../templates/dashboard/detail-appointment/detail-appointment.html",
                        controller: 'detailAppointmentController'
                    }
                }
            })
            .state('app.scheduleAppointment', {
                url: "/scheduleAppointment",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/specialty.html",
                        controller: 'specialtyCtrl'
                    }
                }
            })
            .state('app.scheduleAppointment.days', {
                url: "/days",
                templateUrl: "templates/schedule-appointment/days.html",
                controller: 'daysCtrl'
            })
            .state('app.scheduleAppointment.daysPeriods', {
                url: "/daysPeriods",
                templateUrl: "templates/schedule-appointment/days-periods.html",
                controller: 'daysPeriodsCtrl'
            })
            .state('app.scheduleAppointment.locations', {
                url: "/locations",
                templateUrl: "templates/schedule-appointment/locations.html",
                controller: 'locationsCtrl'
            })
            .state('app.scheduleAppointment.observations', {
                url: "/observations",
                templateUrl: "templates/schedule-appointment/observations.html",
                controller: 'observationsCtrl'
            })
            .state('app.scheduleAppointment.confirmation', {
                url: "/confirmation",
                templateUrl: "templates/schedule-appointment/confirmation.html",
                controller: 'confirmationCtrl'
            }).state('app.scheduleAppointment.happy-end', {
                url: "/happy-end",
                templateUrl: "templates/schedule-appointment/happy-end.html",
                controller: 'happyEndCtrl'
            })
			.state('app.talkWithUs', {
                url: "/talkWithUs",
                cache: true,
                views: {
                    'menuContent': {
                        templateUrl: "templates/talk-with-us/talk-with-us.html",
                        controller: 'talkWithUsCtrl'
                    }

                }
            })
			.state('app.userProfile', {
                url: "/userProfile",
                params:{
                    isAnimated:true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/user-profile/user-profile.html",
                        controller: "userProfileCtrl"
                    }
                }
            })
			.state('app.tryApp', {
                url: "/tryApp",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/try-app/html/try-app.html"
                    }
                }
            });

        //Use $urlRouterProvider.otherwise(Url);
        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });
