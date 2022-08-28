// Meant For Cleaning User Inputs
const clean_pass_and_email_inputs = () => {
    document.querySelector("#LOG-email").value = "";
    document.querySelector("#LOG-password").value = "";
}

const get_email = () => {
    return document.querySelector("#LOG-email").value;
}

const get_password = () => {
    return document.querySelector("#LOG-password").value;
}

// Makes Login Form Disappear Slowly 
const vanish_login_form = () => {
    document.querySelector("#LOG-form-container").setAttribute("login-status", "logged-in");
}

// Meant For Displaying Or Hiding Loading Icon (Status Can Be "on" Or "off")
const set_loading_icon_appearence = ( status ) => {
    document.querySelector("#LOG-loading-gif-direct-container").setAttribute("status", status);
}

// Function To Prevent Form Submission In Side Links (Create new acc and forgot pass)
const prevent_default = (event) => {
    event.preventDefault();
}

// Set Error Message Appearence 
const set_error_message_appearence = ( updateErrorMessage, status, message ) => {
    document.querySelector("#LOG-error-display-direct-container").setAttribute("status", status);
    if ( message ) { updateErrorMessage(message); }
}

// Prevent Default Action From Handler & Disables Login Button
const prevent_default_and_disable_login_button = (event) => {
    event.target.disabled = true; // Prevent User From Clicking Many Times And Submit Tons Of Requests
    event.preventDefault();
}

// Enable Login Button
const enable_login_button = (event) => {
    event.target.disabled = false;
}

// Loads (From DB) Tickets Data, User Data, Etc.
const load_all_application_to_be_used_data = (allPopulationData) => {
    allPopulationData.update_all_tickets();
    allPopulationData.update_user_data(true);
    allPopulationData.update_user_names_and_ids();
    allPopulationData.update_ticket_groups();
}

module.exports = {
    clean_pass_and_email_inputs:              clean_pass_and_email_inputs,
    get_email:                                get_email,
    get_password:                             get_password,
    vanish_login_form:                        vanish_login_form,
    set_loading_icon_appearence:              set_loading_icon_appearence,
    prevent_default:                          prevent_default,
    set_error_message_appearence:             set_error_message_appearence,
    prevent_default_and_disable_login_button: prevent_default_and_disable_login_button,
    enable_login_button:                      enable_login_button,
    load_all_application_to_be_used_data:     load_all_application_to_be_used_data
};