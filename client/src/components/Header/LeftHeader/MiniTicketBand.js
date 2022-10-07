import React, { useState, useEffect } from 'react';
import { useNavigate }                from "react-router-dom";

import texts from '../../../languages/Header/MiniTicketBand.json';

function MiniTicketBand({ ticket_data, language }) {
    // Meant For When User Clicks In The Mini Ticket Band To Go To The Desired Ticket
    const navigate           = useNavigate();
    const navigate_to_ticket = () => {
        navigate('/ticket_view/' + ticket_data.id);
    }

    // Status Type (Homologation, Concluded...)
    const status_type = ticket_data.status.toLowerCase();

    // Assumers Names Concatenated By ","
    const assumers_names_string = ticket_data.assumers_names.length ? (" " + ticket_data.assumers_names.join(", ")) : " None";

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [miniTicketStatus, updateMiniTicketStatus] = useState("off");

    useEffect(() => {
        updateMiniTicketStatus("on");
    }, []);

    return (
    <div status={miniTicketStatus} onClick={navigate_to_ticket} className="LH-filtered-mini-ticket-band" css-marker="FTB" status-type={status_type}>
        <div className="LH-FTB-title-direct-container">
            <h3>{ticket_data.name}</h3>
            <p>ID: <span>#{ticket_data.id}</span></p>
        </div>
        <div className="LH-FTB-general-infos-container">
            <div>
                {ticket_data.assumers_names.length > 1 ? texts.assigneds_plural[language] : texts.assigneds[language]}:
                <span>{assumers_names_string.length > 56 ? (assumers_names_string.substring(0, 56) + "...") : assumers_names_string}</span>
            </div>
        </div>
    </div>
    )
}

export default MiniTicketBand