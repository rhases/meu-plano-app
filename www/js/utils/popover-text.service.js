angular.module('starter').factory('popoverText', function(lodash) {
    var service = {};

    service.getMedicalSpecialtyLabelByCod = function(specialityCod) {
        var speciality = medicalInfos.getByCod(String(specialityCod));

        if (!speciality)
	        return;

        return speciality.label;
    }

    service.coverageTypeText = function(coverageType) {
        if(coverageType === 'ambulatorial')
            return 'Consultas médicas em clínicas ou consultórios, exames, tratamentos e demais procedimentos ambulatoriais. Os atendimentos de emergência estão limitados até as primeiras 12 horas do atendimento. <br /> <br /> Não cobre internação.';
        if(coverageType === 'hospitalar')
            return 'Cirurgia e Internação';
        if(coverageType === 'obstetricia')
            return 'Parto';
        if(coverageType === 'odontologia')
            return 'Odontologia';
        return '';
    }

    return service;
});
