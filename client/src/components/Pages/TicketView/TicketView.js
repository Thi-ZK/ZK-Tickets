import React, { useState, useEffect } from "react";
import { useParams }                  from "react-router-dom";

import AttachmentBlock           from '../../IndependentPieces/AttachmentBlock';
import Message                   from './Message';
import ManageTicketButtons       from "./ManageTicketButtons";
import PlaceMessage              from "./PlaceMessage";
import TicketOverviewInformation from "./TicketOverviewInformation/TicketOverviewInformation";

import texts from '../../../languages/Pages/TicketView/TicketView.json';
import AF    from '../../../components_aux_functions/pages/ticket_view/ticket_view.js'; // Aux Functions

function TicketView({ all_population_data }) {
	// Aliases
	const allTickets    = all_population_data.allTickets;
	const language      = all_population_data.language;
	const { ticket_id } = useParams();
	const ticket_data   = AF.get_ticket_data(allTickets, ticket_id);

	// Meant For Front-End Performance (Not Having To Wait Until Tickets Update Request)
    const [ticketData, updateTicketData] = useState(ticket_data);

	const ticket_data_utils = {
		ticketData:       ticketData,
		updateTicketData: updateTicketData
	};

	// Checks Ticket Legitimacy (If Not, Then Send To 404 Page)
	AF.check_ticket_legitimacy(ticket_data, ticket_id);

	// Meant To Always Keep The Ticket Info Update, Whenever User Browses After An Action (Example, Goes From One Ticket To Another Through Search)
	useEffect(() => {
		updateTicketData(ticket_data);
	}, [ticket_data]);

	// Meant For Smooth Appearence Effect Of Component Rendering
	const [ticketViewContainerStatus, updateTicketViewContainerStatus] = useState("off");

	useEffect(() => {
		updateTicketViewContainerStatus("on");
	}, []);

  	return (
	<div status={ticketViewContainerStatus} id="ticket-view-container" css-marker="TV" ticket-id={ticket_id}>
		<div id="TV-description-attachments-and-info-container">
			<div id="TV-title-and-info-container">
				<div id="TV-title-direct-container">
					<h2>{ticket_data.name}</h2>
					<img className="TV-title-icon" alt="lock icon" src={"/imgs/general/" + ticketData.status + "_ticket_icon.png"}/>
				</div>
				<TicketOverviewInformation ticket_data_utils={ticket_data_utils} all_population_data={all_population_data}/>
			</div>
			<div id="TV-aggregatives-legitimacy-error-direct-container" status="off">
				<p>{texts.not_allowed[language]}</p>
			</div>
			<div className='TV-line-breaker'>
				<div className='TV-line-breaker-centrelizer'>
					<p></p>
				</div>
			</div>
			<div id='TV-description-container'>
				<div id='TV-description-title-direct-container'>
					<h3>{texts.ticket_description[language]}:</h3>
				</div>
				<div id='TV-description-direct-container'>
					<p>{ticket_data.description}</p>
				</div>
			</div>
			<div className='TV-line-breaker'>
				<div className='TV-line-breaker-centrelizer'>
					<p></p>
				</div>
			</div>
			<div className='TV-attachments-container'>
				<div className='TV-attachment-title-direct-container'>
					<h3>{texts.attachments[language]}:</h3>
				</div>
				<div id='TV-attachment-blocks-direct-container'>
				<AttachmentBlock language={language}></AttachmentBlock>
				</div>
			</div>
		</div>
		<div id="TV-place-message-and-ticket-management-options-container">
			<div id="TV-messages-direct-container" css-marker="MSG">
				{ticketData.messages.filter((message) => {return message.status === "alive"}).map((message, index) => (
					<Message all_population_data={all_population_data} ticket_data_utils={ticket_data_utils} key={index} message_data={message} type={index % 2 === 1 ? 2 : 1}></Message>
				))}
			</div>
			<div id="TV-place-message-and-manage-ticket-buttons">
				<PlaceMessage        all_population_data={all_population_data} ticket_data_utils={ticket_data_utils}></PlaceMessage>
				<ManageTicketButtons all_population_data={all_population_data} ticket_data_utils={ticket_data_utils}></ManageTicketButtons>
			</div>
		</div>
	</div>
  	)
}

export default TicketView;