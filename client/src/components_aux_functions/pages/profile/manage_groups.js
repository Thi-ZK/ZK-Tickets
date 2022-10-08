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

    return Number(elem.getAttribute("group-id"));
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

// Set Delete Groups Button Disabled Status
const set_delete_new_group_button_disabled_status = (status) => {
    document.querySelector("#PFL-MG-delete-group-direct-container button").disabled = (status === "disable") ? true : false;
} 

// Set Create Groups Button Disabled Status
const set_create_new_group_button_disabled_status = (status) => {
    document.querySelector("#PFL-MG-create-group-direct-container button").disabled = (status === "disable") ? true : false;
}

// Get Inputed New Group To Be Added
const get_new_typed_group = () => {
    return document.querySelector("#PFL-MG-create-group-direct-container input").value;
}

// Clean Add New Group Input
const clean_new_group_input = () => {
    document.querySelector("#PFL-MG-create-group-direct-container input").value = "";
} 

// Checks If New Group To Be Created Is Valid (Base Regex Check & Length)
const is_new_group_valid = (new_group) => {
    if ( (new_group.length <  34) && (/[0-9A-Za-z]{3,}/.test(new_group)) ) {
        return true;
    } else {
        return false;
    }
}

// Displays Unsuccessful Feedback Message For Creating New Group Bad Group Name
const display_new_group_error_msg = () => {
    let msg_elem = document.querySelector("#PFL-MG-create-group-error-message");

    msg_elem.setAttribute("status", "on");

    setTimeout(() => {
        msg_elem.setAttribute("status", "off");
    }, 2500);
}

// Checks If User Is Legit To Perform Action (Admin Or Group Creator)
const is_user_legit_max_strict = (userData, groupsToBeDeleted) => {
    if ( userData.user_power < 3 ) {
        return false;
    }

    let is_there_a_group_that_user_is_not_creator = false;
    
    groupsToBeDeleted.forEach((group) => {
        if ( group.creator !== userData.id ) {
            is_there_a_group_that_user_is_not_creator = true;
        }
    });

    if ( (userData.user_power === 4) || (!is_there_a_group_that_user_is_not_creator) ) {
        return true;
    } else {
        return false;
    }
}

// Checks If User Has Enough Power To Perform Action (Power > 2)
const is_user_legit_no_strict = (userData) => {
    if ( userData.user_power > 2 ) {
        return true;
    } else {
        return false;
    }
}

// Displays Legitimacy Error In Groups Deletion Attempt
const display_user_legitimacy_error_for_deletion = () => {
    let msg_elem = document.querySelector("#PFL-MG-delete-group-error-message");

    msg_elem.setAttribute("status", "on");

    setTimeout(() => {
        msg_elem.setAttribute("status", "off");
    }, 2500);
}

module.exports = {
    get_selected_option:                         get_selected_option,
    get_group_name:                              get_group_name,
    get_group_id:                                get_group_id,
    is_group_already_present:                    is_group_already_present,
    set_aux_option_disabled_status:              set_aux_option_disabled_status,
    set_loading_icon_status:                     set_loading_icon_status,
    display_success_feedback_icon:               display_success_feedback_icon,
    get_new_typed_group:                         get_new_typed_group,
    clean_new_group_input:                       clean_new_group_input,
    is_new_group_valid:                          is_new_group_valid,
    display_new_group_error_msg:                 display_new_group_error_msg,
    set_delete_new_group_button_disabled_status: set_delete_new_group_button_disabled_status,
    set_create_new_group_button_disabled_status: set_create_new_group_button_disabled_status,
    is_user_legit_max_strict:                    is_user_legit_max_strict,
    display_user_legitimacy_error_for_deletion:  display_user_legitimacy_error_for_deletion,
    is_user_legit_no_strict:                     is_user_legit_no_strict
};