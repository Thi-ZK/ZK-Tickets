// Meant For Cleaning User Inputs
const clean_pass_and_email_inputs = () => {
    document.querySelector("#login-modal-email").value = "";
    document.querySelector("#login-modal-password").value = "";
}

const get_email = () => {
    return document.querySelector("#login-modal-email").value;
}

const get_password = () => {
    return document.querySelector("#login-modal-password").value;
}

// Makes Login Form Disappear Slowly 
const vanish_login_form = () => {
    document.querySelector("#login-modal-direct-container").className = "logged-in";
}

// Meant For Displaying Or Hiding Loading Icon (Status Can Be "on" Or "off")
const set_loading_icon_appearence = ( status ) => {
    document.querySelector("#login-modal-loading-gif").setAttribute("status", status);
}

// Function To Prevent Form Submission In Side Links (Create new acc and forgot pass)
const prevent_default = (event) => {
    event.preventDefault();
}

module.exports = {
    clean_pass_and_email_inputs: clean_pass_and_email_inputs,
    get_email: get_email,
    get_password: get_password,
    vanish_login_form: vanish_login_form,
    set_loading_icon_appearence: set_loading_icon_appearence,
    prevent_default: prevent_default
};