import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect }             from "react";
import axios                                      from './api/axios';

import AF    from './components_aux_functions/app';

import Login             from './components/Pages/Login';
import TicketView        from './components/Pages/TicketView/TicketView';
import TicketListing     from './components/Pages/TicketListing';
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
        is_action_redundant: false,
        text_thema:   "none",
        status:       "closed",
        ticket_id:    "none",
        which_action: "none"
    });

    // For Language State
    const [language, updateLanguage] = useState("english");

    // Dark / Bright Theme
    const [currentBrightnessTheme, updateBrightnessTheme] = useState("bright");

    // All Tickets State Set
    const [allTickets, updateTickets] = useState([]);
    const update_all_tickets          = AF.generate_update_all_tickets_function(updateTickets, axios);
    
    // User Data State Set
    const [userData, updateUserData] = useState(null); // Is An Object
    const update_user_data           = AF.generate_update_user_data_function(updateUserData, updateBrightnessTheme, updateLanguage, axios);

    // All Users Names With IDs State Set
    const [usersNamesWithIds, updateUsers] = useState({});
    const update_user_names_and_ids        = AF.generate_update_user_names_and_ids_function(updateUsers, axios);

    // All Ticket Groups Names With IDs State Set
    const [ticketGroups, updateTicketGroups] = useState({});
    const update_ticket_groups               = AF.generate_update_ticket_groups_function(updateTicketGroups, axios);
 
    // Loading All Tickets & User Data For First Time User Opens The Application Logged In (Or Refresh Page F5)
    useEffect(() => {
        update_all_tickets();
        update_user_data(true); // true To Update Lang & Brightness Theme With User Preferences When Called
        update_user_names_and_ids();
        update_ticket_groups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Utils Variable To Reduce Props Number. Contains Many Population Related Functions & States
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
        currentBrightnessTheme:          currentBrightnessTheme,
        updateBrightnessTheme:           updateBrightnessTheme,
        ticketGroups:                    ticketGroups,
        update_ticket_groups:            update_ticket_groups,
        update_user_data:                update_user_data
    }
    
    return (
    <Router>
        <div className="App" theme={currentBrightnessTheme} language={language}>
            <div status="off" id="universal-overlay"></div>
            <TicketActionModal allPopulationData={allPopulationData}/>
            <LeftHeader language={language} allTickets={allTickets} ticketGroups={ticketGroups}/>
            <div id="main-content-container" eye-helper="MAIN CONTENT CONTAINER">
                <TopHeader allPopulationData={allPopulationData}/>
                <div id="top-header-space-auxiliary"></div>
                <button id="left-header-mob-opener"><img alt="menu icon" src="/imgs/headers/menu_icon.png"/></button>
                <Routes>
                    {userData && allTickets.length ? (
                    <> 
                    <Route path='/ticket_listing/:listing/:nested_listing' element={<TicketListing allPopulationData={allPopulationData}/>}/>
                    <Route path='/ticket_listing/:listing' element={<TicketListing allPopulationData={allPopulationData}/>}/>
                    <Route path='/ticket_view/:ticket_id' element={<TicketView allPopulationData={allPopulationData}/>}/>
                    <Route path='/create_ticket' element={<CreateTicket allPopulationData={allPopulationData}/>}/>
                    <Route path='/profile' element={<Profile allPopulationData={allPopulationData}/>}/>
                    <Route path='/help_and_info' element={<HelpAndInfo language={language}/>}/>
                    </>
                    ) : (
                    <>
                    <Route path='*' element={<NotAuthorized/>}/>
                    </>
                    )}
                    <Route path='/login' element={<Login allPopulationData={allPopulationData}/>}/>
                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </div>
        </div>
    </Router>
    );
}

export default App;