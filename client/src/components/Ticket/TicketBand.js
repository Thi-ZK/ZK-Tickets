import React, { useState, useEffect } from "react";
import { useNavigate }                from "react-router-dom";

import texts from '../../languages/Ticket/TicketBand.json';
import AF    from '../../components_aux_functions/ticket/ticket_band.js'; // Aux Functions

const Ticket = ({ ticket_data, all_population_data }) => {
	// Aliases
	const language                        = all_population_data.language;
	const userData                        = all_population_data.userData;
	const updateTicketActionModalSettings = all_population_data.updateTicketActionModalSettings;
	const assumers_names_string           = AF.gen_string_formatted_from_array(ticket_data.assumers_names);
	const groups_names_string             = AF.gen_string_formatted_from_array(ticket_data.groups_names);

	// Meant For Front-End Performance (Not Having To Wait Until Tickets Update Request)
    const [ticketStatus, updateTicketStatus] = useState(ticket_data.status);

	// Meant For When User Clicks And Select To View A Ticket From The List
	let navigate           = useNavigate();

	let navigate_to_ticket = (event) => {
		if ( !AF.was_click_in_functional_elem(event) ) {
			navigate('/ticket_view/' + ticket_data.id);
		}
	};

	// Meant To Open Ticket Action Modal
	const open_ticket_action_modal = (event, action) => {
		if ( !AF.is_user_legit(ticket_data.related_users, userData) ) {
            return AF.display_legitimacy_error(event);
        }

		AF.turn_overlay_on();

		updateTicketActionModalSettings({
			is_action_redundant:  ticket_data.status.toLowerCase().includes(action.substring(0, 8)),
			text_thema:           action,
			status:               "open",
			ticket_id:            ticket_data.id,
			which_action:         action,
			ticket_related_users: ticket_data.related_users
		});
	}

	// Meant To Guarantee That The Status Is Always The Latest Updated (User Can Switch Pages Too Quickly)
	useEffect(() => {
        updateTicketStatus(ticket_data.status);
    }, [ticket_data]);

	// Meant For Smooth Appearence Effect Of Component Rendering
    const [ticketBandStatus, updateTicketBandStatus] = useState("off");

    useEffect(() => {
        updateTicketBandStatus("on");
    }, []);

    return (
	<div status={ticketBandStatus} onClick={navigate_to_ticket} className="ticket-band-container" id={ticket_data.id} css-marker="TB">
		<div className="TB-header">
			<div className="TB-title-container">
				<p>{ticket_data.name}</p>
				<p className="TB-ticket_id">&nbsp;-&nbsp;</p>
				<img alt="ticket status icon" src={"/imgs/general/" + ticketStatus + "_ticket_icon.png"}/>
			</div>
			<div>
				<div className="TB-intitle-management-options-direct-container">
					<span onClick={(ev) => open_ticket_action_modal(ev, "delete")} id="TB-ticket-delete" className="TB-action-options-button">{texts.delete[language]}</span>
					<span onClick={(ev) => open_ticket_action_modal(ev, "conclude")} id="TB-ticket-conclude" className="TB-action-options-button">{texts.conclude[language]}</span>
					<span onClick={(ev) => open_ticket_action_modal(ev, "block")} id="TB-ticket-block" className="TB-action-options-button">{texts.block[language]}</span>
					<span onClick={(ev) => open_ticket_action_modal(ev, "homologate")} id="TB-ticket-homologate" className="TB-action-options-button">{texts.homologate[language]}</span>
				</div>
				<div className="TB-intitle-legitimacy-error-direct-container">
					<span>{texts.not_allowed[language]}</span>
				</div>
			</div>
		</div>
		<div className="TB-content-block-container">
			<div className="TB-photo-and-personal-identification-container">
				<img alt="person / user pic" src={"/imgs/general/users_photos/" + AF.generate_ticket_creator_img_src(ticket_data) + ".jpg"} onError={AF.set_anonymous_picture}/>
				<div className="TB-name-and-person-info-direct-container">
					<p className="TB-name">{texts.ticket_creator[language]}: <span>{ticket_data.creator_name}</span></p>
					<div>
						<p className="TB-ticket-id">{texts.ticket_id[language]}: <span>#{ticket_data.id}</span></p>
						<p className="TB-assigneds-names">{texts.assigneds[language]}: <span>{assumers_names_string}</span></p>
						<p className="TB-groups-names">{texts.groups[language]}: <span>{groups_names_string}</span></p>
					</div>
				</div>
			</div>
			<div className="TB-description-container">
				<div className="TB-description-direct-container">
					<h2>{texts.ticket_description[language]}:</h2>
					<p className="TB-description">{ticket_data.description.length > 200 ? (ticket_data.description.substr(0, 200) + "...") : ticket_data.description}</p>
				</div>
			</div>
			<div className="TB-statuses-and-dates-container">
				<div className="TB-statuses-and-dates-direct-container">
					<p className="TB-status-or-date">{texts.creation_date[language]}: <span>{AF.date_formatter(ticket_data.creation_date)}</span></p>
					<p className="TB-status-or-date">{texts.due_date[language]}: <span>{ticket_data.due_date ? AF.date_formatter(ticket_data.due_date) : "--"}</span></p>
					<p className="TB-status-or-date">{texts.last_updated[language]}: <span>{AF.date_formatter(ticket_data.updatedAt)}</span></p>
					<p className="TB-status-or-date">Status: <span>{texts[ticketStatus][language]}</span></p>
					<p className="TB-status-or-date">{texts.priority[language]}: <span>{texts[ticket_data.priority][language]}</span></p>
				</div>
			</div>
		</div>
		<div className="TB-description-container" screen-type="mob">
			<div className="TB-description-direct-container">
				<h2>{texts.ticket_description[language]}:</h2>
				<p className="TB-description">{ticket_data.description.length > 200 ? (ticket_data.description.substr(0, 200) + "...") : ticket_data.description}</p>
			</div>
		</div>
		<input className="TB-status-updater" type="hidden" onClick={(ev) => AF.update_ticket_status(ev, updateTicketStatus)}></input>
	</div>
    )
}
  
export default Ticket;