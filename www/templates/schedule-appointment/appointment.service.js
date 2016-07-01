appServices.factory('appointmentService', function (specialtiesService) {

    var service = {

        appointment: {
            specialty: '',
            days: []
        }

    }

    return service;
});
