import { Link } from "react-router-dom";
import React, { useState } from 'react';
import texts from '../../../languages/Header/LeftHeader.json';
import ListLink from './ListLink';

const Header = ({ language }) => {
    // Arrow Images Source URL Aliases
    const left_arrow_src  = '/imgs/headers/arrow_down.png';
    const right_arrow_src = '/imgs/headers/arrow_up.png';
    
    // Meant For Standard Groups Tickets Opening (Nested Standards)
    const [stdGroupsOpeningStatus, setNewStdGroupsOpeningStatus] = useState({arrow_src: left_arrow_src, status: 'closed'});
    const manage_standard_filters_status = () => {
        let is_group_closed = stdGroupsOpeningStatus.status === "closed";

        setNewStdGroupsOpeningStatus({
            arrow_src: is_group_closed ? right_arrow_src : left_arrow_src,
            status: is_group_closed ? "opened" : "closed"
        });
    }

    // Meant For Specific (Nested My Groups) Tickets Opening
    const [mtGroupsOpeningStatus, setNewMtGroupsOpeningStatus] = useState({arrow_src: left_arrow_src, status: 'closed'});
    const manage_my_groups_status = () => {
        let is_group_closed = mtGroupsOpeningStatus.status === "closed";

        setNewMtGroupsOpeningStatus({
            arrow_src: is_group_closed ? right_arrow_src : left_arrow_src,
            status: is_group_closed ? "opened" : "closed"
        });
    }

  return (
    <header id="left-header-container" css-marker="LH">
        <div id="LH-title-direct-container">
            <h1><span>Thiago Dominicheli</span></h1>
            <p>Tickets Manager</p>
        </div>
        <div id="LH-search-container">
            <div>
                <input type="" name="" placeholder="Search a ticket..." />
            </div>
        </div>
        <nav id="LH-navigation-links-container">
            <ul>
                <ListLink link_url="/create_ticket" img_src_url="tickets/tag_icon" link_text={texts.create_ticket[language]}></ListLink>
                <ListLink link_url="/ticket_listing/all_tickets" img_src_url="tickets/tag_icon" link_text={texts.all_tickets[language]}></ListLink>
                <ListLink link_url="/ticket_listing/my_created_tickets" img_src_url="tickets/tag_icon" link_text={texts.my_created_tickets[language]}></ListLink>
                <div className="LH-links-grouper-container">
                    <div onClick={manage_standard_filters_status} className="LH-links-grouper-expander-container">
                        <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.standard_ticket_groups[language]}</p>
                            <img alt="lever-left" src={stdGroupsOpeningStatus.arrow_src}/>
                        </div>
                    </div>
                    <div status={stdGroupsOpeningStatus.status} className="LH-tickets-grouper-direct-container">
                        <ListLink link_url="/ticket_listing/all_tickets_iaa" img_src_url="tickets/tag_icon" link_text={texts.all_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/open_tickets_iaa" img_src_url="tickets/tag_icon" link_text={texts.open_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/all_deleted_tickets_iaa" img_src_url="tickets/red_tag" link_text={texts.deleted_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/concluded_tickets_iaa" img_src_url="tickets/green_tag" link_text={texts.concluded_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/blocked_tickets_iaa" img_src_url="tickets/yellow_tag" link_text={texts.blocked_tickets[language]}></ListLink>
                        <ListLink link_url="/ticket_listing/homologated_tickets_iaa" img_src_url="tickets/blue_tag" link_text={texts.homologated_tickets[language]}></ListLink>
                    </div>
                </div>
                <div className="LH-links-grouper-container">
                    <div onClick={manage_my_groups_status} className="LH-links-grouper-expander-container">
                        <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.my_ticket_groups[language]}</p>
                            <img alt="lever-left" src={mtGroupsOpeningStatus.arrow_src}/>
                        </div>
                    </div>
                    <div status={mtGroupsOpeningStatus.status} className="LH-tickets-grouper-direct-container">
                        <li>
                            <Link to="/ticket_listing/my_tickets_iaa">
                                <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                                <p>Fastshop</p>
                            </Link>
                        </li>
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