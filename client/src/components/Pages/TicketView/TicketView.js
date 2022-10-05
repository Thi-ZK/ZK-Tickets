import React, { useState, useEffect } from "react";
import { useParams }                  from "react-router-dom";

import AttachmentBlock           from '../../IndependentPieces/AttachmentBlock';
import Message                   from './Message';
import ManageTicketButtons       from "./ManageTicketButtons";
import PlaceMessage              from "./PlaceMessage";
import TicketOverviewInformation from "./TicketOverviewInformation/TicketOverviewInformation";

import texts from '../../../languages/Pages/TicketView/TicketView.json';
import AF    from '../../../components_aux_functions/pages/ticket_view/ticket_view.js'; // Aux Functions

function TicketView({ allPopulationData }) {
	// Aliases
	const allTickets           = allPopulationData.allTickets;
	const update_all_tickets   = allPopulationData.update_all_tickets;
	const update_ticket_groups = allPopulationData.update_ticket_groups;
	const userData             = allPopulationData.userData;
	const language             = allPopulationData.language;
	const { ticket_id }        = useParams();
	const ticket_data          = AF.get_ticket_data(allTickets, ticket_id);

	// Checks Ticket Legitimacy (If Not, Then Send To 404 Page)
	AF.check_ticket_legitimacy(ticket_data, ticket_id);

	// Messages State Declaration
	const [messages, updateMessages] = useState(ticket_data.messages);

	const messages_utils = { 
		messages:       messages,
		updateMessages: updateMessages,
		language:       language
	};

	// Aggregative States Declaration | assigneds And assumers Are The Same Thing.
	const [assigneds, updateAssigneds] = useState(ticket_data.assumers_names);
	const [groups, updateGroups]       = useState(ticket_data.groups_names);

	const aggregatives_utils = {
		assigneds:         assigneds,
		updateAssigneds:   updateAssigneds,
		groups:            groups,
		updateGroups:      updateGroups,
		usersNamesWithIds: allPopulationData.usersNamesWithIds,
		ticketGroups:      allPopulationData.ticketGroups
	};
	
	// Brings Fresh Tickets From DB Whenever User Performs Action (Updates The Ticket).
	useEffect(() => {
		if ( window.__was_ticket_interacted ) {
			update_all_tickets();
			update_ticket_groups();
		}

		window.__was_ticket_interacted = false; // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages, assigneds, groups]);

	// Meant For When User Goes From One Ticket To Another Directly (Bcz Component Is Not Rerendered) (Occurs In Search)
	useEffect(() => {
		updateMessages(ticket_data.messages);
		updateAssigneds(ticket_data.assumers_names);
		updateGroups(ticket_data.groups_names); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ticket_id]);

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
					<img className="TV-title-icon" alt="lock icon" src={"/imgs/general/" + ticket_data.status + "_ticket_icon.png"}/>
				</div>
				<TicketOverviewInformation aggregatives_utils={aggregatives_utils} ticket_data={ticket_data} language={language} userData={userData}/>
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
				{messages.filter((message) => {return message.status === "alive"}).map((message, index) => (
					<Message userData={userData} messages_utils={messages_utils} ticket_id={ticket_data.id} ticket_creator={ticket_data.creator} key={index} message_data={message} type={index % 2 === 1 ? 2 : 1}></Message>
				))}
			</div>
			<div id="TV-place-message-and-manage-ticket-buttons">
				<PlaceMessage userData={userData} messages_utils={messages_utils} ticket_id={ticket_data.id}></PlaceMessage>
				<ManageTicketButtons allPopulationData={allPopulationData} ticket_data={ticket_data}></ManageTicketButtons>
			</div>
		</div>
	</div>
  	)
}

export default TicketView;