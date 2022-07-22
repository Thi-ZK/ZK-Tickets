// import React, { useState, useEffect } from 'react';
import React from 'react';
import axios from '../../../api/axios';

function Message({ type, message_data, ticket_id, messages_utils }) {
    // Messages State Alias
    const messages       = messages_utils.messages;
    const updateMessages = messages_utils.updateMessages;

    // Meant For Displaying Or Hiding Loading Icon (Status Can Be "on" Or "off")
    const set_loading_icon_appearence = ( status ) => {
        document.querySelector("img[id='" + message_data.id + "']").setAttribute("status", status);
    } 

    // Delete Message. Obs: Messages Aren't Really Deleted, But Just Set As "Deleted" And Hidden
    const delete_message = () => {
        let msg_id    = message_data.id;
        let msg_owner = message_data.message_owner;

        set_loading_icon_appearence("on");

        axios.post('/tickets/update/single/messages/delete/' + ticket_id, {message_id: msg_id, message_owner: msg_owner})
        .then(() => {
            set_loading_icon_appearence("off");
            updateMessages(messages.map((msg) => { 
                if (msg.id === msg_id) { msg.status = "deleted";}
                return msg;
            }));
        });
    }
  
  return (
    <div className="tv-message-direct-container" type={type}>
        <div className="tv-message-title-container">
            <p className='tv-message-name'>
                <img alt='-tv-person' src='/imgs/home/honeybaby.jpg'/>
                {message_data.message_owner_name}
                <img onClick={delete_message} className='delete-msg-icon' alt="deleted-msg-icon" src='/imgs/general/close_icon.png'/>
                <img id={message_data.id} className='tv-message-delete-message-img' status="off" alt='cleaning gif' src='/imgs/general/loading.gif'/>
            </p>
            <p className='tv-message-date'>{String(message_data.date_casual_format.split(" GMT")[0])}</p>
        </div>
        <div className='tv-single-message-container'>
          {message_data.message}
        </div>
    </div>
  )
}

export default Message