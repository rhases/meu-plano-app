appServices.factory('scheduleAppointmentService', function () {

    var service = {

        appointment: {
            specialty: '',
            weekDays: [],
            periods: [],
            locations: [
                    {label: 'Asa Norte', checked: false},
                    {label: 'Asa Sul', checked: false},
                    {label: 'Taguatinga', checked: false},
            ]
        }
    }

    function retrieveCheckedFromList(list) {
        return list.filter(function(element) { return element.checked });
    }

    service.getSelectedLocations = function() {
        return retrieveCheckedFromList(service.appointment.locations);
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

    return service;
});
