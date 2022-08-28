// Dates Formatting Function
const date_formater = (date) => {
    date = String(date).split("T")[0].replaceAll("-", "/").split("/");
    let tmp = date[0]; date[0] = date[2]; date[2] = tmp; // switch order of year with day
    return date.join("/"); 
}

// Get Option Element Selected
const get_which_selected_option = (selection) => { // Get Option Element
    let options = selection.querySelectorAll("option");

    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            return options[i];
        } 
    }
}

// Get Aggregative ID
const get_aggregative_id = (select_elem) => {
    return Number(get_which_selected_option(select_elem).id);
}

// Get Aggregative Name
const get_aggregative_name = (select_elem) => {
    return get_which_selected_option(select_elem).getAttribute("name");
}

// Get Aggregative ID (For Unassign Function)
const get_aggregative_id_for_unassign = (aggregative_name, aggregative_type) => {
    return Number(document.querySelector("select[aggregative-type='" + aggregative_type + "'] option[name='" + aggregative_name.trim() + "']").id);
}

// Set Assign User Aux Option (Two Dashes "--" Option) Disabled Status
const set_aux_aggregative_option_disabled_status = (status, event) => {
    event.target.querySelector("option[id*='TV-INF'][id*='aux-option']").disabled = status;
}

// Check If User Is Creator Of The Ticket Or Admin (If Not, He / She Is Not Legit To Assign Users Or Delete)
const is_user_legit_max_strict = (userData, ticket_creator) => {
    if ( (userData.id === ticket_creator) || (userData.user_power === 4) ) {
        return true;
    } else {
        return false;
    }
}

// Displays Assign Or Unassign Error Messages Due To Lack Of Power
const display_assignment_legitimacy_error = () => {
    let error_elem = document.querySelector("#TV-aggregatives-legitimacy-error-direct-container");

    error_elem.setAttribute("status", "on");

    setTimeout(() => {
        error_elem.setAttribute("status", "off");
    }, 2500);
}

// Generate Update Request URL For Assign
const gen_assign_req_url = (aggregative_type) => {
    return aggregative_type === "group" ? "/tickets/update/single/ticket_groups/set" : "/tickets/update/single/assigneds/set";
}

// Generate Update Request URL For Unassign
const gen_unassign_req_url = (aggregative_type) => {
    return aggregative_type === "group" ? "/tickets/update/single/ticket_groups/delete" : "/tickets/update/single/assigneds/delete";
}

// Is Aggregative Already Set
const is_aggregative_already_set = (aggregative_name, aggregatives_utils, aggregative_type) => {
    let data_array_to_be_checked = aggregative_type === "group" ? aggregatives_utils.groups : aggregatives_utils.assigneds;
    return data_array_to_be_checked.includes(aggregative_name);
}

// Update Aggregative State For Assigning
const update_aggregative_state_with_added = (aggregative_name, aggregatives_utils, aggregative_type) => {
    if ( aggregative_type === "group" ) {
        aggregatives_utils.updateGroups([...aggregatives_utils.groups, aggregative_name]);
    } else {
        aggregatives_utils.updateAssigneds([...aggregatives_utils.assigneds, aggregative_name]);
    }
}

// Update Aggregative State For Unassigning
const update_aggregative_state_with_removed = (aggregative_name, aggregatives_utils, aggregative_type) => {
    let groups          = aggregatives_utils.groups;
    let assigneds       = aggregatives_utils.assigneds;
    let updateGroups    = aggregatives_utils.updateGroups;
    let updateAssigneds = aggregatives_utils.updateAssigneds;

    if ( aggregative_type === "group" ) {
        updateGroups(groups.filter((group) => { return group !== aggregative_name }));
    } else {
        updateAssigneds(assigneds.filter((assigned) => { return assigned !== aggregative_name }));
    }
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
    is_user_legit_max_strict:                   is_user_legit_max_strict,
    display_assignment_legitimacy_error:        display_assignment_legitimacy_error
};

export default AF;