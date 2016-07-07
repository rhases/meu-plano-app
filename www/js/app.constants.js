angular.module("starter")
    .constant("SCHEDULER_HOST", "http://scheduler.api.rhases.com.br")
    .constant("APPOINTMENT_STATUS", {
        SCHEDULED: "SCHEDULED",
        ACCEPTED: "ACCEPTED",
        REFUSED: "REFUSED",
        CONFIRMED: "CONFIRMED",
        CANCELED: "CANCELED",
        RESCHEDULED: "RESCHEDULED"
    })
    .constant('GA_TRACKING_ID', 'UA-51103102-3');
