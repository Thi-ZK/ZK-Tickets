// Responsible To Populate The Options From The Selections - Create Options Map Object
const generate_options_map_obj = ( usersNamesWithIds, ticketGroups ) => {
    let priorities   = ["Standard", "Very Low", "Low", "High", "Very High", "Urgent!"];
    let statuses     = ["Open", "Blocked", "Homologation", "Concluded"];
    let users_names  = Object.values(usersNamesWithIds || {});
    let groups_names = Object.values(ticketGroups || {});
    let options_map  = {
        "groups": groups_names,
        "assigneds": users_names,
        "priority": priorities,
        "status": statuses
    };

    return options_map;
}

// Retrieve IDs Of Each Option Mapped With Their Names Identification - Used For Aggregatives (HTML ID)
const generate_options_id_map_obj = ( usersNamesWithIds, ticketGroups ) => {
    let priorities   = ["", "", "", "", "", ""];
    let statuses     = ["", "", "", ""];
    let users_names  = Object.keys(usersNamesWithIds || {});
    let groups_names = Object.keys(ticketGroups || {});
    let options_map  = {
        "groups": groups_names,
        "assigneds": users_names,
        "priority": priorities,
        "status": statuses
    };

    return options_map;
}

// Custom Text Inputs Handler - Meant For Updating Visibility Status
const update_custom_text_input_appearence = (event) => {
    let new_custom_text_input_status = (event.target.className === "TC-SP-new-option-radio-input") ? "on" : "off";
    document.querySelector(".TC-SP-new-option-text-input").setAttribute("status", new_custom_text_input_status);
}

// Disables The "--" Filling Option Of The Correspondant Aggregative Select Element
const disable_select_aux_value_filler = (event) => {
    event.target.querySelector(".TC-SP-aux-filling-option").disabled = true;
}

// Returns Boolean For The Check Of The Selection Piece Being An Aggregative (It Could Be A Non Aggregative, Ex: status or priority)
const is_selection_piece_an_aggregative = (current_piece) => {
    return (current_piece === "assigneds") || (current_piece === "groups");
}

// Returns Selected Option From A Selected Elem (Considering Called From A Handler)
const get_selected_option = (event) => {
    return event.target.options[event.target.selectedIndex];
}

module.exports = {
    generate_options_map_obj:            generate_options_map_obj,
    generate_options_id_map_obj:         generate_options_id_map_obj,
    update_custom_text_input_appearence: update_custom_text_input_appearence,
    disable_select_aux_value_filler:     disable_select_aux_value_filler,
    is_selection_piece_an_aggregative:   is_selection_piece_an_aggregative,
    get_selected_option:                 get_selected_option
};