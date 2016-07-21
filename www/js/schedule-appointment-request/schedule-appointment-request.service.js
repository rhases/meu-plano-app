appServices.factory('scheduleAppointmentRequestService', function ($http, $rootScope, SCHEDULER_SERVER_URI, $q) {

    var service = { };

    cleanRequest();

    service.forceCleanRequest = function() {
        cleanRequest();
    }

    service.getAppointmentRequest = function() {
        return service.appointmentRequest;
    }

    service.setSpecialty = function(specialty) {
        service.appointmentRequest.specialty = specialty;
    }

    service.setWeekDays = function(days) {
        service.appointmentRequest.weekdays = days;
    }

    service.setPeriods = function(periods) {
        service.appointmentRequest.periods = periods;
    }

    service.setLocations = function(locations) {
        service.appointmentRequest.locations = locations;
    }

    service.setObservations = function(observations) {
        service.appointmentRequest.observations = observations;
    }

    service.submit = function(successHandler, errorHandler) {
      var request = getRequest();

      send(request)
			.then(function(res) {
        console.log('Schedule appointment request sent with success.');
        cleanRequest();
        successHandler();
			})
      .catch(function(error) {
        errorHandler('Erro inesperado. Tente novamente em alguns segundos.');
      });
    }

    function send(request) {
        var deferred = $q.defer();

        $http.post(SCHEDULER_SERVER_URI + "api/appointment-requests", request)
          .success(function(result) {
              deferred.resolve();
          })
          .error(function(error) {
              deferred.reject(error);
          });

        return deferred.promise;
    }

    function getRequest() {
        var weekdaysCods = service.appointmentRequest.weekdays.map(function(day) { return day.cod });
        var periodsCods = service.appointmentRequest.periods.map(function(period) { return period.cod });
        var locationsLabels = service.appointmentRequest.locations.map(function(location) { return location.label });
        var request = {
            userProfile: $rootScope.appUser.email,
            speciality: service.appointmentRequest.specialty.cod,
            weekday: weekdaysCods,
            timerange: periodsCods,
            area: locationsLabels,
            comment: service.appointmentRequest.observations,
            status: 'NEW'
        }
        return request;
    }

    function cleanRequest() {
        service.appointmentRequest = {
            specialty: '',
            weekdays: [],
            periods: [],
            locations: [],
            observations: ''
        }
    }

    return service;
});
