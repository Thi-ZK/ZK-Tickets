// Meant For Success Blue Gif That Shows When Message Successful Placed 
const show_and_fade_success_icon = () => {
    let success_message = document.querySelector("#TV-PM-submit-button-direct-container img");
    success_message.setAttribute("status", "on");
    setTimeout(() => {success_message.setAttribute("status", "off");}, 1000);
}

// Generate Random ID
const generate_random_id = () => {
    return String(Date.now()) + "." + String(Math.floor(Math.random() * 100000));
}

// Clean Message Text Area
const clean_message_text_area = () => {
    document.querySelector("#TV-PM-message-textarea").innerText = "";
}

// Get Provided Message (Text)
const get_message = () => {
    return document.querySelector("#TV-PM-message-textarea").innerText;
}

// Checks If User Has Power Enough To Perform Action
const is_user_legit_no_strict = (userData) => {
    if ( userData.user_power > 2 ) {
        return true;
    } else {
        return false;
    }
}

// Displays Legitimacy Error
const display_legitimacy_error = () => {
    let error_elem = document.querySelector("#TV-PM-error-message");

    error_elem.setAttribute("status", "on");

    setTimeout(() => {
        error_elem.setAttribute("status", "off");
    }, 2500);
}

module.exports = {
    show_and_fade_success_icon: show_and_fade_success_icon,
    generate_random_id:         generate_random_id,
    clean_message_text_area:    clean_message_text_area,
    get_message:                get_message,
    is_user_legit_no_strict:    is_user_legit_no_strict,
    display_legitimacy_error:   display_legitimacy_error
};