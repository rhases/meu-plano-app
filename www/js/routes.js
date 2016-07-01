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
			                url: "/register",
							cache: false,
			                params:{
			                    isAnimated: false
			                },
			                views: {
			                    'menuContent': {
			                        templateUrl: "templates/register/register.html",
			                        controller: 'registerCtrl'
			                    }
			                }
			            })
            .state('app.dashboard', {
                url: "/dashboard",
				cache: false,
                params:{
                    isAnimated: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard/dashboard.html",
                        controller: 'dashboardCtrl'
                    }
                }
            })
            .state('app.setting', {
                url: "/setting",
                views: {
                    'menuContent': {
                        templateUrl: "templates/setting/setting.html",
                        controller: "settingCtrl"
                    }
                }
            })
            .state('app.scheduleAppointment', {
                url: "/scheduleAppointment",
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
            })
			.state('app.facebookLogin', {
                url: "/facebookLogin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/facebook/html/facebook-login.html",
                        controller: 'facebookLoginCtrl'
                    }
                }
            })
            .state('app.facebookProfile', {
                url: "/facebookProfile",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/facebook/html/facebook-profile.html",
                        controller: 'facebookProfileCtrl'
                    }
                }
            })
            .state('app.facebookFeed', {
                url: "/facebookFeed",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/facebook/html/facebook-feed.html",
                        controller: 'facebookFeedCtrl'
                    }
                }
            })
            .state('app.facebookFriendList', {
                url: "/facebookFriendList",
                cache: false,
                params: {
                    access_token: null,
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/facebook/html/facebook-friend-list.html",
                        controller: 'facebookFriendListCtrl'
                    }
                }
            })

        //Use $urlRouterProvider.otherwise(Url);
        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });