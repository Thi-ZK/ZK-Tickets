import React, { useState } from 'react';
import texts               from '../../../languages/Header/LeftHeader.json';
import AF                  from '../../../components_aux_functions/headers/left_header.js'; // Aux Functions

import ListLink       from './ListLink';
import FilterCheckbox from './FilterCheckbox';
import MiniTicketBand from './MiniTicketBand';

const Header = ({ all_population_data }) => {
    // Aliases
    const language     = all_population_data.language;
    const allTickets   = all_population_data.allTickets;
    const ticketGroups = all_population_data.ticketGroups;

    // Utils Alias For Filter Checkbox
    const listing_filters_utils = {
        listingFilters:       all_population_data.listingFilters,
        updateListingFilters: all_population_data.updateListingFilters
    };

    // Search State & onChange Handler
    const [searchBarTerm, updateSearchBarTerm] = useState("");

    const update_search_bar_state = (event) => {
        updateSearchBarTerm(event.target.value);
    }

    // Search Handler - Cleans The Search
    const clean_search = async () => {
        AF.clean_search_input();
        await AF.fade_shown_tickets();

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
                return (index < 7) ? <MiniTicketBand key={index} ticket_data={ticket} language={language}/> : null;
            })}
        </div>

        <nav id="LH-navigation-links-container">
            <ul>
                <ListLink link_url="/create_ticket"  img_src_url="tickets/tag_icon" link_text={texts.create_ticket[language]}/>
                <ListLink link_url="/ticket_listing" img_src_url="ticket_listing" link_text={texts.ticket_listing[language]}/>

                {/* Listing Filters */}

                <div className="LH-links-grouper-container">
                    <div onClick={AF.switch_grouper_open_status} className="LH-links-grouper-expander-container">
                        <img alt="filter icon" src="/imgs/headers/filter_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.listing_filters[language]}</p>
                            <img alt="lever-left" src='/imgs/headers/arrow_down.png'/>
                        </div>
                    </div>
                    <div status="closed" className="LH-tickets-grouper-direct-container">
                        <FilterCheckbox which_filter={"My Created"}       language={language} listing_filters_utils={listing_filters_utils} type="tree-main"/>
                        <FilterCheckbox which_filter={"'Assigned To Me'"} language={language} listing_filters_utils={listing_filters_utils} type="tree-main"/>
                        <FilterCheckbox which_filter={"Open"}             language={language} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Deleted"}          language={language} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Concluded"}        language={language} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Blocked"}          language={language} listing_filters_utils={listing_filters_utils} type="status"/>
                        <FilterCheckbox which_filter={"Homologation"}     language={language} listing_filters_utils={listing_filters_utils} type="status"/>
                    </div>
                </div>

                {/* Groups Filters */}
                
                <div className="LH-links-grouper-container">
                    <div onClick={AF.switch_grouper_open_status} className="LH-links-grouper-expander-container">
                    <img alt="filter icon" src="/imgs/headers/filter_icon.png"/>
                        <div className="LH-links-grouper-expander-direct-container">
                            <p>{texts.groups_filters[language]}</p>
                            <img alt="lever-left" src='/imgs/headers/arrow_down.png'/>
                        </div>
                    </div>
                    <div status="closed" className="LH-tickets-grouper-direct-container">
                        {ticketGroups && ticketGroups.map((group, index) => {
                            return <FilterCheckbox which_filter={group.name} language={language} listing_filters_utils={listing_filters_utils} type="group" key={index}/>
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