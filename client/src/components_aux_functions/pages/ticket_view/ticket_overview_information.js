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

// Get Assigned ID
const get_aggregative_id = (option_elem) => {
    return Number(get_which_selected_option(option_elem).id);
}

// Get Assigned Name
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

module.exports = {
    date_formater:                              date_formater,
    get_which_selected_option:                  get_which_selected_option,
    get_aggregative_id:                         get_aggregative_id,
    get_aggregative_name:                       get_aggregative_name,
    set_aux_aggregative_option_disabled_status: set_aux_aggregative_option_disabled_status,
    is_aggregative_already_set:                 is_aggregative_already_set
};