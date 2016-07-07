appServices.factory('scheduleAppointmentService', function () {

    var service = {

        appointment: {
            specialty: '',
            weekDays: [],
            periods: [],
            locations: []
        }
    }

    service.setSpecialty = function(specialty) {
        service.appointment.specialty = specialty;
    }

    service.setWeekDays = function(days) {
        service.appointment.weekDays = days;
    }

    service.setPeriods = function(periods) {
        service.appointment.periods = periods;
    }

    service.setLocations = function(locations) {
        service.appointment.locations = locations;
    }

    return service;
});
