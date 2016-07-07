appServices.factory('scheduleAppointmentService', function (specialtiesService) {

    var service = {

        appointment: {
            specialty: '',
            days: [
                    {label: 'segunda-feira', checked: false},
                    {label: 'terça-feira', checked: false},
                    {label: 'quarta-feira', checked: false},
                    {label: 'quinta-feira', checked: false},
                    {label: 'sexta-feira', checked: false},
                    {label: 'sábado', checked: false},
                    {label: 'domingo', checked: false}
                ],
            periods: [
                    {label: 'Início da manhã (7h-10h)', checked: false},
                    {label: 'Fim da manhã (10h-12h)', checked: false},
                    {label: 'Horário do almoço (12h-14h)', checked: false},
                    {label: 'Início da tarde (14h-16h)', checked: false},
                    {label: 'Fim da tarde (16h-18h)', checked: false},
                    {label: 'Início da noite (18h-20h)', checked: false}
            ],
            locations: [
                    {label: 'Asa Norte', checked: false},
                    {label: 'Asa Sul', checked: false},
                    {label: 'Taguatinga', checked: false},
            ]
        }
    }

    service.getSelectedDays = function() {
        return retrieveCheckedFromList(service.appointment.days);
    }

    function retrieveCheckedFromList(list) {
        return list.filter(function(element) { return element.checked });
    }

    service.getSelectedPeriods = function() {
        return retrieveCheckedFromList(service.appointment.periods);
    }

    service.getSelectedLocations = function() {
        return retrieveCheckedFromList(service.appointment.locations);
    }

    return service;
});
