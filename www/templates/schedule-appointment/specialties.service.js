appServices.factory('specialtiesService', function () {
    var service = {

        getAll: function() {
            return ['Cardiologista', 'Dermatologista', 'Urologista', 'Oftamologista'];
        }

    }

    return service;
});
