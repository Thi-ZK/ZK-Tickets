import React      from 'react';
import TicketBand from '../Ticket/TicketBand';
import AF         from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) { // Look Into Documentation For Valuable Info Regarding Filters
    // Data Variable Aliases
    const listingFilters = allPopulationData.listingFilters;
    const userData       = allPopulationData.userData;
    const allTickets     = allPopulationData.allTickets;  

    // Filtering Tickets Related Aliases
    let final_tickets_to_be_displayed = [];
    let status_tickets_filtered       = [];

    const filter_for_assignment    = AF.generate_filter_for_assignment_func(allTickets, userData);
    const filter_for_user_creation = AF.generate_filter_for_user_creation_func(allTickets, userData);

    // 'Assigned To Me' Filtering (No Concat Needed As It Is The First Filtering)
    if ( listingFilters.includes("'assigned-to-me'") ) {
        final_tickets_to_be_displayed = filter_for_assignment();
    }

    // 'Created By Me' Filtering
    if ( listingFilters.includes("my-created") ) {
        final_tickets_to_be_displayed = final_tickets_to_be_displayed.concat(filter_for_user_creation());
    }

    // Clean Repeated Filtered Tickets
    final_tickets_to_be_displayed = AF.clean_repeated_repeated_filtered_tickets(final_tickets_to_be_displayed);

    // Status Filtering (Concluded, Homologated ...)
    const filter_for_ticket_status = AF.generate_filter_for_ticket_status_func(final_tickets_to_be_displayed);

    for ( let i = 0; i < listingFilters.length; i++ ) {
        if ( AF.status_filters.includes(listingFilters[i]) ) {
            status_tickets_filtered       = status_tickets_filtered.concat(filter_for_ticket_status(listingFilters[i]));
            final_tickets_to_be_displayed = status_tickets_filtered;
        } 
    }

    // In Case No Filter Was Applied, Return Full List
    if ( !listingFilters.length ) {
        final_tickets_to_be_displayed = allTickets;
    }

    //Groups Filtering
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