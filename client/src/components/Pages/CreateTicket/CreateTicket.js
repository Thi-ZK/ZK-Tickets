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

    // Ticket Name Error State Declaration (State Used Because Of Dynamicity Of Language)
    const [ticketNameError, updateTicketNameError] = useState("none");
        
    // Meant For The Ticket Creation Action (Request To Server -> Request To Database)
    const create_ticket = () => {
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
            axios.post('/tickets/create/single', new_ticket).then((res) => { console.log(res.data); });
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
    <div id="create-ticket-container" css-marker="TC">
        <div id="TC-container-centrelizer">
            <div id="TC-title-container">
                <div className='TC-create-button-direct-container'>
                    <button onClick={create_ticket}>{texts.create_ticket[language]}</button>
                </div>
                <div id='TC-title-direct-container'>
                    <img status="off" className='TC-success-gif' alt="flying_witch" src="/imgs/general/success.gif"/>
                    <img status="off" className='TC-loading-gif' alt="flying_witch" src="/imgs/general/loading_mew.gif"/>
                    <h1>{texts.create_ticket[language]}</h1>
                    <img status="off" className='TC-loading-gif' alt="flying_witch" src="/imgs/general/loading_mew.gif"/>
                    <img status="off" className='TC-success-gif' alt="flying_witch" src="/imgs/general/success.gif"/>
                </div>
                <div className='TC-create-button-direct-container'>
                    <button onClick={create_ticket}>{texts.create_ticket[language]}</button>
                </div>
            </div>
            <div id="TC-inputs-container">
                <div id="TC-inputs-first-block-container" className='TC-inputs-block-container'>
                    <SelectionPiece usersNamesWithIds={usersNamesWithIds} data={AF.selection_piece_assigneds} language={language} /*Users To Be Assigned*//>
                    <SelectionPiece language={language} data={AF.selection_piece_group} /*Groups To Be Chosen*//>
                </div>
                <div id="TC-inputs-second-block-container" className='TC-inputs-block-container'>
                    <SelectionPiece language={language} data={AF.selection_piece_priority}/>
                    <SelectionPiece language={language} data={AF.selection_piece_status}/>
                </div>
            </div>
            <div id='TC-name-and-date-container'>
                <div id='TC-name-direct-container'>
                    <div className='TC-error-message-direct-container'>
                        <p>{texts.please_write_the_ticket_name[language]} <span>{texts.ticket_name[language]}</span></p>
                        <p status="off" className='TC-error-message' id='TC-ticket-name-error-message'>{texts[ticketNameError][language]}</p>
                    </div>
                    <input
                        onFocus={() => {return AF.set_ticket_name_error_message_appearence("off");}}
                        required
                        id='TC-ticket-name'
                        type='text'
                    />
                </div>
                <div id='TC-due-date-direct-container'>
                    <div id='TC-due-date-title'>{texts.select_a[language]} <span>{texts.due_date[language]}</span></div>
                    <div id='TC-due-date-chosen'
                        onClick={() => {setCalAppearence('calendar-open')}}
                        >{value ? value.toString().split(" 00")[0] : texts.click_to_pick_a_date[language]}
                    </div>
                    <Calendar className={calAppearence} onChange={onChange} value={value}/>
                </div>
            </div>
            <div id='TC-attachments-and-description-container'>
                <div className='TC-attachment-blocks-direct-container' id='TC-attachment-blocks'>
                    <p id='TC-attachment-blocks-title'>{texts.attachments[language]}:</p>
                    <AttachmentBlock language={language}/>
                </div>
                <div id='TC-description-direct-container'>
                    <div className='TC-error-message-direct-container'>
                        <p>{texts.please_write_the_ticket_description[language]} <span>{texts.ticket_description[language]}</span></p>
                        <p status="off" id='TC-description-error-message' className='TC-error-message'>{texts.description_is_too_long[language]}</p>
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