import React, { useState, useEffect } from 'react';
import axios                          from '../../../api/axios';

import                 'react-calendar/dist/Calendar.css';
import SelectionPiece  from './SelectionPiece';
import AttachmentBlock from '../../IndependentPieces/AttachmentBlock';
import Calendar        from 'react-calendar';

import texts from '../../../languages/Pages/CreateTicket/CreateTicket.json';
import AF    from '../../../components_aux_functions/pages/create_ticket/create_ticket.js'; // Aux Functions

function CreateTicket ({ all_population_data }) {
    // User Names & IDs Alias / Also Language Alias
    const usersNamesWithIds    = all_population_data.usersNamesWithIds;
    const language             = all_population_data.language;
    const userData             = all_population_data.userData;
    const update_all_tickets   = all_population_data.update_all_tickets;
    const ticketGroups         = all_population_data.ticketGroups;
    const update_ticket_groups = all_population_data.update_ticket_groups;
    
    // Meant For Calendar
    const [calendarValue, updateCalendarValue] = useState(null);

    // Ticket Name Error State Declaration (State Used Because Of Dynamicity Of Language)
    const [ticketNameError, updateTicketNameError] = useState("none");
        
    // Meant For The Ticket Creation Action (Request To Server -> Request To Database)
    const create_ticket = () => {
        if ( !AF.is_user_legit_no_strict(userData) ) {
            AF.display_legitimacy_error(updateTicketNameError);
            return;
        }

        AF.set_disabled_status_on_ticket_creation_buttons(true);
        AF.set_loading_icons_appearence("on");

        let new_ticket = AF.gather_new_ticket_data(userData);
        
        // Checking Name Validity & Length Of Description
        if ( AF.is_creation_submission_valid(new_ticket) ) {
            axios.post('/tickets/create/single', new_ticket).then((res) => { console.log(res.data);
                AF.set_loading_icons_appearence("off");
                AF.display_success_icon();

                if ( new_ticket.new_group ) {
                    update_ticket_groups();
                }

                AF.reset_all_inputs(updateCalendarValue);
                AF.set_disabled_status_on_ticket_creation_buttons(false);
                update_all_tickets();
            });
        } else {
            AF.handle_feedback_error_messages(new_ticket, updateTicketNameError);
            AF.set_loading_icons_appearence("off");
            AF.set_disabled_status_on_ticket_creation_buttons(false);
        }
    }

    // Meant For Smooth Appearence Effect Of Component Rendering
	const [createTicketContainerStatus, updateCreateTicketContainerStatus] = useState("off");

	useEffect(() => {
		updateCreateTicketContainerStatus("on");
	}, []);
    
    return (
    <div id="create-ticket-container" css-marker="TC">
        <div status={createTicketContainerStatus} id="TC-container-centrelizer">
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
                    <SelectionPiece language={language} data={AF.selection_piece_assigneds} usersNamesWithIds={usersNamesWithIds} /* Users To Be Assigned */ />
                    <SelectionPiece language={language} data={AF.selection_piece_group}     ticketGroups={ticketGroups}           /* Groups To Be Chosen */ />
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
                    <div id='TC-due-date-chosen' onClick={AF.switch_calendar_appearence}>{calendarValue ? calendarValue.toString().split(" 00")[0] : texts.click_to_pick_a_date[language]}
                    </div>
                    <Calendar className="closed" onChange={updateCalendarValue} value={calendarValue}/>
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
                        onFocus={() => AF.set_ticket_description_error_message_appearence("off")}>
                    </textarea> 
                </div>
            </div>
            <div className='TC-create-button-direct-container' screen-type="mob">
                <button onClick={create_ticket}>{texts.create_ticket[language]}</button>
            </div>
        </div>
    </div>
    )
}

export default CreateTicket