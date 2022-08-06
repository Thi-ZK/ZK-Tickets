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

module.exports = {
    date_formatter: date_formatter,
    turn_overlay_on: turn_overlay_on,
    generate_ticket_creator_img_src: generate_ticket_creator_img_src,
    set_anonymous_picture: set_anonymous_picture
};