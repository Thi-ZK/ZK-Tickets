import axios from '../../api/axios';
import texts from '../../languages/Ticket/TicketActionModal.json';
import AF from '../../components_aux_functions/ticket/ticket_action_modal'; // Aux Functions

const TicketActionModal = ({ allPopulationData }) => {
    // General Aliases
    const update_all_tickets = allPopulationData.update_all_tickets;
    const language           = allPopulationData.language;

    // Ticket Action Modal Aliases
    const ticketActionModalSettings       = allPopulationData.ticketActionModalSettings;
    const updateTicketActionModalSettings = allPopulationData.updateTicketActionModalSettings;
    const text_thema                      = ticketActionModalSettings.text_thema;
    const is_action_redundant             = ticketActionModalSettings.is_action_redundant;

    // Meant For Updating The Ticket In The Server -> Database
    const update_ticket = () => {
        let ticket_id = ticketActionModalSettings.ticket_id;
        let new_status = {conclude: "Concluded", block: "Blocked", homologate: "Homologation", delete: "Deleted"}[ticketActionModalSettings.which_action];
        
        axios.post('/tickets/update/single/status/' + ticket_id, { new_status: new_status })
        .then(() => {update_all_tickets();})

        AF.close_modal(updateTicketActionModalSettings);
    }
    
    return (
        <div id="ticket-management-button-modal-container" status={ticketActionModalSettings.status} which-action={ticketActionModalSettings.which_action} ticket-id={ticketActionModalSettings.ticket_id}>
            <div id="ticket-management-modal-first-block">
                <div id="ticket-management-modal-title-and-close-button-container">
                    <h2>{texts.confirmation[language]}</h2>
                    <div onClick={() => AF.close_modal(updateTicketActionModalSettings)}>
                        <img alt="close icon" src="/imgs/general/close-button.png"/>
                    </div>
                </div>

                { is_action_redundant ? (
                    <p>{texts.already_in_status[language]} "<span className="tam-action-text">{texts[text_thema][language]}</span>"</p>
                    ) : (
                    <p>{texts.action_warning1[language]} <span className="tam-action-text">{texts[text_thema][language]}</span> {texts.action_warning2[language]}</p>
                )}
            </div>
            <div id="ticket-management-modal-second-block">
                <div id="ticket-management-modal-buttons-container">
                    <button onClick={() => AF.close_modal(updateTicketActionModalSettings)} id="ticket-management-modal-button-cancel">{texts.cancel[language]}</button>
                    {is_action_redundant ? (
                    <></>
                    ) : (
                    <button onClick={update_ticket} id="ticket-management-modal-button-proceed">{texts.yes_go_on[language]} {texts[text_thema][language]} </button>
                    )}
                </div>
            </div>
        </div>
    )
}
  
export default TicketActionModal;