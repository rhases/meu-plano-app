angular.module('starter').factory('transformUtils', function(lodash) {
    var service = {};

    /***
    *@param {String} specialityCod
    *@return {String} specialityLabel
    ***/
    service.getMedicalSpecialtyLabelByCod = function(specialityCod) {
        var speciality = medicalInfos.getByCod(String(specialityCod));

        if (!speciality)
	        return;

        return speciality.label;
    }

    /***
    *@param {String} stateCod
    *@param {String} specialityCod
    *@return {String} cityLabel
    ***/
    service.getCityLabelByCod = function(stateCod, cityCod) {
        var city = brazilianInfos.getCityByCod(String(stateCod), String(cityCod));

        if (!city)
            return;

        return city.label;
    }

    /***
    *@param {String} weekDayCod
    *@return {String} weekDayLabel
    ***/
    service.getWeekdayLabelByCod = function(weekDayCod) {
        var weekDay = schedulerInfos.getWeekdayByCod(String(weekDayCod));

        if (!weekDay)
            return;

        return weekDay.label;
    }

    /***
    *@param {String} periodCod
    *@return {String} periodLabel
    ***/
    service.getPeriodLabelByCod = function(periodCod) {
    	var index = lodash.findIndex(schedulerInfos.period, function(s) {
            return s.cod.toLowerCase() === periodCod.toLowerCase();
        });

    	if (index >= 0)
    		return schedulerInfos.period[index].label;

    	return undefined;
    }

    return service;
});
