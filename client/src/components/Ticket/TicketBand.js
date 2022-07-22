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
		if (elem_class !== "ticket-band-options-buttons") {
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
	<div onClick={navigate_to_ticket} className="main-content-first-block">
		<div id="first-block-title-container">
			<div className="first-block-title-container-aux">
				<p>{ticket_data.name}</p>
				<p className="ticket_id">&nbsp;-&nbsp;</p>
				<img alt="ticket status icon" src={"/imgs/general/" + ticket_data.status + "_ticket_icon.png"}/>
			</div>
			<div id="first-block-intitle-ticket-management-options">
				<span onClick={() => open_ticket_action_modal("delete")} id="ticket-delete" className="ticket-band-options-buttons">{texts.delete[language]}</span>
				<span onClick={() => open_ticket_action_modal("conclude")} id="ticket-conclude" className="ticket-band-options-buttons">{texts.conclude[language]}</span>
				<span onClick={() => open_ticket_action_modal("block")} id="ticket-block" className="ticket-band-options-buttons">{texts.block[language]}</span>
				<span onClick={() => open_ticket_action_modal("homologate")} id="ticket-homologate" className="ticket-band-options-buttons">{texts.homologate[language]}</span>
			</div>
		</div>
		<div className="first-block-main-info">
			<div id="photo-and-personal-identification-container">
				<img alt="person / user pic" src="/imgs/home/honeybaby.jpg"/>
				<div className="name-and-person-info">
					<p className="name">{texts.ticket_creator[language]}: <span>{ticket_data.creator_name}</span></p>
					<div>
						<p className="other">{texts.ticket_id[language]}: <span>#{ticket_data.id}</span></p>
						<p className="other">{texts.assigneds[language]}: <span>{ticket_data.assumers_names.join(", ")}</span></p>
						<p className="other">{texts.groups[language]}: <span>{ticket_data.groups_names.join(", ")}</span></p>
					</div>
				</div>
			</div>
			<div className="ticket-description-direct">
				<div>
					<h2>{texts.ticket_description[language]}:</h2>
					<p className="description-itself">{ticket_data.description}</p>
				</div>
			</div>
			<div id="ticket-descriptions-container">
				<div className="first-description-block">
					<p className="description-piece">{texts.creation_date[language]}: <span>{AF.date_formatter(ticket_data.creation_date)}</span></p>
					<p className="description-piece">{texts.due_date[language]}: <span>{ticket_data.due_date ? AF.date_formatter(ticket_data.due_date) : "--"}</span></p>
					<p className="description-piece">{texts.last_updated[language]}: <span>{AF.date_formatter(ticket_data.updatedAt)}</span></p>
					<p className="description-piece">Status: <span>{texts[ticket_data.status][language]}</span></p>
					<p className="description-piece">{texts.priority[language]}: <span>{texts[ticket_data.priority][language]}</span></p>
				</div>
			</div>
		</div>
	</div>
    )
}
  
export default Ticket;