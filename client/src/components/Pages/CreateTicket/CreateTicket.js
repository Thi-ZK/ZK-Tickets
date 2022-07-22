import React, { useState } from 'react';
import SelectionPiece from './SelectionPiece';
import AttachmentBlock from '../../IndependentPieces/AttachmentBlock';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from '../../../api/axios';
import texts from '../../../languages/Pages/CreateTicket/CreateTicket.json';
import AF from '../../../components_aux_functions/pages/create_ticket/create_ticket.js'; // Aux Functions

function CreateTicket ({ allPopulationData }) {
    // User Names & IDs Alias / Also Language Alias
    const usersNamesWithIds  = allPopulationData.usersNamesWithIds;
    const language           = allPopulationData.language;
    const userData           = allPopulationData.userData;
    const update_all_tickets = allPopulationData.update_all_tickets;
    
    // Meant For Calendar
    const [calAppearence, setCalAppearence] = useState('calendar-closed');
    const [value, setValue] = useState(undefined);
    const onChange = (nextValue) => {
        setValue(nextValue);
        setCalAppearence('calendar-closed');
    }

    // Ticket Name Error State Declaration
    const [ticketNameError, updateTicketNameError] = useState("none");
        
    // Meant For The Ticket Creation Action (Request To Server -> Request To Database)
    const create_ticket = async (event) => {
        AF.set_disabled_status_on_ticket_creation_buttons(true); // True to disable.
        AF.set_loading_icon_appearence("on");

        // Getting All Inputs & New Ticket Data
        let new_ticket_data = AF.gather_new_ticket_data();

        // As The User Is The Creator Of The Ticket, He/She Is Already Related To The Ticket
        if (!new_ticket_data.assumers_names.includes(userData.name)) { // To Avoid Adding User Two Times, In Case He/She Is An Assigned
            new_ticket_data.related_users_names.push(userData.name);
            new_ticket_data.related_users_ids.push(userData.id);
        }

        let new_ticket = AF.generate_final_new_ticket(new_ticket_data);
        
        // Validations Variables Declaration
        let name_validation_regex   = /[a-zA-Z]{3,30}.*\s.*[a-zA-Z]{3,30}/;
        let is_name_too_long        = !(new_ticket_data.name.length < 200);
        let is_name_substantial     = name_validation_regex.test(new_ticket_data.name);
        let is_description_too_long = !(new_ticket_data.description.length < 4000);

        // Checking Name Validity & Length Of Description
        if (is_name_substantial && !is_name_too_long && !is_description_too_long) {
            await axios.post('/tickets/create/single', new_ticket);
            AF.display_success_icon();
            AF.reset_all_inputs(setValue); // setValue passed to reset calendar text
            update_all_tickets();
        } else { 
            // Error Feedbacks Handling Below
            if ( !is_name_substantial || is_name_too_long ) {
                AF.set_ticket_name_error_message_appearence("on");
                updateTicketNameError(!is_name_substantial ? "write_substantial_name" : "name_is_too_long");
            }

            if ( is_description_too_long ) {
                AF.set_ticket_description_error_message_appearence("on");
            }
        }
        
        AF.set_loading_icon_appearence("off");
        AF.set_disabled_status_on_ticket_creation_buttons(false); // Letting Create Ticket Buttons Enabled Again
    }
    
    return (
    <div id="create-ticket-container">
        <div id="create-ticket-container-aux">
            <div id="create-ticket-title-container">
                <div className='create-ticket-create-button-container'>
                    <button onClick={create_ticket}>{texts.create_ticket[language]}</button>
                </div>
                <div id='create-ticket-h1-container'>
                    <img status="off" className='tc-success-gif' alt="flying_witch" src="/imgs/general/success.gif"/>
                    <img status="off" className='tc-loading-gif' alt="flying_witch" src="/imgs/login/loading.gif"/>
                    <h1>{texts.create_ticket[language]}</h1>
                    <img status="off" className='tc-loading-gif' alt="flying_witch" src="/imgs/login/loading.gif"/>
                    <img status="off" className='tc-success-gif' alt="flying_witch" src="/imgs/general/success.gif"/>
                </div>
                <div className='create-ticket-create-button-container'>
                    <button onClick={create_ticket}>{texts.create_ticket[language]}</button>
                </div>
            </div>
            <div id="inputs-container">
                <div id="client-and-midias-inputs-container" className='create-ticket-inputs-pair-container'>
                    <SelectionPiece usersNamesWithIds={usersNamesWithIds} data={AF.selection_piece_assigneds} language={language}></SelectionPiece>
                    <SelectionPiece language={language} data={AF.selection_piece_group}></SelectionPiece>
                </div>
                <div id="client-and-midias-inputs-container-second" className='create-ticket-inputs-pair-container'>
                    <SelectionPiece language={language} data={AF.selection_piece_priority}></SelectionPiece>
                    <SelectionPiece language={language} data={AF.selection_piece_status}></SelectionPiece>
                </div>
            </div>
            <div id='tc-status-and-date-block'>
                <div id='tc-ticket-name-container'>
                    <div className='tc-error-message-containing-container'>
                        <p>{texts.please_write_the_ticket_name[language]} <span>{texts.ticket_name[language]}</span></p>
                        <p status="off" className='tc-error-message' id='tc-ticket-name-error-message'>{texts[ticketNameError][language]}</p>
                    </div>
                    <input
                        onFocus={() => {return AF.set_ticket_name_error_message_appearence("off");}}
                        required
                        id='ticket-name'
                        type='text'
                    />
                </div>
                <div id='tc-due-date-container'>
                    <div id='due-date-title'>{texts.select_a[language]} <span>{texts.due_date[language]}</span></div>
                    <div id='due-date-chosen'
                        onClick={() => {setCalAppearence('calendar-open')}}
                        >{value ? value.toString().split(" 00")[0] : texts.click_to_pick_a_date[language]}
                    </div>
                    <Calendar className={calAppearence} onChange={onChange} value={value}/>
                </div>
            </div>
            <div id='tc-attachments-and-create-button-container'>
                <div className='attachment-blocks' id='ct-attachment-blocks'>
                    <p id='tc-attachment-blocks-title'>{texts.attachments[language]}:</p>
                    <AttachmentBlock language={language}></AttachmentBlock>
                </div>
                <div id='tc-ticket-description-container'>
                    <div className='tc-error-message-containing-container'>
                        <p>{texts.please_write_the_ticket_description[language]} <span>{texts.ticket_description[language]}</span></p>
                        <p status="off" id='tc-description-error-message' className='tc-error-message'>{texts.description_is_too_long[language]}</p>
                    </div>
                    <textarea
                        onFocus={() => { return AF.set_ticket_description_error_message_appearence("off");}}>
                    </textarea> 
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateTicket