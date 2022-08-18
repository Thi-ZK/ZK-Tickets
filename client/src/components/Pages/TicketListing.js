import React         from 'react';
import TicketBand    from '../Ticket/TicketBand';
import { useParams } from "react-router-dom";
import AF            from '../../components_aux_functions/pages/ticket_listing.js'; // Aux Functions

function TicketListing ({ allPopulationData }) { console.log("AAAAAAAaa")
    // Aliases
    const { listing, listing_2 }     = useParams();
    const is_list_am_i_assigned      = listing.includes("iaa");
    const is_list_my_created_tickets = listing === "my_created_tickets";
    const is_list_a_ticket_group     = listing.includes("ticket_groups");
    const all_tickets                = allPopulationData.allTickets;
    const user_data                  = allPopulationData.userData;
    
    // Filter Apply For Status (Deleted, Homologated ...) (Inside tickets I am assigned)
    let tickets_to_be_displayed = all_tickets.filter((elem) => {
        return elem.status.includes(AF.status_filters_list_obj[listing]);
    });

    // Filter Apply For Only Tickets Created By The User (my created tickets)
    if ( is_list_my_created_tickets ) {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => { return elem.creator === user_data.id });
    }

    // Filter Apply For If User Is Assigned To The Ticket (tickets I am assigned)
    if ( is_list_am_i_assigned ) {
        tickets_to_be_displayed = tickets_to_be_displayed.filter((elem) => { 
            return elem.assumers.includes(user_data.id);
        });
    }

    // Filter Apply For Ticket Groups (tickt groups)
    if ( is_list_am_i_assigned ) {
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