import React      from 'react';
import TicketBand from '../Ticket/TicketBand';
import AF         from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) { // Look Into Documentation For Valuable Info Regarding Filters
    // Data Variable Aliases
    const listingFilters = allPopulationData.listingFilters;
    const userData       = allPopulationData.userData;
    const allTickets     = allPopulationData.allTickets;  

    // Filtering Tickets Related Aliases
    let final_tickets_to_be_displayed  = [];
    let tree_main_filtered_tickets     = [];
    let status_filtered_tickets        = [];

    const filter_for_assignment    = AF.generate_filter_for_assignment_func(allTickets, userData);
    const filter_for_user_creation = AF.generate_filter_for_user_creation_func(allTickets, userData);

    // 'Assigned To Me' Filtering (No Concat Needed As It Is The First Filtering)
    if ( listingFilters.includes("'assigned-to-me'") ) {
        tree_main_filtered_tickets = filter_for_assignment();
    }

    // 'Created By Me' Filtering
    if ( listingFilters.includes("my-created") ) {
        tree_main_filtered_tickets = tree_main_filtered_tickets.concat(filter_for_user_creation());
    }

    // In Case No "Assigned By Me" Or "Created By Me" Was Filtered, Consider Then All Tickets For The Status Filtering
    if ( !tree_main_filtered_tickets.length ) {
        tree_main_filtered_tickets = allTickets;
    }

    const filter_for_ticket_status     = AF.generate_filter_for_ticket_status_func(tree_main_filtered_tickets);
    let was_any_status_filter_filtered = false;

    // Status Filtering (Concluded, Homologated ...)
    for ( let i = 0; i < listingFilters.length; i++ ) {
        if ( AF.status_filters.includes(listingFilters[i]) ) {
            was_any_status_filter_filtered = true;
            status_filtered_tickets = status_filtered_tickets.concat(filter_for_ticket_status(listingFilters[i]));   
        } 
    }

    final_tickets_to_be_displayed = was_any_status_filter_filtered ? status_filtered_tickets : tree_main_filtered_tickets;

    // Filter Apply For "Ticket Groups"
    // if ( is_list_a_ticket_group ) {
    //     tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => { 
    //         return elem.groups_names.includes(nested_listing);
    //     });
    // }
    
    return (
        <div id="ticket-listing-container">
            {final_tickets_to_be_displayed.map((ticket_data, index) => (
                <TicketBand key={index} ticket_data={ticket_data} allPopulationData={allPopulationData}/>
            ))}
        </div>
    )
}

export default TicketListing