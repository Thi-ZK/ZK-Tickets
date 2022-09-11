import React, { useState } from 'react';
import texts               from '../../../languages/Header/LeftHeader.json';
import AF                  from '../../../components_aux_functions/headers/left_header.js'; // Aux Functions

import ListLink       from './ListLink';
import FilterCheckbox from './FilterCheckbox';
import MiniTicketBand from './MiniTicketBand';

const Header = ({ allPopulationData }) => {
    // Aliases
    const language             = allPopulationData.language;
    const allTickets           = allPopulationData.allTickets;
    const ticketGroups         = allPopulationData.ticketGroups;
    const ticket_groups_names  = ticketGroups ? Object.values(ticketGroups) : [];

    // Utils Alias For Filter Checkbox
    const listing_filters_utils = {
        listingFilters:       allPopulationData.listingFilters,
        updateListingFilters: allPopulationData.updateListingFilters
    };

    // Search State & onChange Handler
    const [searchBarTerm, updateSearchBarTerm] = useState("");
    const update_search_bar_state = (event) => {
        updateSearchBarTerm(event.target.value);
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
                return AF.is_term_part_of_ticket_id_or_name(ticket, searchBarTerm);
            }).map((ticket, index) => {
                return <MiniTicketBand key={index} ticket_data={ticket} language={language}/>
            })}
        </div>
        <nav id="LH-navigation-links-container">
            <ul>
                <ListLink link_url="/create_ticket"  img_src_url="tickets/tag_icon" link_text={texts.create_ticket[language]}/>
                <ListLink link_url="/ticket_listing" img_src_url="ticket_listing" link_text={texts.ticket_listing[language]}/>
                {/* "Tickets I Am Assigned" */}
                <div className="LH-links-grouper-container">
                    <div onClick={AF.switch_grouper_open_status} className="LH-links-grouper-expander-container">
                        <img alt="filter icon" src="/imgs/headers/filter_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.listing_filters[language]}</p>
                            <img alt="lever-left" src='/imgs/headers/arrow_down.png'/>
                        </div>
                    </div>
                    <div status="closed" className="LH-tickets-grouper-direct-container">
                        <FilterCheckbox which_filter={"My Created"}       li_class={"LH-filter-checkbox-list-item"} listing_filters_utils={listing_filters_utils} type="tree-main"/>
                        <FilterCheckbox which_filter={"'Assigned To Me'"} li_class={"LH-filter-checkbox-list-item"} listing_filters_utils={listing_filters_utils} type="tree-main"/>
                        <FilterCheckbox which_filter={"Open"}             li_class={"LH-filter-checkbox-list-item"} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Deleted"}          li_class={"LH-filter-checkbox-list-item"} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Concluded"}        li_class={"LH-filter-checkbox-list-item"} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Blocked"}          li_class={"LH-filter-checkbox-list-item"} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Homologation"}     li_class={"LH-filter-checkbox-list-item"} listing_filters_utils={listing_filters_utils} type="status"/>
                    </div>
                </div>
                {/* "Ticket Groups" */}
                <div className="LH-links-grouper-container">
                    <div onClick={AF.switch_grouper_open_status} className="LH-links-grouper-expander-container">
                    <img alt="filter icon" src="/imgs/headers/filter_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.groups_filters[language]}</p>
                            <img alt="lever-left" src='/imgs/headers/arrow_down.png'/>
                        </div>
                    </div>
                    <div status="closed" className="LH-tickets-grouper-direct-container">
                        {ticket_groups_names.map((group_name, index) => {
                            return <ListLink key={index} link_url={"/ticket_listing/groups/" + group_name} img_src_url="tickets/tag_icon" link_text={group_name}/>
                        })}
                    </div>
                </div>
                <ListLink link_url="/profile"       img_src_url="profile"   link_text={texts.profile_and_settings[language]}/>
                <ListLink link_url="/help_and_info" img_src_url="help_icon" link_text={texts.help_and_info[language]}/>
            </ul>
        </nav>
    </header>
    )
}

export default Header;