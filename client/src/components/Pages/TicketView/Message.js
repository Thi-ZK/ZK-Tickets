import React, { useState, useEffect } from 'react';
import axios                          from '../../../api/axios';
import AF                             from '../../../components_aux_functions/pages/ticket_view/message.js'; // Aux Functions
import texts                          from '../../../languages/Pages/TicketView/Message.json';

function Message({ type, message_data, ticket_id, messages_utils, userData, ticket_creator }) {
    // Aliases
    const messages       = messages_utils.messages;
    const updateMessages = messages_utils.updateMessages; 
    const language       = messages_utils.language;

    // Meant For Smooth Appearence Effect Of Component Rendering
	const [messageContainerStatus, updateMessageContainerStatus] = useState("off");

    // Delete Message Handler
    const delete_message = (event) => {
        AF.set_delete_icon_status(event, "off"); // Avoid Multiple Calls To Handler Before Current Is Finished

        let msg_id = message_data.id;
        let data   = {
            message_id:     msg_id,
            message_owner:  message_data.message_owner,
            ticket_id:      ticket_id,
            ticket_creator: ticket_creator
        };

        if ( !AF.is_user_legit_strict(ticket_creator, userData, data.message_owner) ) {
            AF.set_delete_icon_status(event, "on");
            AF.display_not_enough_power_error_message(msg_id);

            return;
        }

        AF.set_loading_icon_appearence("on", msg_id);

        axios.post('/tickets/update/single/messages/delete', data).then(async (res) => { console.log(res.data);
            AF.set_loading_icon_appearence("off", msg_id);
            await AF.fade_in_message(updateMessageContainerStatus);
            AF.set_delete_icon_status(event, "on"); // Components Are Reused, So Let It "on" In Case This Component Is Reused

            window.__was_ticket_interacted = true;
            
            updateMessages(messages.map((msg) => { 
                if ( msg.id === msg_id ) {  msg.status = "deleted"; }
                return msg;
            }));
        });
    }

    // Meant For Smooth Appearence Effect Of Component Rendering
	useEffect(() => {
        updateMessageContainerStatus("on");
	}, []);
  
    return (
    <div status={messageContainerStatus} className="TV-message-container" css-marker="MSG" id={"TV-message-container-" + message_data.id} type={type}>
        <div className="TV-MSG-title-direct-container">
            <p className='TV-MSG-owner-name'>
                <img src={"/imgs/general/users_photos/" + AF.generate_ticket_creator_img_src(message_data) + ".jpg"} onError={AF.set_anonymous_picture} alt='-tv-person'/>
                {message_data.message_owner_name}
                <img src='/imgs/general/red_x_delete_icon.png' className='TV-MSG-delete-icon'  alt="deleted-msg-icon" onClick={delete_message} status="on"/>
                <img src='/imgs/ticket/loading_eevee.gif'      className='TV-MSG-deleting-gif' alt='cleaning gif' status="off"/>
                <span status="off" className="TV-MSG-not-enough-power-error-message">{texts.not_enough_power[language]}</span>
            </p>
            <p className='TV-MSG-date'>{String(message_data.date_casual_format.split(" GMT")[0])}</p>
        </div>
        <div className='TV-MSG-text'>
          {message_data.message}
        </div>
    </div>
    )
}

export default Message;