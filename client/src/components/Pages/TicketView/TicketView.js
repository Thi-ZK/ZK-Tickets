import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import texts from '../../../languages/Pages/TicketView/TicketView.json';

import AttachmentBlock from '../../IndependentPieces/AttachmentBlock';
import Message from './Message';
import ManageTicketButtons from "./ManageTicketButtons";
import PlaceMessage from "./PlaceMessage";
import TicketOverviewInformation from "./TicketOverviewInformation";

function TicketView({ allPopulationData }) {
	// Population Data Alias
	const allTickets         = allPopulationData.allTickets;
	const update_all_tickets = allPopulationData.update_all_tickets;
	const userData           = allPopulationData.userData;
	const language           = allPopulationData.language;
	const usersNamesWithIds  = allPopulationData.usersNamesWithIds;

	// Aliases For Specific Ticket Being Viewed Data
	const { ticket_id } = useParams();
	const ticket_data = allTickets.filter((elem) => {return elem.id === Number(ticket_id)})[0];

	// Messages State Declaration
	const [messages, updateMessages] = useState(ticket_data.messages);
	const messages_utils = {messages: messages, updateMessages: updateMessages, language: language};

	// Assigneds State Declaration | assigneds and assumers are the same thing.
	const [assigneds, updateAssigneds] = useState(ticket_data.assumers_names);
	const assigneds_utils = {assigneds: assigneds, updateAssigneds: updateAssigneds, language: language};
	
	if (ticket_id > 5000) { window.location.href = "/ticket_does_not_exist";}
	
	// Brings Tickets From DB To Update Messages & Assigneds - Whenever User Performs Action.
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { update_all_tickets(); }, [messages, assigneds]);

  	return (
    <>
	<div id="ticket-view-container" css-marker="TV" ticket-id={ticket_id}>
		<div id="TV-description-attachments-and-info-container" eye-helper="FIRST-LEFT-BLOCK">
			<div id="TV-title-and-info-container">
				<div id="TV-title-direct-container">
					<h2>{ticket_data.name}</h2>
					<img className="TV-title-icon" alt="lock icon" src={"/imgs/general/" + ticket_data.status + "_ticket_icon.png"}/>
				</div>
				<TicketOverviewInformation usersNamesWithIds={usersNamesWithIds} assigneds_utils={assigneds_utils} ticket_data={ticket_data}></TicketOverviewInformation>
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
		<div id="TV-place-message-and-ticket-management-options-container" eye-helper="SECOND-RIGHT-BLOCK">
			<div id="TV-messages-direct-container" css-marker="MSG">
				{messages.filter((message) => {return message.status === "alive"}).map((message, index) => (
					<Message userData={userData} messages_utils={messages_utils} ticket_id={ticket_data.id} key={index} message_data={message} type={index % 2 === 1 ? 2 : 1}></Message>
				))}
			</div>
			<div id="TV-place-message-and-manage-ticket-buttons">
				<PlaceMessage userData={userData} messages_utils={messages_utils} ticket_id={ticket_data.id}></PlaceMessage>
				<ManageTicketButtons allPopulationData={allPopulationData} ticket_data={ticket_data}></ManageTicketButtons>
			</div>
		</div>
	</div>
    </>
  	)
}

export default TicketView;