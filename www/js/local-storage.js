appServices.factory('localStorage', function ($filter, $window) {
    return {
        // Get data from localStorage it will use data key for getting the data.
        // Parameter :
        // key = reference of object in localStorage.
        get: function (key) {
            return JSON.parse($window.localStorage[key] || "null");
        },

        // Add data to localStorage it will use data key
        // by input data key and value for setting data to localStorage.
        // Parameter :
        // key = reference of object in localStorage.
        // value = data that will store in localStorage.
        set: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },

				//Remove data from localStorage.
				remove: function (key) {
					$window.localStorage.removeItem(key);
				},

        //Remove all data from localStorage.
        removeAll: function () {
            $window.localStorage.clear();
        }

    };
});//End LocalStorage service.
