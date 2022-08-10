import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from './api/axios';

import Login from './components/Pages/Login';
import TicketView from './components/Pages/TicketView/TicketView';
import TicketListing from './components/Pages/TicketListing';
import ErrorPage from './components/Pages/ErrorPage';
import Profile from './components/Pages/Profile/Profile';
import HelpAndInfo from './components/Pages/HelpAndInfo';
import CreateTicket from './components/Pages/CreateTicket/CreateTicket';
import NotAuthorized from './components/Pages/NotAuthorized';
import LeftHeader from './components/Header/LeftHeader/LeftHeader';
import TopHeader from './components/Header/TopHeader';
import TicketActionModal from './components/Ticket/TicketActionModal';

function App() {
    // Ticket Action Modal State
    const [ticketActionModalSettings, updateTicketActionModalSettings] = useState({
        is_action_redundant: false,
        text_thema: "none",
        status: "closed",
        ticket_id: "none",
        which_action: "none"
    });

    // For Language State
    const [language, updateLanguage] = useState("english");

    // Dark / Bright Theme
    const [currentBrightnessTheme, updateBrightnessTheme] = useState("bright");

    // All Tickets State Set
    const [allTickets, updateTickets] = useState([]);
    const update_all_tickets = async () => {
        axios.get('/tickets/get/all').then((tickets) => {console.log(tickets.data);
            if ( tickets.data.success ) { updateTickets(tickets.data.data); }
        })
    }
    
    // User Data State Set
    const [userData, updateUserData] = useState(undefined); // Is An Object
    const update_user_data = (should_update_lang_and_brightness_theme) => {
        axios.get('/users/get/single/current').then((res) => {console.log(res.data);
            if ( res.data.success ) {
                updateUserData(res.data.data);

                if ( should_update_lang_and_brightness_theme ) {
                    updateBrightnessTheme(res.data.data.preferred_brightness_theme);
                    updateLanguage(res.data.data.preferred_language);
                }
            }
        })
    }

    // All Users Names & IDs State Set. This Is Necessary For Create Ticket (List Of Users To Attach) 
    const [usersNamesWithIds, updateUsers] = useState({});
    const update_user_names_and_ids = () => {
        axios.get('/users/get/piece/all_users').then((users) => { updateUsers(users.data.data); console.log(users.data); })
    }

    // All Users Names & IDs State Set. This Is Necessary For Create Ticket (List Of Users To Attach) 
    const [ticketGroups, updateTicketGroups] = useState({});
    const update_ticket_groups = () => {
        axios.get('/ticket_groups/get/piece/all_groups').then((ticket_groups) => { updateTicketGroups(ticket_groups.data.data); console.log(ticket_groups.data); })
    }
 
    // Loading All Tickets & User Data For First Time User Opens The Application Logged In (Or Refresh Page)
    useEffect(() => {
        update_all_tickets();
        update_user_data(true); // true To Update Lang & Brightness Theme With User Preferences
        update_user_names_and_ids();
        update_ticket_groups();
    }, []);

    // Utils Variable To Reduce Props Number. Contains Many Population Related Functions & States (The Ones That Used In Many Contexts)
    const allPopulationData = {
        allTickets: allTickets,
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
            <TicketActionModal allPopulationData={allPopulationData}></TicketActionModal>
            <LeftHeader language={language}></LeftHeader>
            <div className="main-content-container">
                <TopHeader allPopulationData={allPopulationData}></TopHeader>
                <div id="top-header-space-auxiliary"></div>
                <Routes>
                    {userData && allTickets.length ? (
                    <> 
                    <Route path='/ticket_listing/:specific_listing' element={<TicketListing allPopulationData={allPopulationData}/>}/>
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