import React from 'react';
import axios from '../../../api/axios';
import texts from '../../../languages/Pages/TicketView/PlaceMessage.json';
import AF    from '../../../components_aux_functions/pages/ticket_view/place_message.js'; // Aux Functions

function PlaceMessage({ ticket_id, messages_utils, userData }) {
    // Messages Aliases
    const messages       = messages_utils.messages;
    const updateMessages = messages_utils.updateMessages;
    const language       = messages_utils.language;

    // Meant For Setting Messages
    const set_message = () => {
        let message = document.querySelector("#TV-PM-message-textarea").innerText;
        
        if ( !message ) { return; }
        
        document.querySelector("#TV-PM-message-textarea").innerText = ""; // Clean TextArea
        let new_msg_id = AF.generate_random_id();

        axios.post('/tickets/update/single/messages/set', { message: message, message_id: new_msg_id, ticket_id: ticket_id })
        .then((res) => { console.log(res.data);
            AF.show_and_fade_success_icon();
            window.__was_ticket_interacted = true;

            updateMessages([...messages, {
                message_owner_name: userData.name,
                message_owner:      userData.id,
                date_casual_format: String(new Date()),
                message:            message,
                status:             "alive",
                id:                 new_msg_id
            }])
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
            <div id="TV-PM-submit-button-direct-container">
                <img status="off" alt="success message placed icon" src="/imgs/general/success.gif"/>
                <button onClick={set_message}>{texts.place_message[language]}</button>
            </div>
        </div>
    </div>
  )
}

export default PlaceMessage