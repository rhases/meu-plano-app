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

			// LOGIN
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

			// REGISTER
			.state('app.register::infos', {
                url: "/register/infos",
				cache: false,
                params:{
                    isAnimated: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/register/infos/infos.html",
                        controller: 'registerCtrl'
                    }
                }
            })
			.state('app.register::profile', {
                url: "/register/profile",
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
			.state('app.register::notInvited', {
                url: "/register/not-invited",
				cache: false,
                params:{
                    isAnimated: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/register/not-invited/not-invited.html",
                        controller: 'notInvitedCtrl'
                    }
                }
            })

			// DASHBOARD
            .state('app.dashboard', {
                url: "/dashboard",
				cache: false,
                params: {
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard/dashboard.html",
                        controller: 'dashboardController'
                    }
                }
            })
            // .state('app.dashboard-cancel', {
            //     url: "/cancel-appointment",
			// 	cache: false,
            //     params:{
            //         isAnimated: true,
            //         appointment: null
            //     },
            //     views: {
            //         'menuContent': {
            //             templateUrl: "templates/dashboard/cancel-appointment/cancel-appointment.html",
            //             controller: 'cancelAppointmentController'
            //         }
            //     }
            // })
            .state('app.dashboard-detail', {
                url: "/detail-appointment",
				cache: false,
                params:{
                    isAnimated: true,
                    appointmentRequest: null
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard/detail-appointment/detail-appointment.html",
                        controller: 'detailAppointmentController'
                    }
                }
            })

			// SCHEDULE APPOINTMENT
            .state('app.scheduleAppointment', {
                url: "/schedule-appointment",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/specialty/specialty.html",
                        controller: 'specialtyCtrl'
                    }
                }
            })
            .state('app.scheduleAppointment::days', {
                url: "/schedule-appointment/days",
				views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/days/days.html",
                        controller: 'daysCtrl'
                    }
                }
            })
            .state('app.scheduleAppointment::daysPeriods', {
                url: "/schedule-appointment/daysPeriods",
				views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/days-periods/days-periods.html",
                        controller: 'daysPeriodsCtrl'
                    }
                }
            })
            .state('app.scheduleAppointment::locations', {
                url: "/schedule-appointment/locations",
				views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/locations/locations.html",
                        controller: 'locationsCtrl'
                    }
                }
            })
            .state('app.scheduleAppointment::observations', {
                url: "/schedule-appointment/observations",
                cache: false,
				views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/observations/observations.html",
                        controller: 'observationsCtrl'
                    }
                }
            })
            .state('app.scheduleAppointment::confirmation', {
                url: "/schedule-appointment/confirmation",
                cache: false,
				views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/confirmation/confirmation.html",
                        controller: 'confirmationCtrl'
                    }
                }
            }).state('app.scheduleAppointment::happy-end', {
                url: "/schedule-appointment/happy-end",
				views: {
                    'menuContent': {
                        templateUrl: "templates/schedule-appointment/happy-end/happy-end.html",
                        controller: 'happyEndCtrl'
                    }
                }
            })

			// FALE CONOSCO
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

			// PERFIL DO USUÁRIO
			.state('app.userProfile', {
                url: "/userProfile",
                params:{
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/user-profile/user-profile.html",
                        controller: "userProfileCtrl"
                    }
                }
            })

        //Use $urlRouterProvider.otherwise(Url);
        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });
