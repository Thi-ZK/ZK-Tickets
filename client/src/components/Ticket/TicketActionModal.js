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
        
        axios.post('/tickets/update/single/status', { new_status: new_status, ticket_id: ticket_id })
        .then((res) => { update_all_tickets(); console.log(res.data); })

        AF.close_modal(updateTicketActionModalSettings);
    }
    
    return (
        <div id="ticket-action-modal-container" css-marker="TAM" status={ticketActionModalSettings.status} which-action={ticketActionModalSettings.which_action} ticket-id={ticketActionModalSettings.ticket_id}>
            <div id="TAM-confirmation-message-container">
                <div id="TAM-title-and-close-icon-direct-container">
                    <h2>{texts.confirmation[language]}</h2>
                    <div onClick={() => AF.close_modal(updateTicketActionModalSettings)}>
                        <img alt="close icon" src="/imgs/ticket/close_grey_circle_icon.png"/>
                    </div>
                </div>

                { is_action_redundant ? (
                    <p>{texts.already_in_status[language]} "<span className="TAM-action-text">{texts[text_thema][language]}</span>"</p>
                    ) : (
                    <p>{texts.action_warning1[language]} <span className="TAM-action-text">{texts[text_thema][language]}</span> {texts.action_warning2[language]}</p>
                )}
            </div>
            <div id="TAM-action-buttons-container">
                <div id="TAM-action-buttons-direct-container">
                    <button onClick={() => AF.close_modal(updateTicketActionModalSettings)} id="TAM-cancel-button">{texts.cancel[language]}</button>
                    {is_action_redundant ? (
                    <></>
                    ) : (
                    <button onClick={update_ticket} id="TAM-proceed-button">{texts.yes_go_on[language]} {texts[text_thema][language]} </button>
                    )}
                </div>
            </div>
        </div>
    )
}
  
export default TicketActionModal;