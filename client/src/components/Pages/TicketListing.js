import React      from "react";
import TicketBand from '../Ticket/TicketBand';
import AF         from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) { // Look Into Documentation For Valuable Info Regarding Filters
    // Data Variable Aliases
    const listingFilters = allPopulationData.listingFilters; // Array Of Objects
    const userData       = allPopulationData.userData;
    const allTickets     = allPopulationData.allTickets;  

    // Filtering Tickets Related Aliases
    let final_tickets_to_be_displayed = [];
    let status_tickets_filtered       = [];
    let group_tickets_filtered        = [];
    let was_assigned_filter_applied   = AF.was_assigned_to_me_filter_applied(listingFilters);
    let was_creation_filter_applied   = AF.was_created_by_me_filter_applied(listingFilters);
    let was_any_tree_filter_applied   = was_assigned_filter_applied || was_creation_filter_applied;

    const filter_for_assignment    = AF.generate_filter_for_assignment_func(allTickets, userData);
    const filter_for_user_creation = AF.generate_filter_for_user_creation_func(allTickets, userData);

    // 'Assigned To Me' Filtering (No Concat Needed As It Is The First Time Filtering)
    if ( was_assigned_filter_applied ) {
        final_tickets_to_be_displayed = filter_for_assignment();
    }

    // 'Created By Me' Filtering
    if ( was_creation_filter_applied ) {
        final_tickets_to_be_displayed = final_tickets_to_be_displayed.concat(filter_for_user_creation());
    }

    // In Case No Tree Main Filter Applied, Consider All Tickets For Child Filters
    final_tickets_to_be_displayed  = was_any_tree_filter_applied ? final_tickets_to_be_displayed : allTickets;

    // Status Filtering (Concluded, Homologated ...) & Groups Filtering
    const filter_for_ticket_status = AF.generate_filter_for_ticket_status_func(final_tickets_to_be_displayed);

    for ( let i = 0; i < listingFilters.length; i++ ) {
        let filter_name = listingFilters[i].name;
        let filter_type = listingFilters[i].type;

        if ( filter_type === "status" ) {
            status_tickets_filtered       = status_tickets_filtered.concat(filter_for_ticket_status(filter_name));
            final_tickets_to_be_displayed = status_tickets_filtered;
        }
    }

    // Groups Filtering
    const filter_for_ticket_group = AF.generate_filter_for_ticket_group_func(final_tickets_to_be_displayed);

    for ( let i = 0; i < listingFilters.length; i++ ) {
        let filter_name = listingFilters[i].name;
        let filter_type = listingFilters[i].type;
        
        if ( filter_type === "group" ) {
            group_tickets_filtered        = group_tickets_filtered.concat(filter_for_ticket_group(filter_name));
            final_tickets_to_be_displayed = group_tickets_filtered;
        }
    }

    // In Case No Filter Was Applied, Return Full List, Case Yes, Clean Repeated Items
    if ( !listingFilters.length ) {
        final_tickets_to_be_displayed = allTickets;
    } else {
        final_tickets_to_be_displayed = AF.clean_repeated_repeated_filtered_tickets(final_tickets_to_be_displayed);
    }

    return (
        <div id="ticket-listing-container">
            {final_tickets_to_be_displayed.map((ticket_data, index) => (
                <TicketBand key={index} ticket_data={ticket_data} allPopulationData={allPopulationData}/>
            ))}
        </div>
    )
}

export default TicketListing