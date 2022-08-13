// Dates Formatting Function
const date_formater = (date) => {
    date = String(date).split("T")[0].replaceAll("-", "/").split("/");
    let tmp = date[0]; date[0] = date[2]; date[2] = tmp; // switch order of year with day
    return date.join("/"); 
}

// Get Option Element Selected
const get_which_assigned_option = (selection) => { // Get Option Element
    let options = selection.querySelectorAll("option");

    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            return options[i];
        } 
    }
}

// Get Assigned ID
const get_assigned_id = (option_elem) => {
    return Number(get_which_assigned_option(option_elem).id);
}

// Get Assigned Name
const get_assigned_name = (option_elem) => {
    return get_which_assigned_option(option_elem).getAttribute("assigned-name");
}

// Set Assign User Aux Option (Two Dashes "--" Option) Disabled Status (Receives Boolean)
const should_disable_aux_assigned_option = (status) => {
    document.querySelector("#TV-INF-no-assigment-aux-option").disabled = status;
}

module.exports = {
    date_formater:                      date_formater,
    get_which_assigned_option:          get_which_assigned_option,
    get_assigned_id:                    get_assigned_id,
    get_assigned_name:                  get_assigned_name,
    should_disable_aux_assigned_option: should_disable_aux_assigned_option
};