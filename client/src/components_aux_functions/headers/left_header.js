// Switches Grouper Arrow Image (Arrow Direction)
const switch_grouper_open_status = (event) => {
    let clicked_elem = event.target;

    // Scales Up Until Finds The Grouper DIV, Then Updates The LI Elements Container Status Attribute (And Arrow Image)
    for (let i = 0; i < 10; i++) {
        if ( clicked_elem.className === "LH-links-grouper-container" ) {
            let li_elems_container = clicked_elem.querySelector(".LH-tickets-grouper-direct-container");
            let arrow_image        = clicked_elem.querySelector(".LH-links-grouper-expander-direct-container img");
            let is_grouper_closed  = li_elems_container.getAttribute("status") === "closed";
            
            li_elems_container.setAttribute("status", is_grouper_closed ? "open" : "closed");
            arrow_image.setAttribute("src", is_grouper_closed ? "/imgs/headers/arrow_up.png" : "/imgs/headers/arrow_down.png")
            break;
        }

        clicked_elem = clicked_elem.parentElement;
    }
}

// Meant For Search Filter (function) Logic
const is_term_part_of_ticket_id_or_name = (ticket, searchBarTerm) => {
    let name = ticket.name.toLowerCase();
    let id   = ticket.id.toString();
    let term = searchBarTerm.toLowerCase();
    
    if (term && ((name.includes(term)) || (id.includes(term)))) {
        return ticket;
    }

    return false;
}

module.exports = {
    switch_grouper_open_status:        switch_grouper_open_status,
    is_term_part_of_ticket_id_or_name: is_term_part_of_ticket_id_or_name 
};