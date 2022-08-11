// Generate Response Object - "error" Is Boolean, "data" Is Object, "req_path" Is Text String Of Request Path
const generate_response_object = (error, data, req_original_path) => {
	let res_obj = {
		data: data,
		success: true,
		requested: what_was_requested_obj_map[req_original_path] || req_original_path,
        error: null
	};

    if ( error ) {
        res_obj.success = false;
        res_obj.error = error;
    }

	return res_obj;
}

// Object Map Of Requests From Client To Know What Was Requested
const what_was_requested_obj_map = {
    "/tickets/get/all":                                 "All Tickets Data",
    "/users/get/piece/all_users":                       "All Ticket Names With IDs",
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
    "/login/auth":                                      "Authenticate User"
}; 

module.exports = {
    generate_response_object: generate_response_object,
    what_was_requested_obj_map: what_was_requested_obj_map
};