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
            return which_filter === elem.status;
        });
    }
}

// Generates A Function That Filters Given A Tickets Source (Array Of Tickets) For Groups
const generate_filter_for_ticket_group_func = (tickets_source) => {
    return (which_filter) => {
        return tickets_source.filter((elem) => {
            return elem.groups_names.includes(which_filter);
        });
    }
}

// Function That Checks If 'Assigned To Me' Filter Was Applied
const was_assigned_to_me_filter_applied = (listingFilters) => {
    for ( let i = 0; i < listingFilters.length; i++ ) {
        if ( listingFilters[i].name.includes("'Assigned To Me'") ) {
            return true;
        }
    }

    return false;
}

// Function That Checks If 'Created By Me' Filter Was Applied
const was_created_by_me_filter_applied = (listingFilters) => {
    for ( let i = 0; i < listingFilters.length; i++ ) {
        if ( listingFilters[i].name.includes("My Created") ) {
            return true;
        }
    }

    return false;
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
    generate_filter_for_assignment_func:      generate_filter_for_assignment_func,
    generate_filter_for_user_creation_func:   generate_filter_for_user_creation_func,
    generate_filter_for_ticket_status_func:   generate_filter_for_ticket_status_func,
    clean_repeated_repeated_filtered_tickets: clean_repeated_repeated_filtered_tickets,
    was_assigned_to_me_filter_applied:        was_assigned_to_me_filter_applied,
    was_created_by_me_filter_applied:         was_created_by_me_filter_applied,
    generate_filter_for_ticket_group_func:    generate_filter_for_ticket_group_func
};