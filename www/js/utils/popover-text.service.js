angular.module('starter').factory('popoverText', function(lodash) {
    var service = {};

    service.coverageTypeText = function(coverageType) {
        if(coverageType === 'ambulatorial')
            return 'Consultas médicas em clínicas ou consultórios, exames, tratamentos e demais procedimentos ambulatoriais. Os atendimentos de emergência estão limitados até as primeiras 12 horas do atendimento. <br /> <br /> Não cobre internação.';
        if(coverageType === 'hospitalar')
            return 'Internação hospitalar sem limite de tempo. <br /> <br /> Não cobre partos.';
        if(coverageType === 'obstetricia')
            return 'Cobertura assistencial ao recém-nascido filho natural ou adotivo, ou do dependente, durante os primeiros 30 dias após o parto.';
        if(coverageType === 'odontologia')
            return 'Consultas, exames, atendimentos de urgência e emergência odontológicos, exames auxiliares ou complementares, tratamentos e demais procedimentos.';
        return '';
    }

    

    return service;
});
