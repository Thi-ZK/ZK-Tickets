// Dates Formatting Function - Returns String
const date_formater = (date) => {
    date = String(date).split("T")[0].replaceAll("-", "/").split("/");
    let tmp = date[0]; date[0] = date[2]; date[2] = tmp; // switch order of year with day
    return date.join("/"); 
}

// Get Option Element Selected - Returns HTML Element
const get_which_selected_option = (selection) => { // Get Option Element
    let options = selection.querySelectorAll("option");

    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            return options[i];
        } 
    }
}

// Get Aggregative ID - Returns Number
const get_aggregative_id = (select_elem) => {
    return Number(get_which_selected_option(select_elem).id);
}

// Get Aggregative Name - Returns String
const get_aggregative_name = (select_elem) => {
    return get_which_selected_option(select_elem).getAttribute("name");
}

// Get Aggregative ID (For Unassign Function) - Returns Number
const get_aggregative_id_for_unassign = (data) => {
    return Number(document.querySelector("select[aggregative-type='" + data.aggregative_type + "'] option[name='" + data.aggregative_name.trim() + "']").id);
}

// Set Assign User Aux Option (Two Dashes "--" Option) Disabled Status
const set_aux_aggregative_option_disabled_status = (status, event) => {
    event.target.querySelector("option[id*='TV-INF'][id*='aux-option']").disabled = status;
}

// Check If User Is Legit To Perform Desired Action - Returns Boolean
const is_user_legit = (userData, data, strictness) => {
    if ( userData.user_power < 3 ) {
        return false;
    }

    // In Case Group Was Attempted To Be Unassigned, Disconsider Second Check (Bcz User & Group Could Happen To Have Same ID, Then The Check Would Wrongly Pass)
    let aggregative_id       = data.aggregative_type === "group" ? null : data.aggregative_id;
    let ticket_related_users = data.ticket_related_users;

    if ( strictness === "max_strict" ) { // Disconsider Second Check
        aggregative_id = null;
    }

    if ( strictness.includes("strict") ) { // Disconsider First Check
        ticket_related_users = [];
    }
    
    if ( (ticket_related_users.includes(userData.id)) || (userData.id === data.ticket_creator) || (userData.id === aggregative_id) ||  (userData.user_power === 4) ) {
        return true;
    } else {
        return false;
    }
}

// Displays Assign Or Unassign Error Messages Due To Lack Of Power
const display_legitimacy_error = () => {
    let error_elem = document.querySelector("#TV-aggregatives-legitimacy-error-direct-container");

    error_elem.setAttribute("status", "on");

    setTimeout(() => {
        error_elem.setAttribute("status", "off");
    }, 2500);
}

// Generate Update Request URL For Assign - Returns String
const gen_assign_req_url = (aggregative_type) => {
    return aggregative_type === "group" ? "/tickets/update/single/ticket_groups/set" : "/tickets/update/single/assigneds/set";
}

// Generate Update Request URL For Unassign - Returns String
const gen_unassign_req_url = (aggregative_type) => {
    return aggregative_type === "group" ? "/tickets/update/single/ticket_groups/delete" : "/tickets/update/single/assigneds/delete";
}

// Is Aggregative Already Set - Returns Boolean
const is_aggregative_already_set = (data, ticketData) => {
    let data_array_to_be_checked = data.aggregative_type === "group" ? ticketData.groups : ticketData.assumers;

    return data_array_to_be_checked.includes(data.aggregative_id);
}

// Update Aggregative State For Assigning
const update_aggregative_state_with_added = (data, updateTicketData, ticketData) => {
    let ticket_data = JSON.parse(JSON.stringify(ticketData));
    
    if ( data.aggregative_type === "group" ) {
        ticket_data.groups.push(data.aggregative_id);
        ticket_data.groups_names.push(data.aggregative_name);
    } else {
        ticket_data.assumers.push(data.aggregative_id);
        ticket_data.assumers_names.push(data.aggregative_name);
    }

    updateTicketData(ticket_data);
}

