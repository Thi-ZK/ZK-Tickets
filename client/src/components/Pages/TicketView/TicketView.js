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
	const all_tickets        = allPopulationData.allTickets;
	const update_all_tickets = allPopulationData.update_all_tickets;
	const userData           = allPopulationData.userData;
	const language           = allPopulationData.language;
	const usersNamesWithIds  = allPopulationData.usersNamesWithIds;

	// Alias For Cleaner Code
	const { ticket_id } = useParams();
	const ticket_data = all_tickets.filter((elem) => {return elem.id === Number(ticket_id)})[0];

	// Messages State Declaration
	const [messages, updateMessages] = useState(ticket_data.messages);
	const messages_utils = {messages: messages, updateMessages: updateMessages, language: language};

	// Assigneds State Declaration | assigneds and assumers are the same thing.
	const [assigneds, updateAssigneds] = useState(ticket_data.assumers_names);
	const assignedsUtils = {assigneds: assigneds, updateAssigneds: updateAssigneds, language: language};
	
	if (ticket_id > 5000) { window.location.href = "/ticket_does_not_exist";}
	
	// Updating Messages, Assigneds & All Mutable States.
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { update_all_tickets(); }, [messages, assigneds]);

  	return (
    <>
	<div id="second-block-container" ticket-id={ticket_id}>
		<div id="history-log-container">
			<div id="log-history-title-container">
				<div id="ticket-view-ticket-title">
					<h2>{ticket_data.name}</h2>
					<img className="ticket-view-icon" alt="lock icon" src={"/imgs/general/" + ticket_data.status + "_ticket_icon.png"}/>
				</div>
				<TicketOverviewInformation usersNamesWithIds={usersNamesWithIds
				} assignedsUtils={assignedsUtils} ticket_data={ticket_data}></TicketOverviewInformation>
			</div>
			<div className='line-breaker-styled'>
				<div className='lns-centerizer'>
					<p></p>
				</div>
			</div>
			<div id='ticket-description-container'>
				<div id='td-title-container'>
					<h3>{texts.ticket_description[language]}:</h3>
				</div>
				<div id='td-description-direct-container'>
					<p>{ticket_data.description}</p>
				</div>
			</div>
			<div className='line-breaker-styled'>
				<div className='lns-centerizer'>
					<p></p>
				</div>
			</div>
			<div className='attachments-container'>
				<div className='attachment-title-container'>
					<h3>{texts.attachments[language]}:</h3>
				</div>
				<div className='attachment-blocks'>
				<AttachmentBlock language={language}></AttachmentBlock>
				</div>
			</div>
		</div>
		<div id="place-message-and-ticket-management-options-container">
			<div id="tv-messages-container">
				<div>
					{messages.filter((message) => {return message.status === "alive"}).map((message, index) => (
						<Message messages_utils={messages_utils} ticket_id={ticket_data.id} key={index} message_data={message} type={index % 2 === 1 ? 2 : 1}></Message>
					))}
				</div>
			</div>
			<div id="place-message-and-manage-ticket-buttons-agrouper">
				<PlaceMessage userData={userData} messages_utils={messages_utils} ticket_id={ticket_data.id}></PlaceMessage>
				<ManageTicketButtons allPopulationData={allPopulationData} ticket_data={ticket_data}></ManageTicketButtons>
			</div>
		</div>
	</div>
    </>
  	)
}

export default TicketView;