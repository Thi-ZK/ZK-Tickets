// Meant For Filtering Which Ticket Status User Wants To See
const status_filters_list_obj = {
    open:         "Open",
    deleted:      "Deleted",
    concluded:    "Concluded",
    blocked:      "Blocked",
    homologation: "Homologation"
};

// Meant For Auxiliary In Checking If Filter Is Status Filter Type
const status_filters = ["open", "deleted", "concluded", "blocked", "homologation"];

// Generates A Function That Filters For 'Assigned To Me' Tickets
const generate_filter_for_assignment_func = (allTickets, userData) => {
    return () => {
        return allTickets.filter((elem) => {
            return elem.assumers.includes(userData.id);
        });
    }
}

// Generates A Function That Filters For 'Created By Me' Tickets
const generate_filter_for_user_creation_func = (allTickets, userData) => {
    return () => {
        return allTickets.filter((elem) => {
            return elem.creator === userData.id;
        });
    }
}

// Generates A Function That Filters Given A Tickets Source (Array Of Tickets) For Statuses (Homologation, Concluded ...)
const generate_filter_for_ticket_status_func = (tickets_source) => {
    return (which_filter) => {
        return tickets_source.filter((elem) => {
            return status_filters_list_obj[which_filter] === elem.status;
        });
    }
}

// Clean Repeated Filtered Tickets
const clean_repeated_repeated_filtered_tickets = (final_tickets_to_be_displayed) => {
    const unique_ids = [];

    return final_tickets_to_be_displayed.filter(ticket => {
        const is_repeated_item = unique_ids.includes(ticket.id);
      
        if ( !is_repeated_item ) {
          unique_ids.push(ticket.id);
      
          return true;
        }
      
        return false;
    });
}

    // Important Info: The Tree Main Filters ('Created By Me' & 'Assigned To Me') Are A Group Of Filters. And Statuses Filters Are Another.
    // The Filters Of A Same Group Are Inclusive: That Means That If User For Example Checks Both Blocked & Deleted, All Blocked & Deleted
    // Tickets Will Be Displayed. But The Filters In Different Groups Are Nesting Conditions (&&). So If User Does Same Example Above,
    // But Also Checks 'Assigned To Me' Filter, Then Only Blocked & Deleted Tickets That Were 'Assigned To Me' Will Be Displayed.

module.exports = {
    status_filters_list_obj: status_filters_list_obj,
    status_filters:          status_filters,
    generate_filter_for_assignment_func:      generate_filter_for_assignment_func,
    generate_filter_for_user_creation_func:   generate_filter_for_user_creation_func,
    generate_filter_for_ticket_status_func:   generate_filter_for_ticket_status_func,
    clean_repeated_repeated_filtered_tickets: clean_repeated_repeated_filtered_tickets    
};