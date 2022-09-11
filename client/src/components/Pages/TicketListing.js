import React      from 'react';
import TicketBand from '../Ticket/TicketBand';
import AF         from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) {
    // Data Variable Aliases
    const listingFilters = allPopulationData.listingFilters;
    const userData       = allPopulationData.userData;
    const allTickets     = allPopulationData.allTickets;

    // Filtered Tickets Aliases
    let final_tickets_to_be_displayed = listingFilters.length ? [] : allTickets;
    let first_main_filtered_tickets   = []; // (Create By Me & Assigned) 

    // Function For "I Am Assigned" Filtering
    const filter_for_assignment = () => {
        return allTickets.filter((elem) => {
            return elem.assumers.includes(userData.id);
        });
    }

    // Function For "Tickets Created By Me" Filtering
    const filter_for_user_creation = () => {
        return allTickets.filter((elem) => {
            return elem.creator === userData.id;
        });
    }

    // Function For Ticket Status Filtering (Concluded, Homologated ...)
    const filter_for_ticket_status = ( which_filter ) => {
        return first_main_filtered_tickets.filter((elem) => {
            return AF.status_filters_list_obj[which_filter] === elem.status;
        });
    }

    // 'Assigned To Me' Filtering (No Concat, As It Is The First Filtering)
    if ( listingFilters.includes("'assigned-to-me'") ) {
        first_main_filtered_tickets = filter_for_assignment();
    }

    // 'Created By Me' Filtering
    if ( listingFilters.includes("my-created") ) {
        first_main_filtered_tickets = first_main_filtered_tickets.concat(filter_for_user_creation());
    }

    // In Case No "Assigned By Me" Or "Created By Me" Was Filtered, Consider Then All Tickets For The Status Filtering
    if ( !first_main_filtered_tickets.length ) {
        first_main_filtered_tickets = allTickets;
    }

    // Status Filtering (Concluded, Homologated ...)
    for ( let i = 0; i < listingFilters.length; i++) {
        if ( AF.status_filters.includes(listingFilters[i]) ) {
            final_tickets_to_be_displayed = final_tickets_to_be_displayed.concat(filter_for_ticket_status(listingFilters[i]));   
        } 
    }

    // In Case No Status Filter Was Done, Display The First Main Filtered Tickets
    if ( !final_tickets_to_be_displayed.length ) {
        final_tickets_to_be_displayed = first_main_filtered_tickets;
    }

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