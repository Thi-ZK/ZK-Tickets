// Meant To Close Modal
const close_modal = (updateTicketActionModalSettings) => {
    updateTicketActionModalSettings({
        is_action_redundant: false,
        text_thema:   "none",
        status:       "closed",
        ticket_id:    "none",
        which_action: "none"
    });
    
    document.querySelector("#universal-overlay").setAttribute("status", "off");
}

// Get New Status
const get_new_status = (ticketActionModalSettings) => {
    return {
        conclude:   "Concluded",
        block:      "Blocked",
        homologate: "Homologation",
        delete:     "Deleted"
    }[ticketActionModalSettings.which_action];
}

// Updates The & Clicks The Input From Ticket View Or Ticket Band In Order To Update The Status 
const update_and_click_ticket_status_input = (ticket_id, new_status) => {
    let ticket_status_input_elem = document.querySelector(".ticket-band-container[id='" + ticket_id + "'] input[type='hidden']");

    ticket_status_input_elem.setAttribute("status", new_status);
    ticket_status_input_elem.click();
}

module.exports = {
    close_modal:                          close_modal,
    get_new_status:                       get_new_status,
    update_and_click_ticket_status_input: update_and_click_ticket_status_input
};