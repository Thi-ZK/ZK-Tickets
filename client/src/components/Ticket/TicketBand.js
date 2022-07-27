import { useNavigate } from "react-router-dom";
import texts from '../../languages/Ticket/TicketBand.json';
import AF from '../../components_aux_functions/ticket/ticket_band.js'; // Aux Functions

const Ticket = ({ ticket_data, allPopulationData }) => {
	// Language Alias
	const language = allPopulationData.language;

	// Alias For Ticket Action Modal
	const updateTicketActionModalSettings = allPopulationData.updateTicketActionModalSettings;

	// Meant For When User Clicks And Select To View A Ticket From The List
	let navigate = useNavigate();
	let navigate_to_ticket = (event) => {
		let elem_class = event.target.className;
		if (elem_class !== "TB-action-options-button") {
			navigate('/ticket_view/' + ticket_data.id);
		}
	};

	// Meant To Open Ticket Action Modal
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
	<div onClick={navigate_to_ticket} className="ticket-band-container" css-marker="TB">
		<div id="TB-header">
			<div className="TB-title-container">
				<p>{ticket_data.name}</p>
				<p className="TB-ticket_id">&nbsp;-&nbsp;</p>
				<img alt="ticket status icon" src={"/imgs/general/" + ticket_data.status + "_ticket_icon.png"}/>
			</div>
			<div id="TB-intitle-ticket-management-options">
				<span onClick={() => open_ticket_action_modal("delete")} id="TB-ticket-delete" className="TB-action-options-button">{texts.delete[language]}</span>
				<span onClick={() => open_ticket_action_modal("conclude")} id="TB-ticket-conclude" className="TB-action-options-button">{texts.conclude[language]}</span>
				<span onClick={() => open_ticket_action_modal("block")} id="TB-ticket-block" className="TB-action-options-button">{texts.block[language]}</span>
				<span onClick={() => open_ticket_action_modal("homologate")} id="TB-ticket-homologate" className="TB-action-options-button">{texts.homologate[language]}</span>
			</div>
		</div>
		<div className="TB-content-block-container">
			<div id="TB-photo-and-personal-identification-container">
				<img alt="person / user pic" src="/imgs/ticket/dahyun_pic.jpg"/>
				<div className="TB-name-and-person-info-direct-container">
					<p className="TB-name">{texts.ticket_creator[language]}: <span>{ticket_data.creator_name}</span></p>
					<div>
						<p className="TB-ticket-id">{texts.ticket_id[language]}: <span>#{ticket_data.id}</span></p>
						<p className="TB-assigneds-names">{texts.assigneds[language]}: <span>{ticket_data.assumers_names.join(", ")}</span></p>
						<p className="TB-groups-names">{texts.groups[language]}: <span>{ticket_data.groups_names.join(", ")}</span></p>
					</div>
				</div>
			</div>
			<div className="TB-description-container">
				<div className="TB-description-direct-container">
					<h2>{texts.ticket_description[language]}:</h2>
					<p className="TB-description">{ticket_data.description}</p>
				</div>
			</div>
			<div className="TB-statuses-and-dates-container">
				<div className="TB-statuses-and-dates-direct-container">
					<p className="TB-status-or-date">{texts.creation_date[language]}: <span>{AF.date_formatter(ticket_data.creation_date)}</span></p>
					<p className="TB-status-or-date">{texts.due_date[language]}: <span>{ticket_data.due_date ? AF.date_formatter(ticket_data.due_date) : "--"}</span></p>
					<p className="TB-status-or-date">{texts.last_updated[language]}: <span>{AF.date_formatter(ticket_data.updatedAt)}</span></p>
					<p className="TB-status-or-date">Status: <span>{texts[ticket_data.status][language]}</span></p>
					<p className="TB-status-or-date">{texts.priority[language]}: <span>{texts[ticket_data.priority][language]}</span></p>
				</div>
			</div>
		</div>
	</div>
    )
}
  
export default Ticket;