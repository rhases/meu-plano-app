'use strict';

// Filter to plan tables
appControllers.filter('showOnlyIfStatusIs', function () {
	return function(list, status) {
		if (!list)
			return list;
		if (!status || status == 0)
			return list;

		return list.filter(function(value) {
			return value.status == status;
		});
	};
});
