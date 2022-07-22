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
    <header id="left-header-container">
        <div id="left-header-title-container">
            <h1>
                <span style={{color: 'rgb(230, 230, 230)'}}></span>
                <span>Thiago Dominicheli</span>
            </h1>
            <p>Tickets Manager</p>
        </div>
        <div id="left-header-search-container">
            <div>
                <input type="" name="" placeholder="Search a ticket..." />
            </div>
        </div>
        <nav id="left-header-navigation-options-container">
            <ul>
                <ListLink li_id="create-ticket" link_url="/create_ticket" img_src_url="tickets/tag_icon" link_text={texts.create_ticket[language]}></ListLink>
                <ListLink li_id="all-tickets" link_url="/ticket_listing/all_tickets" img_src_url="tickets/tag_icon" link_text={texts.all_tickets[language]}></ListLink>
                <ListLink li_id="my-created-tickets" link_url="/ticket_listing/my_created_tickets" img_src_url="tickets/tag_icon" link_text={texts.my_created_tickets[language]}></ListLink>
                <div className="lh-tickets-group-container" id="lh-standard-tickets-group-container">
                    <div onClick={manage_standard_filters_status} className="lh-tickets-group-expander-container">
                        <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                        <div className="lh-tickets-group-lever-img-direct-container">
                            <p>{texts.standard_ticket_groups[language]}</p>
                            <img alt="lever-left" src={stdGroupsOpeningStatus.arrow_src}/>
                        </div>
                    </div>
                    <div open-status={stdGroupsOpeningStatus.status} className="lh-tickets-group-direct-container">
                        <ListLink li_id="my-tickets" link_url="/ticket_listing/all_tickets_iaa" img_src_url="tickets/tag_icon" link_text={texts.all_tickets[language]}></ListLink>
                        <ListLink li_id="open-tickets" link_url="/ticket_listing/open_tickets_iaa" img_src_url="tickets/tag_icon" link_text={texts.open_tickets[language]}></ListLink>
                        <ListLink li_id="all-deleted-tickets" link_url="/ticket_listing/all_deleted_tickets_iaa" img_src_url="tickets/red_tag" link_text={texts.deleted_tickets[language]}></ListLink>
                        <ListLink li_id="concluded-tickets" link_url="/ticket_listing/concluded_tickets_iaa" img_src_url="tickets/green_tag" link_text={texts.concluded_tickets[language]}></ListLink>
                        <ListLink li_id="blocked-tickets" link_url="/ticket_listing/blocked_tickets_iaa" img_src_url="tickets/yellow_tag" link_text={texts.blocked_tickets[language]}></ListLink>
                        <ListLink li_id="homologated-tickets" link_url="/ticket_listing/homologated_tickets_iaa" img_src_url="tickets/blue_tag" link_text={texts.homologated_tickets[language]}></ListLink>
                    </div>
                </div>
                <div className="lh-tickets-group-container" id="lh-specific-tickets-group-container">
                    <div onClick={manage_my_groups_status} className="lh-tickets-group-expander-container">
                        <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                        <div className="lh-tickets-group-lever-img-direct-container">
                            <p>{texts.my_ticket_groups[language]}</p>
                            <img alt="lever-left" src={mtGroupsOpeningStatus.arrow_src}/>
                        </div>
                    </div>
                    <div open-status={mtGroupsOpeningStatus.status} className="lh-tickets-group-direct-container">
                        <li id="my-tickets">
                            <Link to="/ticket_listing/my_tickets_iaa">
                                <img alt="ticket icon" src="/imgs/headers/tickets/tag_icon.png"/>
                                <p>Fastshop</p>
                            </Link>
                        </li>
                    </div>
                </div>
                <ListLink li_id="header-profile" link_url="/profile" img_src_url="profile" link_text={texts.profile_and_settings[language]}></ListLink>
                <ListLink li_id="header-help-and-info" link_url="/help_and_info" img_src_url="help_icon" link_text={texts.help_and_info[language]}></ListLink>
            </ul>
        </nav>
    </header>
  )
}

export default Header