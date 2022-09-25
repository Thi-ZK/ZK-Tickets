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
const is_aggregative_already_set = (data, aggregatives_utils) => {
    let data_array_to_be_checked = data.aggregative_type === "group" ? aggregatives_utils.groups : aggregatives_utils.assigneds;
    return data_array_to_be_checked.includes(data.aggregative_name);
}

// Update Aggregative State For Assigning
const update_aggregative_state_with_added = (data, aggregatives_utils) => {
    if ( data.aggregative_type === "group" ) {
        aggregatives_utils.updateGroups([...aggregatives_utils.groups, data.aggregative_name]);
    } else {
        aggregatives_utils.updateAssigneds([...aggregatives_utils.assigneds, data.aggregative_name]);
    }

    window.__was_ticket_interacted = true;
}

// Update Aggregative State For Unassigning
const update_aggregative_state_with_removed = (data, aggregatives_utils) => {
    let groups          = aggregatives_utils.groups;
    let assigneds       = aggregatives_utils.assigneds;
    let updateGroups    = aggregatives_utils.updateGroups;
    let updateAssigneds = aggregatives_utils.updateAssigneds;

    if ( data.aggregative_type === "group" ) {
        updateGroups(groups.filter((group) => { return group !== data.aggregative_name }));
    } else {
        updateAssigneds(assigneds.filter((assigned) => { return assigned !== data.aggregative_name }));
    }

    window.__was_ticket_interacted = true;
}

// Generate Aggregative Names Text (Checks For Singular Or Plural Text, Ex: "Assumer" or "Assumers") - Returns String
const generate_text_for_aggregative_names = (agg_data, which_aggregative, texts) => {
    return agg_data.ticket_data[which_aggregative + "_names"].length > 1 ? texts[which_aggregative + "_plural"] : texts[which_aggregative];
}

// Get Aggregative Totals To Be Used (aggregatives_utils.groups or aggregatives_utils.assigneds) - Returns Array
const get_aggregative_blocks = (which_aggregative, agg_data) => {
    return which_aggregative === "groups" ? agg_data.aggregatives_utils.groups : agg_data.aggregatives_utils.assigneds;
}

// Get All Aggregative Names (For Selectors) - Returns Array
const get_all_aggregative_names = (which_aggregative, aggregatives_utils) => {
    if ( which_aggregative !== "groups" ) {
        return Object.values(aggregatives_utils.usersNamesWithIds);
    } else {
        let groups_names = [];

        aggregatives_utils.ticketGroups.forEach((group) => {
            groups_names.push(group.name);
        });

        return groups_names;
    }
}

// Get All Aggregative IDs (For Selectors) - Returns Array
const get_all_aggregative_ids = (which_aggregative, aggregatives_utils) => {
    if ( which_aggregative !== "groups" ) {
        return Object.keys(aggregatives_utils.usersNamesWithIds);
    } else {
        let groups_ids = [];

        aggregatives_utils.ticketGroups.forEach((group) => {
            groups_ids.push(group.id);
        });

        return groups_ids;
    }
}

// Generate Data Object For Unassign Aggregative Function - Returns Object
const generate_data_obj_for_unassign_aggregative = (event, agg_data) => {
    let data = {
        aggregative_id:       null,
        aggregative_name:     event.target.innerText,
        aggregative_type:     event.target.getAttribute("aggregative-type"),
        ticket_creator:       agg_data.ticket_data.creator,
        ticket_creator_name:  agg_data.ticket_data.creator_name,
        ticket_id:            agg_data.ticket_data.id,
        ticket_related_users: agg_data.ticket_data.related_users
    }
    data["aggregative_id"] = get_aggregative_id_for_unassign(data);

    return data;
}

// Generate Data Object For Assign Aggregative Function
const generate_data_obj_for_assign_aggregative = (event, agg_data) => {
    return {
        aggregative_id:       get_aggregative_id(event.target),
        aggregative_name:     get_aggregative_name(event.target),
        aggregative_type:     event.target.getAttribute("aggregative-type"),
        ticket_id:            agg_data.ticket_data.id,
        ticket_creator:       agg_data.ticket_data.creator,
        ticket_related_users: agg_data.ticket_data.related_users
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
    update_aggregative_state_with_removed:      update_aggregative_state_with_removed,
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