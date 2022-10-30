import React, { useState, useEffect } from 'react';

import axios from '../../../api/axios';
import AF    from '../../../components_aux_functions/pages/ticket_view/message.js'; // Aux Functions
import texts from '../../../languages/Pages/TicketView/Message.json';

function Message({ all_population_data, ticket_data_utils, message_data, type }) {
    // Aliases
    const language           = all_population_data.language;
    const userData           = all_population_data.userData;
    const update_all_tickets = all_population_data.update_all_tickets;
    const ticketData         = ticket_data_utils.ticketData;
    const updateTicketData   = ticket_data_utils.updateTicketData;

    // Delete Message Handler
    const delete_message = (event) => {
        AF.set_delete_icon_status(event, "off"); // Avoid Multiple Calls To Handler Before Current Is Finished

        let msg_id = message_data.id;
        let data   = {
            message_id:     msg_id,
            message_owner:  message_data.message_owner,
            ticket_id:      ticketData.id,
            ticket_creator: ticketData.creator
        };

        if ( !AF.is_user_legit_strict(data.ticket_creator, userData, data.message_owner) ) {
            AF.set_delete_icon_status(event, "on");
            AF.display_not_enough_power_error_message(msg_id);

            return;
        }

        AF.set_loading_icon_appearence("on", msg_id);

        axios.post('/tickets/update/single/messages/delete', data).then(async (res) => { console.log(res.data);
            AF.set_loading_icon_appearence("off", msg_id);
            await AF.fade_in_message(updateMessageContainerStatus);
            AF.set_delete_icon_status(event, "on"); // Components Are Reused, So Set It "on" In Case This Component Is Reused
            AF.update_ticket_data_with_deleted_message(ticketData, msg_id, updateTicketData);

            update_all_tickets();
        });
    }

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [messageContainerStatus, updateMessageContainerStatus] = useState("off");

	useEffect(() => {
        updateMessageContainerStatus("on");
	}, []);
  
    return (
    <div status={messageContainerStatus} className="TV-message-container" css-marker="MSG" id={"TV-message-container-" + message_data.id} type={type}>
        <div className="TV-MSG-title-direct-container">
            <div className='TV-MSG-owner-name'>
                <img src={"/imgs/general/users_photos/" + AF.generate_ticket_creator_img_src(message_data) + ".jpg"} onError={AF.set_anonymous_picture} alt='-tv-person'/>
                {message_data.message_owner_name}
                <img src='/imgs/general/red_x_delete_icon.png' className='TV-MSG-delete-icon'  alt="deleted-msg-icon" onClick={delete_message} status="on"/>
                <img src='/imgs/ticket/loading_eevee.gif'      className='TV-MSG-deleting-gif' alt='cleaning gif' status="off"/>
                <span status="off" className="TV-MSG-not-enough-power-error-message">{texts.not_enough_power[language]}</span>
            </div>
            <p className='TV-MSG-date'>{String(message_data.date_casual_format.split(" GMT")[0])}</p>
        </div>
        <span status="off" className="TV-MSG-not-enough-power-error-message-mob">{texts.not_enough_power[language]}</span>
        <div className='TV-MSG-text'>
          {message_data.message}
        </div>
    </div>
    )
}

export default Message;