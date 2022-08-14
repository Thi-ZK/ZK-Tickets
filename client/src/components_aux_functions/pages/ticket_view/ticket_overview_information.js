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
const get_aggregative_id = (option_elem) => {
    return Number(get_which_selected_option(option_elem).id);
}

// Get Aggregative Name
const get_aggregative_name = (option_elem) => {
    return get_which_selected_option(option_elem).getAttribute("name");
}

// Set Assign User Aux Option (Two Dashes "--" Option) Disabled Status (Receives Boolean & String ("groups" or "assigneds"))
const set_aux_aggregative_option_disabled_status = (status, event) => {
    event.target.querySelector("option[id*='TV-INF'][id*='aux-option']").disabled = status;
}

// Checks If Aggregative Is Already Set (Already An Assigned User Or Assigned Group) (Params Are Not IDs, But Names))
const is_aggregative_already_set = (aggregative_name, event, assigneds, groups) => {
    let which_aggregative_type = event.target.id.includes("group") ? "groups" : "assigneds";

    if ( which_aggregative_type === "groups" ) {
        return groups.includes(aggregative_name);
    } else {
        return assigneds.includes(aggregative_name);
    }
}

// Generates The URL For The Request To Update The Ticket With The New Aggregative
const get_ticket_update_url = (select_elem_interacted) => {
    if ( select_elem_interacted.id.includes("group") ) {
        return "/tickets/update/single/assigneds/set";
    } else {
        return "/tickets/update/single/assigneds/set";
    }
}

// Generates Data Object For The Axios Ticket Update Request With Aggregative To Be Added / Removed
const generate_ticket_update_data_obj = (aggregative_name, aggregative_id, ticket_id, select_elem_interacted) => {
    let final_data_obj    = {};
    let is_group_related  = select_elem_interacted.id.includes("group");

    final_data_obj[is_group_related ? "group_id" : "assigned_id"]     = aggregative_id;
    final_data_obj[is_group_related ? "group_name" : "assigned_name"] = aggregative_name;
    final_data_obj["ticket_id"] = ticket_id;

    return final_data_obj;
}

// Update New Aggregative State (action Param Expects Two Possibilities => "added" or "removed" )
const update_aggregative_state = (action, aggregatives_utils, aggregative_name, select_elem_interacted) => {
    let assigneds         = aggregatives_utils.assigneds;
    let updateAssigneds   = aggregatives_utils.updateAssigneds;
    let groups            = aggregatives_utils.groups;
    let updateGroups      = aggregatives_utils.updateGroups;
    let is_group_related  = select_elem_interacted.id.includes("group");

    if ( action === "added" ) {
        is_group_related ? updateGroups([...groups, aggregative_name]) : updateAssigneds([...assigneds, aggregative_name]);
    } else {
        // TBD
    }
}

module.exports = {
    date_formater:                              date_formater,
    get_which_selected_option:                  get_which_selected_option,
    get_aggregative_id:                         get_aggregative_id,
    get_aggregative_name:                       get_aggregative_name,
    set_aux_aggregative_option_disabled_status: set_aux_aggregative_option_disabled_status,
    is_aggregative_already_set:                 is_aggregative_already_set,
    get_ticket_update_url:                      get_ticket_update_url,
    generate_ticket_update_data_obj:            generate_ticket_update_data_obj,
    update_aggregative_state:                   update_aggregative_state
};