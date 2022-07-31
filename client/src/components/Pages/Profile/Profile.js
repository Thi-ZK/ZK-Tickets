import React, { useState } from 'react';
import texts from '../../../languages/Pages/Profile.json';
import Switch from '../../IndependentPieces/Switch.js';
import Preferences from './Preferences';
import UserInfo from './UserInfo';
import AF from '../../../components_aux_functions/pages/profile/profile.js'; // Aux Functions

function Profile({ allPopulationData }) {
    // Aliases For Language & Population Data
    const userData   = allPopulationData.userData;
    const language   = allPopulationData.language;
    const allTickets = allPopulationData.allTickets;
    const update_user_data = allPopulationData.update_user_data;

    // State Declaration For Which Main Content To Be Displayed 
    const [currentDisplayedContent, updateDisplayedContent] = useState("user_info");

    // Updates Displayed Content State & Sets <p> Attributes For Styles
    const switch_displayed_content = (event) => {
        AF.set_content_display_p_elems_status(event.target);
        updateDisplayedContent(event.target.getAttribute("which_content"));
    }

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
                        <p status="on" which_content="user_info" onClick={switch_displayed_content}>{texts.about[language]}</p>
                        <p status="off" which_content="preferences" onClick={switch_displayed_content}>{texts.preferences[language]}</p>
                    </div>
                    <div className='PFL-long-line-splitter'></div>
                </div>
                <Switch currentDisplayedContent={currentDisplayedContent}>
                    <UserInfo switch_case="user_info" texts={texts} userData={userData} language={language}/>
                    <Preferences switch_case="preferences" userData={userData} update_user_data={update_user_data}/>
                </Switch>
            </div>
        </div>
    </div>
  )
}

export default Profile;