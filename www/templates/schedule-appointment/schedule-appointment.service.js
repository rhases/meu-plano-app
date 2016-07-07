appServices.factory('scheduleAppointmentRequestService', function () {

    var service = {

        appointmentRequest: {
            specialty: '',
            weekDays: [],
            periods: [],
            locations: []
        }
    }

    service.getAppointmentRequest = function() {
        return service.appointmentRequest;
    }

    service.setSpecialty = function(specialty) {
        service.appointmentRequest.specialty = specialty;
    }

    service.setWeekDays = function(days) {
        service.appointmentRequest.weekDays = days;
    }

    service.setPeriods = function(periods) {
        service.appointmentRequest.periods = periods;
    }

    service.setLocations = function(locations) {
        service.appointmentRequest.locations = locations;
    }

    return service;
});
