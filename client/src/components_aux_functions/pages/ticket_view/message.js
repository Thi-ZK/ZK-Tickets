// Display Error Message For Not Enough Power
const display_not_enough_power_error_message = (message_id) => {
    let message_id_escaped = message_id.replace(".", "\\."); // For CSS Selection
    let add_mob_class      = window.innerWidth <= 500 ? "-mob" : "";
    let error_message_elem = document.querySelector("#TV-message-container-" + message_id_escaped + " span.TV-MSG-not-enough-power-error-message" + add_mob_class);
    
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

// Check If User Is Ticket Creator OR Admin OR Message Creator (If Not, He / She Is Not Legit Delete The Message)
const is_user_legit_strict = (ticket_creator, userData, msg_owner) => {
    if ( (userData.id === ticket_creator) || (userData.user_power === 4) || (msg_owner === userData.id) ) {
        return true;
    } else {
        return false;
    }
}

// Fades In Deleted Message Container (Returns A Promise, So That It Can Be Awaited Until The Animation Is Finished)
const fade_in_message = (updateMessageContainerStatus) => {
    return new Promise((resolve, reject) => {
        updateMessageContainerStatus("off");

        setTimeout(() => {
            resolve();
            updateMessageContainerStatus("on");
        }, 320);
    });
}

// Disable Delete Icon Image Click
const set_delete_icon_status = (event, status) => {
    event.target.setAttribute("status", status);
}

module.exports = {
    display_not_enough_power_error_message:   display_not_enough_power_error_message,
    set_delete_icon_status:                   set_delete_icon_status,
    set_loading_icon_appearence:              set_loading_icon_appearence,
    generate_ticket_creator_img_src:          generate_ticket_creator_img_src,
    set_anonymous_picture:                    set_anonymous_picture,
    is_user_legit_strict:                     is_user_legit_strict,
    fade_in_message:                          fade_in_message
};