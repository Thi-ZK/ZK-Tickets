import React from 'react';
import axios from '../../../api/axios';
import AF    from '../../../components_aux_functions/pages/ticket_view/message.js'; // Aux Functions
import texts from '../../../languages/Pages/TicketView/Message.json';

function Message({ type, message_data, ticket_id, messages_utils, userData }) {
    // Aliases
    const messages       = messages_utils.messages;
    const updateMessages = messages_utils.updateMessages; 
    const language       = messages_utils.language;

    // Delete Message. Obs: Messages Aren't Really Deleted, But Just Set As "Deleted" And Hidden
    const delete_message = () => {
        let msg_id    = message_data.id;
        let msg_owner = message_data.message_owner;

        if ((userData.id !== msg_owner) && (userData.user_power < 4)) { 
            return AF.display_not_enough_power_deletion_message(msg_id);
        }

        AF.set_loading_icon_appearence("on", msg_id);

        let data = {
            message_id:    msg_id,
            message_owner: msg_owner,
            ticket_id:     ticket_id
        };

        axios.post('/tickets/update/single/messages/delete', data)
        .then((res) => { console.log(res.data);
            AF.set_loading_icon_appearence("off", msg_id);
            
            updateMessages(messages.map((msg) => { 
                if (msg.id === msg_id) { msg.status = "deleted";}
                return msg;
            }));
        });
    }
  
  return (
    <div className="TV-message-container" css-marker="MSG" id={"TV-message-container-" + message_data.id} type={type}>
        <div className="TV-MSG-title-direct-container">
            <p className='TV-MSG-owner-name'>
                <img alt='-tv-person' src={"/imgs/general/users_photos/" + AF.generate_ticket_creator_img_src(message_data) + ".jpg"} onError={AF.set_anonymous_picture}/>
                {message_data.message_owner_name}
                <img onClick={delete_message} className='TV-MSG-delete-icon' alt="deleted-msg-icon" src='/imgs/general/red_x_delete_icon.png'/>
                <img className='TV-MSG-deleting-gif' status="off" alt='cleaning gif' src='/imgs/ticket/loading_eevee.gif'/>
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

export default Message