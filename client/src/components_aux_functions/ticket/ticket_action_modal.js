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

module.exports = {
    close_modal:    close_modal,
    get_new_status: get_new_status
};