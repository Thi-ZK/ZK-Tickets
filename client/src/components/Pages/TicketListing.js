import React         from 'react';
import TicketBand    from '../Ticket/TicketBand';
import { useParams } from "react-router-dom";
import AF            from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) {
    // Aliases
    const { specific_listing }       = useParams();
    const am_i_assigned              = specific_listing.includes("iaa");
    const is_list_my_created_tickets = specific_listing === "my_created_tickets";
    const all_tickets                = allPopulationData.allTickets;
    const user_data                  = allPopulationData.userData;
    
    // Filter Apply For Status (Deleted, Homologated ...)
    let tickets_to_be_displayed = all_tickets.filter((elem) => {
        return elem.status.includes(AF.status_filters_list_obj[specific_listing]);
    });

    // Filter Apply For Only Tickets Created By The User
    if ( is_list_my_created_tickets ) {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => { return elem.creator === user_data.id });
    }

    // Filter Apply For If User Is Related To The Ticket, It Will Be Displayed
    if ( am_i_assigned ) {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => { 
            return elem.assumers.includes(user_data.id);
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