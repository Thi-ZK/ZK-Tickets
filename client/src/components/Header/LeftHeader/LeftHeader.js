import React, { useState } from 'react';
import texts               from '../../../languages/Header/LeftHeader.json';

import ListLink            from './ListLink';
import MiniTicketBand      from './MiniTicketBand';

const Header = ({ language, allTickets, ticketGroups }) => {
    // Arrow Images Source URL Aliases
    const left_arrow_src  = '/imgs/headers/arrow_down.png';
    const right_arrow_src = '/imgs/headers/arrow_up.png';

    // Ticket Groups Alias
    const ticket_groups_names = ticketGroups ? Object.values(ticketGroups) : [];

    // Search State & onChange Handler
    const [searchBarTerm, updateSearchBarTerm] = useState("");
    const update_search_bar_state = (event) => {
        updateSearchBarTerm(event.target.value);
    }

    // Meant For Standard Groups Tickets Opening (Nested Standards)
    const [stdGroupsOpeningStatus, setNewStdGroupsOpeningStatus] = useState({arrow_src: left_arrow_src, status: 'closed'});
    const manage_standard_filters_status = () => {
        let is_group_closed = stdGroupsOpeningStatus.status === "closed";

        setNewStdGroupsOpeningStatus({
            arrow_src: is_group_closed ? right_arrow_src : left_arrow_src,
            status:    is_group_closed ? "opened" : "closed"
        });
    }

    // Meant For Specific (Nested My Groups) Tickets Opening
    const [mtGroupsOpeningStatus, setNewMtGroupsOpeningStatus] = useState({arrow_src: left_arrow_src, status: 'closed'});
    const manage_my_groups_status = () => {
        let is_group_closed = mtGroupsOpeningStatus.status === "closed";

        setNewMtGroupsOpeningStatus({
            arrow_src: is_group_closed ? right_arrow_src : left_arrow_src,
            status:    is_group_closed ? "opened" : "closed"
        });
    }

    // Search Handler - Cleans The Search
    const clean_search = () => {
        document.querySelector("#LH-search-container input").value = "";
        updateSearchBarTerm("");
    }

  return (
    <header id="left-header-container" css-marker="LH" mob-status="closed">
        <div id="LH-title-direct-container">
            <h1><span>Thiago Dominicheli</span></h1>
            <p>Tickets Manager</p>
        </div>
        <div id="LH-search-container">
            <div>
                <input type="text" name="" placeholder={texts.search_a_ticket[language]} onChange={update_search_bar_state}/>
                <img onClick={clean_search} className='LH-delete-icon' alt="delete red icon on search" src='/imgs/general/red_x_delete_icon.png'/>
            </div>
        </div>
        {/* Search Logic */}
        <div id="LH-filtered-mini-ticket-bands-direct-container">
            {allTickets.filter((ticket) => {
                let name = ticket.name.toLowerCase();
                let id   = ticket.id.toString();
                let term = searchBarTerm.toLowerCase();
                
                if (term && ((name.includes(term)) || (id.includes(term)))) {
                    return ticket;
                }

                return false;
            }).map((ticket, index) => {
                return <MiniTicketBand key={index} ticket_data={ticket} language={language}/>
            })}
        </div>
        <nav id="LH-navigation-links-container">
            <ul>
                <ListLink link_url="/create_ticket" img_src_url="tickets/tag_icon" link_text={texts.create_ticket[language]}></ListLink>
                <ListLink link_url="/ticket_listing/all" img_src_url="tickets/tag_icon" link_text={texts.all_tickets[language]}></ListLink>
                <ListLink link_url="/ticket_listing/created_by_me" img_src_url="tickets/tag_icon" link_text={texts.my_created_tickets[language]}></ListLink>
                {/* "Tickets I Am Assigned" */}
                <div className="LH-links-grouper-container">
                    <div onClick={manage_standard_filters_status} className="LH-links-grouper-expander-container">
                        <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.standard_ticket_groups[language]}</p>
                            <img alt="lever-left" src={stdGroupsOpeningStatus.arrow_src}/>
                        </div>
                    </div>
                    <div status={stdGroupsOpeningStatus.status} className="LH-tickets-grouper-direct-container">
                        <ListLink link_url="/ticket_listing/i_am_assigned/all" img_src_url="tickets/tag_icon" link_text={texts.all_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/i_am_assigned/open" img_src_url="tickets/tag_icon" link_text={texts.open_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/i_am_assigned/deleted" img_src_url="tickets/red_tag" link_text={texts.deleted_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/i_am_assigned/concluded" img_src_url="tickets/green_tag" link_text={texts.concluded_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/i_am_assigned/blocked" img_src_url="tickets/yellow_tag" link_text={texts.blocked_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/i_am_assigned/homologation" img_src_url="tickets/blue_tag" link_text={texts.homologated_tickets[language]}></ListLink>
                    </div>
                </div>
                {/* "Ticket Groups" */}
                <div className="LH-links-grouper-container">
                    <div onClick={manage_my_groups_status} className="LH-links-grouper-expander-container">
                        <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.my_ticket_groups[language]}</p>
                            <img alt="lever-left" src={mtGroupsOpeningStatus.arrow_src}/>
                        </div>
                    </div>
                    <div status={mtGroupsOpeningStatus.status} className="LH-tickets-grouper-direct-container">
                        {ticket_groups_names.map((group_name, index) => {
                            return <ListLink key={index} link_url={"/ticket_listing/groups/" + group_name} img_src_url="tickets/tag_icon" link_text={group_name}></ListLink>
                        })}
                    </div>
                </div>
                <ListLink link_url="/profile" img_src_url="profile" link_text={texts.profile_and_settings[language]}></ListLink>
                <ListLink link_url="/help_and_info" img_src_url="help_icon" link_text={texts.help_and_info[language]}></ListLink>
            </ul>
        </nav>
    </header>
  )
}

export default Header