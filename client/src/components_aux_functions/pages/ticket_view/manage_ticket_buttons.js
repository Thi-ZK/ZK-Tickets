// Turn Overlay On
const turn_overlay_on = () => {
    document.querySelector("#universal-overlay").setAttribute("status", "on");
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
const display_legitimacy_error = () => {
    let error_elem = document.querySelector("#TV-aggregatives-legitimacy-error-direct-container");

    error_elem.setAttribute("status", "on");

    setTimeout(() => {
        error_elem.setAttribute("status", "off");
    }, 2500);
}

// Updates The State Of Ticket Status With Data From The Input Fed By The Ticket Action Modal Click
const update_ticket_status = (event, ticketData, updateTicketData) => {
    event.preventDefault();

    let ticket_data = JSON.parse(JSON.stringify(ticketData));

    ticket_data.status = event.target.getAttribute("status");

    updateTicketData(ticket_data);
}

module.exports = {
    turn_overlay_on:          turn_overlay_on,
    is_user_legit:            is_user_legit,
    display_legitimacy_error: display_legitimacy_error,
    update_ticket_status:     update_ticket_status
};