// Update Aggregative State For Unassigning
const update_ticket_data_state_with_removed = (data, ticketData, updateTicketData) => {
    let ticket_data = JSON.parse(JSON.stringify(ticketData));
   
    if ( data.aggregative_type === "group" ) {
        ticket_data.groups       = ticket_data.groups.filter(group_id => group_id !== data.aggregative_id);
        ticket_data.groups_names = ticket_data.groups_names.filter(group_name => group_name !== data.aggregative_name);
    } else {
        ticket_data.assumers       = ticket_data.assumers.filter(assumer_id => assumer_id !== data.aggregative_id);
        ticket_data.assumers_names = ticket_data.assumers_names.filter(assumer_name => assumer_name !== data.aggregative_name);
    }
    
    updateTicketData(ticket_data);
}

// Generate Aggregative Names Text (Checks For Singular Or Plural Text, Ex: "Assumer" or "Assumers") - Returns String
const generate_text_for_aggregative_names = (ticketData, which_aggregative, texts) => {
    return ticketData[which_aggregative + "_names"].length > 1 ? texts[which_aggregative + "_plural"] : texts[which_aggregative];
}

// Get Aggregative Totals To Be Used - Returns Array
const get_aggregative_blocks = (which_aggregative, ticketData) => {
    return which_aggregative === "groups" ? ticketData.groups_names : ticketData.assumers_names;
}

// Get All Aggregative Names (For Selectors) - Returns Array
const get_all_aggregative_names = (which_aggregative, all_population_data) => {
    if ( which_aggregative !== "groups" ) {
        return Object.values(all_population_data.usersNamesWithIds);
    } else {
        let groups_names = [];

        all_population_data.ticketGroups.forEach((group) => {
            groups_names.push(group.name);
        });

        return groups_names;
    }
}

// Get All Aggregative IDs (For Selectors) - Returns Array
const get_all_aggregative_ids = (which_aggregative, all_population_data) => {
    if ( which_aggregative !== "groups" ) {
        return Object.keys(all_population_data.usersNamesWithIds);
    } else {
        let groups_ids = [];

        all_population_data.ticketGroups.forEach((group) => {
            groups_ids.push(group.id);
        });

        return groups_ids;
    }
}

// Generate Data Object For Unassign Aggregative Function - Returns Object
const generate_data_obj_for_unassign_aggregative = (event, ticketData) => {
    let data = {
        aggregative_id:       null,
        aggregative_name:     event.target.innerText,
        aggregative_type:     event.target.getAttribute("aggregative-type"),
        ticket_creator:       ticketData.creator,
        ticket_creator_name:  ticketData.creator_name,
        ticket_id:            ticketData.id,
        ticket_related_users: ticketData.related_users
    }
    data["aggregative_id"] = get_aggregative_id_for_unassign(data);

    return data;
}

// Generate Data Object For Assign Aggregative Function
const generate_data_obj_for_assign_aggregative = (event, ticketData) => {
    return {
        aggregative_id:       get_aggregative_id(event.target),
        aggregative_name:     get_aggregative_name(event.target),
        aggregative_type:     event.target.getAttribute("aggregative-type"),
        ticket_id:            ticketData.id,
        ticket_creator:       ticketData.creator,
        ticket_related_users: ticketData.related_users
    };
}

const AF = {
    date_formater:                              date_formater,
    get_which_selected_option:                  get_which_selected_option,
    get_aggregative_id:                         get_aggregative_id,
    get_aggregative_name:                       get_aggregative_name,
    set_aux_aggregative_option_disabled_status: set_aux_aggregative_option_disabled_status,
    gen_assign_req_url:                         gen_assign_req_url,
    update_aggregative_state_with_added:        update_aggregative_state_with_added,
    update_ticket_data_state_with_removed:      update_ticket_data_state_with_removed,
    is_aggregative_already_set:                 is_aggregative_already_set,
    get_aggregative_id_for_unassign:            get_aggregative_id_for_unassign,
    gen_unassign_req_url:                       gen_unassign_req_url,
    is_user_legit:                              is_user_legit,
    display_legitimacy_error:                   display_legitimacy_error,
    generate_text_for_aggregative_names:        generate_text_for_aggregative_names,
    get_aggregative_blocks:                     get_aggregative_blocks,
    generate_data_obj_for_unassign_aggregative: generate_data_obj_for_unassign_aggregative,
    generate_data_obj_for_assign_aggregative:   generate_data_obj_for_assign_aggregative,
    get_all_aggregative_names:                  get_all_aggregative_names,
    get_all_aggregative_ids:                    get_all_aggregative_ids
};

export default AF;