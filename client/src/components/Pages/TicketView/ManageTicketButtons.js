import React from 'react';

import texts from '../../../languages/Pages/TicketView/ManageTicketButtons.json';
import AF    from '../../../components_aux_functions/pages/ticket_view/manage_ticket_buttons.js'; // Aux Functions

function ManageTicketButtons ({ all_population_data, ticket_data_utils }) {
    // Aliases For Population Data
    const language                        = all_population_data.language;
    const userData                        = all_population_data.userData;
    const updateTicketActionModalSettings = all_population_data.updateTicketActionModalSettings;

    const ticketData       = ticket_data_utils.ticketData;
    const updateTicketData = ticket_data_utils.updateTicketData;

    // Meant For Opening Ticket Action Modal
	const open_ticket_action_modal = (action) => {
        if ( !AF.is_user_legit(ticketData.related_users, userData) ) {
            return AF.display_legitimacy_error();
        }

        AF.turn_overlay_on();

		updateTicketActionModalSettings({
			is_action_redundant:  ticketData.status.toLowerCase().includes(action.substring(0, 8)),
			text_thema:           action,
			status:               "open",
			ticket_id:            ticketData.id,
			which_action:         action,
            ticket_related_users: ticketData.related_users
		});
	}

    return (
    <div id="TV-status-action-buttons-container" css-marker="SAB">
        <div id="TV-SAB-button-groups-container">
            <div className="TV-SAB-buttons-group" index="1">
                <div>
                    <button onClick={() => open_ticket_action_modal("delete")} id="TV-SAB-delete-ticket"><span>{texts.delete[language]}</span></button>	
                </div>
                <div>
                    <button onClick={() => open_ticket_action_modal("conclude")} id="TV-SAB-conclude-ticket"><span>{texts.conclude[language]}</span></button>	
                </div>
            </div>
            <div className="TV-SAB-buttons-group" index="2">
                <div>
                    <button onClick={() => open_ticket_action_modal("block")} id="TV-SAB-block-ticket"><span>{texts.block[language]}</span></button>	
                </div>
                <div>
                    <button onClick={() => open_ticket_action_modal("homologate")} id="TV-SAB-homologate-ticket"><span>{texts.homologate[language]}</span></button>	
                </div>
            </div>
        </div>
        <input className="TV-SAB-status-updater" type="hidden" onClick={(ev) => AF.update_ticket_status(ev, ticketData, updateTicketData)}></input>
    </div>
  )
}

export default ManageTicketButtons