angular.module('starter').service('analyticsService',
function(GA_TRACKING_ID) {

  //setup
  var _analyticsTrack = {
    view: function(screenTitle){
      analytics.trackView(screenTitle)
    },
    lifeCyle: function(action, label, value){
      analytics.trackEvent('lifecyle', action, label, value)
    },
    account: function(action, label, value){
      analytics.trackEvent('account', action, label, value)
    },
    appointment: function(action, label, value){
      analytics.trackEvent('appointments', action, label, value)
    },
    user: function(userId){
      analytics.analytics.setUserId(userId);
    },
    logError: function(message){
      analytics.trackEvent('error handler',message)
    },
  }


  // log in console if can access analytics (browser, for example)
  function _log(group, ...params){
    return function(...params){
        console.log(group, params);
    }
  }

  var _dummyTrack = {
    lifeCyle: _log('lifeCyle'),
    view: _log('view'),
    nav: _log('nav'),
    account: _log('account'),
    appointment: _log('appointment'),
    user: _log('user'),
    logError: _log('logError')
  }

  var _trackFnc = _dummyTrack;

  function _setup(){

    //ionic analytics setup
    // $ionicAnalytics.register();

    //ionic analytics setup
    if (typeof analytics !== 'undefined'){
        analytics.startTrackerWithId(GA_TRACKING_ID);
        //defined analytics. Start real tracking.
        _trackFnc = _analyticsTrack;
        _analyticsTrack.lifeCyle('started', 'app');
    }else{
      console.log('analytics not defined! It is only available in Android and iOS devices');
    }
  }

  function _onView(event, data){
    _trackFnc.view(data.stateName);
  }

	return {
    setup: _setup,
    track: _trackFnc,
    onView:_onView,
	}
});
