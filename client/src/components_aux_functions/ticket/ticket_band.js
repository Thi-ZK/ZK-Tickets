// Dates Formatting Function
const date_formatter = (date) => {
    date = String(date).split("T")[0].replaceAll("-", "/").split("/");
    let tmp = date[0]; date[0] = date[2]; date[2] = tmp; // switch order of year with day
    return date.join("/"); 
}

// Turn Overlay On
const turn_overlay_on = () => {
    document.querySelector("#universal-overlay").setAttribute("status", "on");
}

// Generate Ticket Creator Image SRC URL
const generate_ticket_creator_img_src = (ticket_data) => {
    return ticket_data.creator_name.toLowerCase().replaceAll(" ", "_") + "_" + ticket_data.creator;
}

// Img SRC On Error Function (Set Anonymous Picture)
const set_anonymous_picture = (event) => {
    let img = event.target;
    img.onerror = null;
    img.src = "/imgs/general/users_photos/anonymous.jpg";
}

// Check If User Is Legit To Perform Desired Action
const is_user_legit = (related_users, userData) => {
    if ( userData.user_power < 3 ) {
        return false;
    }

    if ( (related_users.includes(userData.id)) || (userData.user_power === 4) ) {
        return true;
    } else {
        return false;
    }
}

// Displays Assign Or Unassign Error Messages Due To Lack Of Power
const display_legitimacy_error = (event) => {
    let error_elem = event.target.parentElement.parentElement.querySelector(".TB-intitle-legitimacy-error-direct-container");

    error_elem.setAttribute("status", "on");

    setTimeout(() => {
        error_elem.setAttribute("status", "off");
    }, 2500);
}

// Generate Assumers Name String
const gen_string_formatted_from_array = (assumers_names_array) => {
    let names = assumers_names_array.length ? (" " + assumers_names_array.join(", ")) : " None";

    return names.length > 56 ? (names.substring(0, 75) + "...") : names;
}

module.exports = {
    date_formatter:                  date_formatter,
    turn_overlay_on:                 turn_overlay_on,
    generate_ticket_creator_img_src: generate_ticket_creator_img_src,
    set_anonymous_picture:           set_anonymous_picture,
    is_user_legit:                   is_user_legit,
    display_legitimacy_error:        display_legitimacy_error,
    gen_string_formatted_from_array: gen_string_formatted_from_array
};