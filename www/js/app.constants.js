angular.module("starter")
	.constant("SCHEDULER_HOST", "http://scheduler.api.rhases.com.br/")
	// .constant("SCHEDULER_HOST", "http://localhost:9002/")
    .constant("AUTH_SERVER", "http://auth.api.rhases.com.br/")
    .constant("APPOINTMENT_STATUS", {
        SCHEDULED: "SCHEDULED",
        ACCEPTED: "ACCEPTED",
        REFUSED: "REFUSED",
        CONFIRMED: "CONFIRMED",
        CANCELED: "CANCELED",
        RESCHEDULED: "RESCHEDULED"
    })
    .constant("APPOINTMENT_REQUEST_STATUS", {
        NEW: "NEW",
        SCHEDULED: "SCHEDULED",
        CANCELED: "CANCELED",
        NOT_POSSIBLE: "NOT_POSSIBLE"
    })
    .constant('GA_TRACKING_ID', 'UA-51103102-3');
