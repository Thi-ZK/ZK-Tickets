const http = require('http');

// Generate Response Object - "error" Is Boolean, "data" Is Object, "req_path" Is Text String Of Request Path
const generate_response_object = (error, data, req_original_path) => {
	let res_obj = {
		data:      data,
		success:   true,
		requested: what_was_requested_obj_map[req_original_path] || req_original_path,
        error:     null
	};

    if ( error ) {
        res_obj["success"] = false;
        res_obj["error"]   = String(error);
    }

	return res_obj;
}

// Generate Random ID | Format => <Timestamp>.<Random Number>
const generate_random_id = () => {
    return String(Date.now()) + "." + String(Math.floor(Math.random() * 100000));
}

// Object Map Of Requests From Client To Know What Was Requested
const what_was_requested_obj_map = {
    "/tickets/get/all":                                 "All Tickets Data",
    "/users/get/piece/all_users":                       "All Users Names With IDs",
    "/users/get/single/current":                        "Authenticated User Data",
    "/tickets/update/single/messages/set":              "Set Message In Single Ticket",
    "/tickets/update/single/messages/delete":           "Kill Message In Single Ticket",
    "/tickets/update/single/status":                    "Set New Status In Single Ticket",
    "/tickets/update/single/assigneds/set":             "Set Assigned To Single Ticket",
    "/tickets/update/single/assigneds/delete":          "Remove Assigned From Single Ticket",
    "/users/update/current/preferred_language":         "Set New User Preferred Language",
    "/users/update/current/preferred_brightness_theme": "Set New User Preferred Brightness Theme",
    "/tickets/create/single":                           "Create New Ticket",
    "/ticket_groups/get/all":                           "All Ticket Groups Data",
    "/ticket_groups/get/piece/all_groups":              "All Ticket Groups Names With IDs",
    "/tickets/update/single/ticket_groups/set":         "Set Ticket Group To Single Ticket",
    "/tickets/update/single/ticket_groups/delete":      "Remove Ticket Group From Single Ticket",
    "/login/auth":                                      "Authenticate User",
    "/login/password_recovery":                         "Recover User Password"
}; 

// Array Containing All Possible Server Routes Paths (Used In Middleware Check Of Logged In Status (server.js))
const all_server_routes_paths = Object.keys(what_was_requested_obj_map);

// Prevents Heroku From Sleeping - Makes A Simple Light Request Every X Minutes To Own Website
const prevent_heroku_from_sleeping = (minutes) => {
    setInterval(() => {
        http.get("http://zktickets.herokuapp.com/imgs/headers/arrow_down.png");
    }, 1000 * 60 * minutes);
}

module.exports = {
    generate_response_object:     generate_response_object,
    what_was_requested_obj_map:   what_was_requested_obj_map,
    generate_random_id:           generate_random_id,
    all_server_routes_paths:      all_server_routes_paths,
    prevent_heroku_from_sleeping: prevent_heroku_from_sleeping
};