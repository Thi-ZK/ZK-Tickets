import React from 'react';
import axios from '../../../api/axios';

import texts from '../../../languages/Pages/TicketView/PlaceMessage.json';
import AF    from '../../../components_aux_functions/pages/ticket_view/place_message.js'; // Aux Functions

function PlaceMessage({ all_population_data, ticket_data_utils }) {
    // Messages Aliases
    const ticketData         = ticket_data_utils.ticketData;
    const updateTicketData   = ticket_data_utils.updateTicketData;
    const userData           = all_population_data.userData;
    const update_all_tickets = all_population_data.update_all_tickets;
    const language           = all_population_data.language;

    // Meant For Setting Messages
    const set_message = () => {
        if ( !AF.is_user_legit_no_strict(userData) ) {
            AF.display_legitimacy_error();
            return;
        }

        let message    = AF.get_message();
        let new_msg_id = AF.generate_random_id();
        
        if ( !message ) { return; }
        
        AF.clean_message_text_area();
        
        let data ={
            message:    message,
            message_id: new_msg_id,
            ticket_id:  ticketData.id
        };

        axios.post('/tickets/update/single/messages/set', data).then((res) => { console.log(res.data);
            let new_message = {
                message_owner_name: userData.name,
                message_owner:      userData.id,
                date_casual_format: String(new Date()),
                message:            message,
                status:             "alive",
                id:                 new_msg_id
            }

            AF.show_and_fade_success_icon();
            AF.update_ticket_data_with_new_message(ticketData, updateTicketData, new_message);

            update_all_tickets();
        })
    }
    
    return (
    <div id="TV-place-message-container" css-marker="PM">
        <div id="TV-PM-title-direct-container">
            <p>{texts.place_a_message_below[language]}</p>
        </div>
        <div id="TV-PM-textarea-and-submit-button-container">
            <div id="TV-PM-textarea-direct-container">
                <div suppressContentEditableWarning={true} contentEditable="true" id="TV-PM-message-textarea">
                    <img alt="arrow img in place message" src="/imgs/ticket/black_right_arrow.png"/>
                </div>
            </div>
            <div id="TV-PM-submit-button-container">
                <p status="off" id='TV-PM-error-message'>{texts.legitimacy_error[language]}</p>
                <div id='TV-PM-submit-button-direct-container'>
                    <img status="off" alt="success message placed icon" src="/imgs/general/success.gif"/>
                    <button onClick={set_message}>{texts.place_message[language]}</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PlaceMessage