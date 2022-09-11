import React         from 'react';
import TicketBand    from '../Ticket/TicketBand';
import AF            from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) {
    // Aliases
    const listingFilters        = allPopulationData.listingFilters;
    const user_data             = allPopulationData.userData;
    let tickets_to_be_displayed = allPopulationData.allTickets;

    // Function For "I Am Assigned" Filtering
    const filter_for_assignment = () => {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => {
            return elem.assumers.includes(user_data.id);
        });
    }

    // Function For "Only Tickets Created By Me" Filtering
    const filter_for_user_creation = () => {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => {
            return elem.creator === user_data.id;
        });
    }

    // Function For Ticket Status Filtering (Concluded, Homologated ...)
    const filter_for_ticket_status = ( which_filter ) => {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => {
            return AF.status_filters_list_obj[which_filter] === elem.status;
        });
    }

    const filter_functions_mapped_with_filter_name = {
        "'assigned-to-me'": filter_for_assignment,
        "my-created":       filter_for_user_creation,
        "open":             filter_for_ticket_status,
        "deleted":          filter_for_ticket_status,
        "concluded":        filter_for_ticket_status,
        "blocked":          filter_for_ticket_status,
        "homologation":     filter_for_ticket_status
    };

    for ( let i = 0; i < listingFilters.length; i++) {
        let which_filter = listingFilters[i];

        filter_functions_mapped_with_filter_name[which_filter](which_filter);
    }

    // Filter Apply For "Ticket Groups"
    // if ( is_list_a_ticket_group ) {
    //     tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => { 
    //         return elem.groups_names.includes(nested_listing);
    //     });
    // }
    
    return (
        <div id="ticket-listing-container">
            {tickets_to_be_displayed.map((ticket_data, index) => (
                <TicketBand key={index} ticket_data={ticket_data} allPopulationData={allPopulationData}/>
            ))}
        </div>
    )
}

export default TicketListing