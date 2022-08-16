import React           from 'react';
import { useNavigate } from "react-router-dom";

function MiniTicketBand({ ticket_data }) {
    const navigate = useNavigate();
    const navigate_to_ticket = () => {
        navigate('/ticket_view/' + ticket_data.id);
    }

    return (
    <div onClick={navigate_to_ticket} className="LH-filtered-mini-ticket-band" css-marker="FTB" status={ticket_data.status.toLowerCase()}>
        <div className="LH-FTB-title-direct-container">
            <h3>{ticket_data.name}</h3>
            <p>ID: <span>#{ticket_data.id}</span></p>
        </div>
        <div className="LH-FTB-general-infos-container">
            <div>
                Assumers:
                <span>{ticket_data.assumers_names.join(", ")}</span>
            </div>
        </div>
    </div>
    )
}

export default MiniTicketBand