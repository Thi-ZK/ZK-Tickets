import React from 'react';
import axios from '../../../api/axios';
import texts from '../../../languages/Pages/TicketView/PlaceMessage.json';
import AF from '../../../components_aux_functions/pages/ticket_view/place_message.js'; // Aux Functions

function PlaceMessage({ ticket_id, messages_utils, userData }) {
    // Messages Aliases
    const messages       = messages_utils.messages;
    const updateMessages = messages_utils.updateMessages;
    const language       = messages_utils.language;

    // Meant For Setting Messages
    const set_message = () => {
        let message = document.querySelector("#textarea-div").innerText;
        if (!message) { return; }
        
        document.querySelector("#textarea-div").innerText = ""; // Clean TextArea
        let new_msg_id = AF.generate_random_id();

        axios.post('/tickets/update/single/messages/set/' + ticket_id, {message: message, message_id: new_msg_id})
        .then(() => {
            AF.show_and_fade_success_icon();
            updateMessages([...messages, {
                message_owner_name: userData.name,
                message_owner: userData.id,
                date_casual_format: String(new Date()),
                message: message,
                status: "alive",
                id: new_msg_id
            }])
        })
    } 
    
  return (
    <div id="place-message-container">
        <div id="place-message-title-container">
            <p>{texts.place_a_message_below[language]}</p>
            <img alt="etwas" src="/imgs/home/ticket_management.png"/>
        </div>
        <div id="place-message-message-container">
            <div id="message-textarea-container">
                <div suppressContentEditableWarning={true} contentEditable="true" id="textarea-div">
                    <img alt="arrow img in place message" src="/imgs/home/arrow.png"/>
                </div>
            </div>
            <div id="place-message-button-container">
                <img status="off" alt="success message placed icon" src="/imgs/general/success.gif"/>
                <button onClick={set_message}>{texts.place_message[language]}</button>
            </div>
        </div>
    </div>
  )
}

export default PlaceMessage