import React from 'react';
import texts from '../../../languages/Pages/TicketView/ManageTicketButtons.json';
import AF from '../../../components_aux_functions/pages/ticket_view/manage_ticket_buttons.js'; // Aux Functions

function ManageTicketButtons ({ ticket_data, allPopulationData }) {
    // Aliases For Population Data
    const language                        = allPopulationData.language;
    const updateTicketActionModalSettings = allPopulationData.updateTicketActionModalSettings;

    // Meant For Opening Ticket Action Modal
	const open_ticket_action_modal = (action) => {
		AF.turn_overlay_on();

		updateTicketActionModalSettings({
			is_action_redundant: ticket_data.status.toLowerCase().includes(action.substring(0, 8)),
			text_thema: action,
			status: "open",
			ticket_id: ticket_data.id,
			which_action: action
		});
	}

    return (
    <div id="TV-status-action-buttons-container" css-marker="SAB">
        <div id="TV-SAB-button-groups-container">
            <div className="TV-SAB-buttons-group">
                <div>
                    <button onClick={() => open_ticket_action_modal("delete")} id="TV-SAB-delete-ticket"><span>{texts.delete[language]}</span></button>	
                </div>
                <div>
                    <button onClick={() => open_ticket_action_modal("conclude")} id="TV-SAB-conclude-ticket"><span>{texts.conclude[language]}</span></button>	
                </div>
            </div>
            <div className="TV-SAB-buttons-group">
                <div>
                    <button onClick={() => open_ticket_action_modal("block")} id="TV-SAB-block-ticket"><span>{texts.block[language]}</span></button>	
                </div>
                <div>
                    <button onClick={() => open_ticket_action_modal("homologate")} id="TV-SAB-homologate-ticket"><span>{texts.homologate[language]}</span></button>	
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageTicketButtons