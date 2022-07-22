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

module.exports = {
    date_formatter: date_formatter,
    turn_overlay_on: turn_overlay_on
};