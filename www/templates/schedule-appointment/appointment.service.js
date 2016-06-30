appServices.factory('appointmentService', function (specialtiesService) {

    var service = {

        appointment: {
            // FIXME: deveria inicializar o specialty.
            // no controller chega como vazio
            specialty: specialtiesService.getAll()[0],
            days: []
        }

    }

    return service;
});
