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

// Generate Ticket Creator Image SRC URL
const generate_ticket_creator_img_src = (message_data) => {
    return message_data.message_owner_name.toLowerCase().replaceAll(" ", "_") + "_" + message_data.message_owner;
}

// Img SRC On Error Function (Set Anonymous Picture)
const set_anonymous_picture = (event) => {
    let img = event.target;
    img.onerror = null;
    img.src = "/imgs/general/users_photos/anonymous.jpg";
}

module.exports = {
    display_not_enough_power_deletion_message: display_not_enough_power_deletion_message,
    set_loading_icon_appearence: set_loading_icon_appearence,
    generate_ticket_creator_img_src: generate_ticket_creator_img_src,
    set_anonymous_picture: set_anonymous_picture
};