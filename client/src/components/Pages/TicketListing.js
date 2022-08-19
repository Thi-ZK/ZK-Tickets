import React         from 'react';
import TicketBand    from '../Ticket/TicketBand';
import { useParams } from "react-router-dom";
import AF            from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) {
    // Aliases
    const { listing, nested_listing } = useParams();
    const is_list_i_am_assigned_child = listing.includes("i_am_assigned");
    const is_list_my_created_tickets  = listing === "created_by_me";
    const is_list_a_ticket_group      = listing.includes("groups");
    const user_data                   = allPopulationData.userData;
    let tickets_to_be_displayed       = allPopulationData.allTickets;
    
    // Filter Apply For "Tickets I Am Assigned"
    if ( is_list_i_am_assigned_child ) {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => {
            return ( (elem.assumers.includes(user_data.id)) && (elem.status.includes(AF.status_filters_list_obj[nested_listing])) )
        });
    }

    // Filter Apply For "Only Tickets Created By Me"
    if ( is_list_my_created_tickets ) {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => {
            return elem.creator === user_data.id;
        });
    }

    // Filter Apply For "Ticket Groups"
    if ( is_list_a_ticket_group ) {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => { 
            return elem.groups_names.includes(nested_listing);
        });
    }
    
    return (
        <>
            {tickets_to_be_displayed.map((ticket, index) => (
                <TicketBand key={index} ticket_data={ticket} allPopulationData={allPopulationData}></TicketBand>
            ))}
        </>
    )
}

export default TicketListing