// Returns Selected Option From A Selected Elem (Considering Called From A Handler)
const get_selected_option = (event) => {
    return event.target.options[event.target.selectedIndex];
}

// Get Group Name
const get_group_name = (event) => {
    let elem = event.target.tagName === "SELECT" ? get_selected_option(event) : event.target;

    return elem.getAttribute("group-name");
}

// Get Group ID
const get_group_id = (event) => {
    let elem = event.target.tagName === "SELECT" ? get_selected_option(event) : event.target;

    return elem.getAttribute("group-id");
}

// Check If Group To Be Deleted Is Already Added
const is_group_already_present = (groupsToBeDeleted, group_to_be_deleted) => {
    if ( JSON.stringify(groupsToBeDeleted).includes(JSON.stringify(group_to_be_deleted)) ) {
        return true;
    } else {
        return false;
    }
}

// Disables The Aux Option From The Selection ("--") (Receives Boolean)
const set_aux_option_disabled_status = (status) => {
    document.querySelector("#PFL-MG-delete-group-direct-container select option[group-name='aux']").disabled = status;
}

// Set Loading Icon Status
const set_loading_icon_status = (which, status) => {
    document.querySelector(".PFL-MG-loading-gif[which='" + which + "']").setAttribute("status", status);
}

// Display Success Gif
const display_success_feedback_icon = (which) => {
    let success_icon = document.querySelector(".PFL-MG-success-gif[which='" + which + "']");

    success_icon.setAttribute("status", "on");

    setTimeout(() => {
        success_icon.setAttribute("status", "off");
    }, 800);
}

module.exports = {
    get_selected_option:           get_selected_option,
    get_group_name:                get_group_name,
    get_group_id:                  get_group_id,
    is_group_already_present:      is_group_already_present,
    set_aux_option_disabled_status:       set_aux_option_disabled_status,
    set_loading_icon_status:       set_loading_icon_status,
    display_success_feedback_icon: display_success_feedback_icon
};