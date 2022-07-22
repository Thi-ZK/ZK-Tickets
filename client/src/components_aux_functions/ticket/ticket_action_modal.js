// Meant To Close Modal
const close_modal = (updateTicketActionModalSettings) => {
    updateTicketActionModalSettings({
        is_action_redundant: false,
        text_thema: "none",
        status: "closed",
        ticket_id: "none",
        which_action: "none"
    });
    
    document.querySelector("#universal-overlay").setAttribute("status", "off");
}

module.exports = {
    close_modal: close_modal
};