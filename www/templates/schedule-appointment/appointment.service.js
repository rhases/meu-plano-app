appServices.factory('appointmentService', function (specialtiesService) {

    var service = {

        appointment: {
            specialty: '',
            days: [ {label: 'segunda-feira', checked: false},
                    {label: 'terça-feira', checked: false},
                    {label: 'quarta-feira', checked: false},
                    {label: 'quinta-feira', checked: false},
                    {label: 'sexta-feira', checked: false},
                    {label: 'sábado', checked: false},
                    {label: 'domingo', checked: false}
                ]
        }

    }

    return service;
});
