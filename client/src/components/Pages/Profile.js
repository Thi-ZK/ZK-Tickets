import React from 'react';
import texts from '../../languages/Pages/Profile.json';

function Profile({ allPopulationData }) {
    // Aliases
    const userData   = allPopulationData.userData;
    const language   = allPopulationData.language;
    const allTickets = allPopulationData.allTickets;
    
    const total_linked_tickets = allTickets.filter((ticket) => {
        return ticket.related_users.includes(userData.id) ? ticket : undefined;
    }).length;

    return (
    <div id="profile-main-container">
        <div id="profile-main-container-centrelizer">
            <div id="profile-title-container">
                <h1>{texts.profile[language]}</h1>
            </div>
            <div id='profile-info-main-container'>
                <div id='profile-name-and-picture-direct-container'>
                    <div id='profile-picture-direct-container'>
                        <img alt='user' src='/imgs/home/honeybaby.jpg'/>
                    </div>
                    <div id='profile-name-and-related-info-direct-container'>
                        <div id='profile-name-and-title-direct-container'>
                            <h3 id='profile-person-name'>{userData.name}</h3>
                            <p id='profile-job-title'>{userData.profession}</p>
                        </div>
                        <div id='profile-infos-options-direct-container'>
                            <p>{texts.total_linked_tickets[language]}: <span>{total_linked_tickets}</span></p>
                        </div>
                    </div>
                </div>
                <div id='profile-section-splitter-and-option-choice-container'>
                    <div id='profile-section-choices-direct-container'>
                        <p>{texts.about[language]}</p>
                        <p style={{fontWeight: "normal"}}>{texts.preferences[language]}</p>
                    </div>
                    <div className='profile-long-line-splitter'></div>
                </div>
                <div id='profile-person-info-container'>
                    <div className='profile-person-info-direct-container'>
                        <p className='profile-person-key-info'>{texts.user_id[language]}</p>
                        <p>#{userData.id}</p>
                    </div>
                    <div className='profile-person-info-direct-container'>
                        <p className='profile-person-key-info'>{texts.name[language]}</p>
                        <p>{userData.name}</p>
                    </div>
                    <div className='profile-person-info-direct-container'>
                        <p className='profile-person-key-info'>Email</p>
                        <p>{userData.email}</p>
                    </div>
                    <div className='profile-person-info-direct-container'>
                        <p className='profile-person-key-info'>{texts.user_power[language]}</p>
                        <p>{userData.user_power === 4 ? userData.user_power + " - Admin (Max)" : userData.user_power}</p>
                    </div>
                    <div className='profile-person-info-direct-container'>
                        <p className='profile-person-key-info'>{texts.phone_number[language]}</p>
                        <p>{userData.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile;