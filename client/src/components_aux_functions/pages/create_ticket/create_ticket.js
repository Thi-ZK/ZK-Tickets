// Ticket Creation Name Error Message Appearence Controller
const set_ticket_name_error_message_appearence = (status) => {
    document.querySelector("#TC-ticket-name-error-message").setAttribute("status", status);
}

// Ticket Creation Description Error Message Appearence Controller
const set_ticket_description_error_message_appearence = (status) => {
    document.querySelector("#TC-description-error-message").setAttribute("status", status);
}

// Ticket Creation Loading Icon Appearence Controller
const set_loading_icon_appearence = (status) => {
    let loading_icons = document.querySelectorAll(".TC-loading-gif");
    loading_icons[0].setAttribute("status", status);
    loading_icons[1].setAttribute("status", status);
}

// Ticket Creation Loading Icon Appearence Controller
const display_success_icon = () => {
    let success_icon = document.querySelectorAll(".TC-success-gif");
    success_icon[0].setAttribute("status", "on");
    success_icon[1].setAttribute("status", "on");
    setTimeout(() => {
        success_icon[0].setAttribute("status", "off");
        success_icon[1].setAttribute("status", "off");
    }, 1300);
}

// Function Below Used To Prevent User From Sending Many Requests
const set_disabled_status_on_ticket_creation_buttons = (status) => { // Receives Boolean
    let tickeat_creation_buttons = document.querySelectorAll(".TC-create-button-direct-container button"); // 2 Buttons
    tickeat_creation_buttons[0].disabled = status;
    tickeat_creation_buttons[1].disabled = status;
}

// source Param = From Groups or Assigneds (The Correspondent Variable)
// This Is Meant To Prevent Sending An Array As Ex: [","], In Case No Assigneds / Group Is Selected
const aggregatives_formatter = ( source, which_data_string ) => {
    let aggregative = source.getAttribute(which_data_string);
    return aggregative ? aggregative.split(",") : [];
}

// Reset All Fields
const reset_all_inputs = ( setValue ) => {
    let selections = document.querySelectorAll("select#assigneds, select#groups, select#priority, select#status");
    for ( let i = 0; i < selections.length; i++) {selections[i].selectedIndex = 0;}

    let aggregatives_reseters = document.querySelectorAll("input.TC-SP-reseter");
    aggregatives_reseters[0].click();
    aggregatives_reseters[1].click();

    document.querySelector("input#TC-ticket-name").value = "";
    document.querySelector("#TC-description-direct-container textarea").value = "";

    setValue(undefined);
}

// Assemble & Gather New Ticket Data 
const gather_new_ticket_data = () => {
    let assigneds_data_hidden_input = document.querySelector("input.TC-SP-assigneds");
    let groups_data_hidden_input    = document.querySelector("input.TC-SP-groups");
    let status   = document.querySelector("#TC-SP-status");
    let priority = document.querySelector("#TC-SP-priority");

    let new_ticket_data = {
        name:                document.querySelector("#TC-ticket-name").value,
        description:         document.querySelector("#TC-description-direct-container textarea").value,
        status:              status.options[status.selectedIndex].id,
        priority:            priority.options[priority.selectedIndex].id,
        related_users_names: aggregatives_formatter(assigneds_data_hidden_input, "aggregative_names"),
        groups_names:        aggregatives_formatter(groups_data_hidden_input, "aggregative_names"),
        assumers_names:      aggregatives_formatter(assigneds_data_hidden_input, "aggregative_names"),
        related_users_ids:   aggregatives_formatter(assigneds_data_hidden_input, "aggregative_ids").map((e) => {return Number(e)}),
        groups_ids:          aggregatives_formatter(groups_data_hidden_input, "aggregative_ids").map((e) => {return Number(e)}),
        assumers_ids:        aggregatives_formatter(assigneds_data_hidden_input, "aggregative_ids").map((e) => {return Number(e)})
    };

    return new_ticket_data;
}

// Generate New Ticket Object To Be Sent To Server
const generate_final_new_ticket = (new_ticket_data) => {
    return {
        name: new_ticket_data.name, // REQUIRED
        related_users: new_ticket_data.related_users_ids,
        related_users_names: new_ticket_data.related_users_names,
        groups: new_ticket_data.groups_ids,
        groups_names: new_ticket_data.groups_names,
        description: new_ticket_data.description,
        status: new_ticket_data.status, // REQUIRED
        assumers: new_ticket_data.assumers_ids,
        assumers_names: new_ticket_data.assumers_names,
        due_date: new Date(document.querySelector("#TC-due-date-chosen").innerText),
        priority: new_ticket_data.priority, // REQUIRED
        attachments: []
    };
}

module.exports = {
    // Meant For The Selection Pieces Inputs
	selection_piece_group: {type_of_piece: 'groups', allow_custom: true, is_aggregative: true},
    selection_piece_priority: {type_of_piece: 'priority', allow_custom: false, is_aggregative: false},
    selection_piece_assigneds: {type_of_piece: 'assigneds', allow_custom: false, is_aggregative: true},
    selection_piece_status: {type_of_piece: 'status', allow_custom: false, is_aggregative: false},

    set_ticket_name_error_message_appearence: set_ticket_name_error_message_appearence,
    set_ticket_description_error_message_appearence: set_ticket_description_error_message_appearence,
    set_loading_icon_appearence: set_loading_icon_appearence,
    display_success_icon: display_success_icon,
    set_disabled_status_on_ticket_creation_buttons: set_disabled_status_on_ticket_creation_buttons,
    aggregatives_formatter: aggregatives_formatter,
    reset_all_inputs: reset_all_inputs,
    gather_new_ticket_data: gather_new_ticket_data,
    generate_final_new_ticket: generate_final_new_ticket
};