angular.module('starter').factory('popoverText', function(lodash) {
    var service = {};

    service.ansQualificationText = function() {
        return 'A avaliação da Agência Nacional de Saúde Suplementar (ANS) vai de 0 (pior) a 1  (melhor). <br /> <br />Avaliação retirada do Índice de Desempenho das Operadoras (IDSS) 2016(Ano-base 2015).';
    }

    service.coverageTypeText = function(coverageType) {
        if(coverageType === 'ambulatorial')
            return 'Consultas médicas em clínicas ou consultórios, exames, tratamentos e demais procedimentos ambulatoriais. Os atendimentos de emergência estão limitados até as primeiras 12 horas do atendimento.';
        if(coverageType === 'hospitalar')
            return 'Internação hospitalar sem limite de tempo. <br /> <br />Não cobre partos.';
        if(coverageType === 'obstetricia')
            return 'Parto e cobertura assistencial ao recém-nascido filho natural ou adotivo, ou do dependente, durante os primeiros 30 dias após o parto.';
        if(coverageType === 'odontologia')
            return 'Consultas, exames, atendimentos de urgência e emergência odontológicos, exames auxiliares ou complementares, tratamentos e demais procedimentos.';
        return '';
    }

    service.moderatorFactorText = function() {
        return 'A coparticipação é uma parcela de pagamento, além da mensalidade, para custear parte da despesa de um procedimento. <br /> <br />O valor sempre será menor que o custo integral do procedimento.';
    }

    return service;
});
