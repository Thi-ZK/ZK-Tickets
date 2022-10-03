import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect }             from "react";
import axios                                      from './api/axios';
import AF                                         from './components_aux_functions/app';

import Home              from './components/Pages/Home';
import Login             from './components/Pages/Login';
import TicketView        from './components/Pages/TicketView/TicketView';
import TicketListing     from './components/Pages/TicketListing/TicketListing';
import ErrorPage         from './components/Pages/ErrorPage';
import Profile           from './components/Pages/Profile/Profile';
import HelpAndInfo       from './components/Pages/HelpAndInfo';
import CreateTicket      from './components/Pages/CreateTicket/CreateTicket';
import NotAuthorized     from './components/Pages/NotAuthorized';
import LeftHeader        from './components/Header/LeftHeader/LeftHeader';
import TopHeader         from './components/Header/TopHeader';
import TicketActionModal from './components/Ticket/TicketActionModal';

function App() {
    // Ticket Action Modal State
    const [ticketActionModalSettings, updateTicketActionModalSettings] = useState({
        is_action_redundant:  false,
        ticket_related_users: [],
        which_action:         "none",
        text_thema:           "none",
        ticket_id:            "none",
        status:               "closed"
    });

    // Language State & Dark / Bright Theme
    const [language, updateLanguage]               = useState("english");
    const [brightnessTheme, updateBrightnessTheme] = useState("bright");

    // Ticket Listing Filters State
    const [listingFilters, updateListingFilters] = useState([]);

    // All Data Population States Set
    const [allTickets, updateTickets]        = useState([]);
    const update_all_tickets                 = AF.generate_update_all_tickets_function(updateTickets, axios);
    
    const [userData, updateUserData]         = useState(null); // Is An Object
    const update_user_data                   = AF.generate_update_user_data_function(updateUserData, updateBrightnessTheme, updateLanguage, axios);

    const [usersNamesWithIds, updateUsers]   = useState({});
    const update_user_names_and_ids          = AF.generate_update_user_names_and_ids_function(updateUsers, axios);

    const [ticketGroups, updateTicketGroups] = useState([]);
    const update_ticket_groups               = AF.generate_update_ticket_groups_function(updateTicketGroups, axios);
 
    // Loading All Population Data For First Time User Opens The Application Logged In (Or Refresh Page F5)
    useEffect(() => {
        update_all_tickets();
        update_user_data(true); // true To Update Lang & Brightness Theme With User Preferences When Called
        update_user_names_and_ids();
        update_ticket_groups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Utils Variable To Reduce Props Number. Could Use Contexts, But They Pollute Code Legibility Too Much For A Small Project Like Such
    const allPopulationData = {
        allTickets:                      allTickets,
        update_all_tickets:              update_all_tickets,
        userData:                        userData,
        updateUserData:                  updateUserData,
        usersNamesWithIds:               usersNamesWithIds,
        update_user_names_and_ids:       update_user_names_and_ids,
        language:                        language,
        updateLanguage:                  updateLanguage,
        ticketActionModalSettings:       ticketActionModalSettings,
        updateTicketActionModalSettings: updateTicketActionModalSettings,
        brightnessTheme:                 brightnessTheme,
        updateBrightnessTheme:           updateBrightnessTheme,
        ticketGroups:                    ticketGroups,
        update_ticket_groups:            update_ticket_groups,
        update_user_data:                update_user_data,
        listingFilters:                  listingFilters,
        updateListingFilters:            updateListingFilters
    }
    
    return (
    <Router>
        <div className="App" theme={brightnessTheme} language={language}>
            <div status="off" id="universal-overlay"></div>
            <TicketActionModal allPopulationData={allPopulationData}/>
            <LeftHeader        allPopulationData={allPopulationData}/>
            <div id="top-header-and-main-content-container-direct-container">
                <TopHeader allPopulationData={allPopulationData}/>
                <div id="top-header-space-auxiliary"></div>
                <div id="main-content-container">
                    <div status="on" id="loading-screen">
                        <img alt="menu icon" src="/imgs/general/loading_mew.gif"/>
                    </div>
                    <button onClick={AF.mobile_header_appearence_toggler} id="left-header-mob-opener">
                        <img alt="menu icon" src="/imgs/headers/menu_icon.png"/>
                    </button>
                    <Routes>
                        {userData && allTickets.length ? (
                        <> 
                            <Route path='/ticket_listing'         element={<TicketListing allPopulationData={allPopulationData}/>}/>
                            <Route path='/ticket_view/:ticket_id' element={<TicketView allPopulationData={allPopulationData}/>}/>
                            <Route path='/create_ticket'          element={<CreateTicket allPopulationData={allPopulationData}/>}/>
                            <Route path='/profile'                element={<Profile allPopulationData={allPopulationData}/>}/>
                            <Route path='/help_and_info'          element={<HelpAndInfo language={language}/>}/>
                        </>
                        ) : (
                            <Route path='*' element={<NotAuthorized/>}/>
                        )}
                        <Route path='/login' element={<Login allPopulationData={allPopulationData}/>}/>
                        <Route path='/'      element={<Home/>}/>
                        <Route path='*'      element={<ErrorPage/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    </Router>
    );
}

export default App;