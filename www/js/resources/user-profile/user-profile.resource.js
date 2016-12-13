'use strict';
angular.module('starter')
    .factory('UserProfile', function($resource, ANS_WS_URI, $q) {
        return $resource(ANS_WS_URI + 'user-profiles/', null, {
            'update': {
                url: ANS_WS_URI + 'user-profiles/:id',
                method:'PUT'
            }
        });

		// modelo
        // {
        // 	_id: { type: String, required: true }, // email
        // 	state: {type: String, lowercase: true},
        // 	city: {type: String, lowercase: true},
        //
        // 	name: { type: String },
        // 	birthdate { type: Date },
        //
        // 	healthPlan: { type: HealthPlanIdSchema, ref: 'HealthPlan' },
        // 	healthPlanCard: { type: String }
        // }
    });
