import React, { useState } from 'react';
import texts from '../../../languages/Pages/Profile.json';
import Switch from '../../IndependentPieces/Switch.js';
import Preferences from './Preferences';
import UserInfo from './UserInfo';

function Profile({ allPopulationData }) {
    // Aliases For Language & Population Data
    const userData   = allPopulationData.userData;
    const language   = allPopulationData.language;
    const allTickets = allPopulationData.allTickets;

    // State Declaration For Which Main Content To Be Displayed 
    const [currentDisplayedContent, updateDisplayedContent] = useState("user_info");

    // Total Linked Tickets Number
    const total_linked_tickets = allTickets.filter((ticket) => {
        return ticket.related_users.includes(userData.id) ? ticket : undefined;
    }).length;

    return (
    <div id="profile-container" css-marker="PFL">
        <div id="PFL-container-centrelizer">
            <div id="PFL-title-direct-container">
                <h1>{texts.profile[language]}</h1>
            </div>
            <div id='PFL-all-content-info-container'>
                <div id='PFL-name-and-picture-container'>
                    <div id='PFL-picture-direct-container'>
                        <img alt='user' src='/imgs/ticket/dahyun_pic.jpg'/>
                    </div>
                    <div id='PFL-name-and-related-info-container'>
                        <div id='PFL-name-and-title-direct-container'>
                            <h3 id='PFL-person-name'>{userData.name}</h3>
                            <p id='PFL-job-title'>{userData.profession}</p>
                        </div>
                        <div id='PFL-total-linked-tickets-direct-container'>
                            <p>{texts.total_linked_tickets[language]}: <span>{total_linked_tickets}</span></p>
                        </div>
                    </div>
                </div>
                <div id='PFL-section-splitter-and-option-choice-container'>
                    <div id='PFL-section-choices-direct-container'>
                        <p>{texts.about[language]}</p>
                        <p style={{fontWeight: "normal"}}>{texts.preferences[language]}</p>
                    </div>
                    <div className='PFL-long-line-splitter'></div>
                </div>
                <Switch currentDisplayedContent={currentDisplayedContent}>
                    <UserInfo switch_case="user_info" texts={texts} userData={userData} language={language}/>
                    <p switch_case="positive">+</p>
                </Switch>
            </div>
        </div>
    </div>
  )
}

export default Profile;