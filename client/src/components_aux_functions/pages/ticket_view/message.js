// Display Error Message For Not Enough Power
const display_not_enough_power_deletion_message = (message_id) => {
    let message_id_escaped = message_id.replace(".", "\\."); // For CSS Selection
    let error_message_elem = document.querySelector("#TV-message-container-" + message_id_escaped + " span.TV-MSG-not-enough-power-error-message");

    error_message_elem.setAttribute("status", "on");
    setTimeout(() => {
        error_message_elem.setAttribute("status", "off");
    }, 2000);

}

// Meant For Displaying Or Hiding Loading Icon (Status Can Be "on" Or "off")
const set_loading_icon_appearence = ( status, message_id ) => {
    let message_id_escaped = message_id.replace(".", "\\."); // For CSS Selection
    document.querySelector("#TV-message-container-" + message_id_escaped + " img.TV-MSG-deleting-gif").setAttribute("status", status);
}

module.exports = {
    display_not_enough_power_deletion_message: display_not_enough_power_deletion_message,
    set_loading_icon_appearence: set_loading_icon_appearence
};