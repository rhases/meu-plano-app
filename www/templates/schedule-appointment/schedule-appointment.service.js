appServices.factory('scheduleAppointmentRequestService', function ($http, $rootScope) {

    var service = { };

    cleanRequest();

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

    service.submit = function(successHandler, errorHandler) {
        var request = getRequest();
        return $http.post(window.globalVariable.backend.schedulerServerUri + 'api/appointment-requests', request)
			.catch(function(error) {
                // TODO tratar o erro
				errorHandler('Erro inesperado. Tente novamente em alguns segundos.');
			})
			.then(function(res) {
				console.log('Schedule appointment request sent with success.');
                cleanRequest();
                successHandler();
			});
    }

    function getRequest() {
        var weekdaysCods = service.appointmentRequest.weekdays.map(function(day) { return day.cod });
        var periodsCods = service.appointmentRequest.periods.map(function(period) { return period.cod });
        var locationsLabels = service.appointmentRequest.locations.map(function(location) { return location.labels });
        var request = {
            userProfile: $rootScope.appUser.email,
            speciality: service.appointmentRequest.specialty.cod,
            weekday: weekdaysCods,
            timerange: periodsCods,
            area: locationsLabels,
            comment: 'Rápido, viu?',
            status: 'NEW'
        }
        return request;
    }

    function cleanRequest() {
        service.appointmentRequest = {
            specialty: '',
            weekdays: [],
            periods: [],
            locations: []
        }
    }

    return service;
});
