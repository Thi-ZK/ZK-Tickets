import React, { useState } from "react";
import TicketBand          from '../../Ticket/TicketBand';
import Pagination          from './Pagination';
import AF                  from '../../../components_aux_functions/pages/ticket_listing/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) { // Look Into Documentation For Valuable Info Regarding Filters
    // Data Variable Aliases
    const listingFilters = allPopulationData.listingFilters; // Array Of Objects
    const userData       = allPopulationData.userData;
    const allTickets     = allPopulationData.allTickets;

    // Pagination Selected Display Page
    const [selectedPage, updateSelectedPage] = useState(1);

    // Filtering Tickets Related Aliases
    let tickets_to_be_shown         = [];
    let status_tickets_filtered     = [];
    let group_tickets_filtered      = [];
    let was_assigned_filter_applied = AF.was_assigned_to_me_filter_applied(listingFilters);
    let was_creation_filter_applied = AF.was_created_by_me_filter_applied(listingFilters);
    let was_any_tree_filter_applied = was_assigned_filter_applied || was_creation_filter_applied;

    const filter_for_assignment    = AF.gen_filter_for_assignment_func(allTickets, userData);
    const filter_for_user_creation = AF.gen_filter_for_user_creation_func(allTickets, userData);

    // 'Assigned To Me' Filtering (No Concat Needed As It Is The First Time Filtering) (Tree Main Filter)
    if ( was_assigned_filter_applied ) {
        tickets_to_be_shown = filter_for_assignment();
    }

    // 'Created By Me' Filtering (Tree Main Filter)
    if ( was_creation_filter_applied ) {
        tickets_to_be_shown = tickets_to_be_shown.concat(filter_for_user_creation());
    }

    // In Case No Tree Main Filter Applied, Consider All Tickets For Child Filters
    tickets_to_be_shown = was_any_tree_filter_applied ? tickets_to_be_shown : allTickets;

    // Status Filtering (Concluded, Homologated ...)
    const filter_for_ticket_status = AF.gen_filter_for_ticket_status_func(tickets_to_be_shown);

    listingFilters.forEach((filter) => {
        if ( filter.type === "status" ) {
            status_tickets_filtered = status_tickets_filtered.concat(filter_for_ticket_status(filter.name));
            tickets_to_be_shown     = status_tickets_filtered;
        }
    });

    // Groups Filtering
    const filter_for_ticket_group = AF.gen_filter_for_ticket_group_func(tickets_to_be_shown);

    listingFilters.forEach((filter) => {
        if ( filter.type === "group" ) {
            group_tickets_filtered = group_tickets_filtered.concat(filter_for_ticket_group(filter.name));
            tickets_to_be_shown    = group_tickets_filtered;
        }
    });

    // In Case No Filter Was Applied, Return Full List, Case Yes, Clean Repeated Items
    if ( !listingFilters.length ) {
        tickets_to_be_shown = allTickets;
    } else {
        tickets_to_be_shown = AF.clean_repeated_filtered_tickets(tickets_to_be_shown);
    }
    
    return (
        <div current-pagination={selectedPage} id="ticket-listing-container">
            <Pagination
                tickets_to_be_shown={tickets_to_be_shown}
                selectedPage={selectedPage}
                updateSelectedPage={updateSelectedPage}
                listingFilters={listingFilters}>
            </Pagination>
            
            {tickets_to_be_shown.slice((selectedPage -1) * 15, selectedPage * 15).map((ticket_data, index) => (
                <TicketBand key={index} ticket_data={ticket_data} allPopulationData={allPopulationData}/>
            ))}
        </div>
    )
}

export default TicketListing