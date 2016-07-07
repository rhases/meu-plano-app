angular.module('starter').service('analyticsService', function(GA_TRACKING_ID) { //$ionicAnalytics

  //setup
  var _track = {
    view: function(screenTitle){
      analytics.trackView(screenTitle)
    },
    lifeCyleAction: function(action, label, value){
      analytics.trackEvent('lifecyle', action, label, value)
    },
    accountAction: function(action, label, value){
      analytics.trackEvent('account', action, label, value)
    },
    appointmentAction: function(action, label, value){
      analytics.trackEvent('appointments', action, label, value)
    },
    user: function(userId){
      analytics.analytics.setUserId(userId);
    }
  }

  function log(param){
    console.log(param);
  }

  var _dummyTrack = {
    view: function(pram){log(param)},
    accountAction: function(pram){log(param)},
    appointmentAction: function(pram){log(param)},
    user: function(pram){log(param)},
  }

  var _trackFnc = _dummyTrack;

  function _setup(){
    //ionic analytics setup
    // $ionicAnalytics.register();

    //ionic analytics setup
    if (typeof analytics !== 'undefined'){
        analytics.startTrackerWithId(GA_TRACKING_ID);
        //defined analytics. Start real tracking.
        _trackFnc = _track;
        _track.lifeCyleAction('started', 'app');
    }else{
      console.log('analytics not defined! It is only available in Android and iOS devices');
    }
  }

	return {
    setup: _setup,
    track: _track
	}
})
