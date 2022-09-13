import React from 'react'

function UserInfo ({ language, userData, texts }) {
    return (
    <div id='PFL-person-info-container' css-marker="PI">
        <div   className='PFL-PI-person-info-direct-container'>
            <p className='PFL-PI-person-key-info'>{texts.user_id[language]}</p>
            <p>#{userData.id}</p>
        </div>
        <div   className='PFL-PI-person-info-direct-container'>
            <p className='PFL-PI-person-key-info'>{texts.name[language]}</p>
            <p>{userData.name}</p>
        </div>
        <div   className='PFL-PI-person-info-direct-container'>
            <p className='PFL-PI-person-key-info'>Email</p>
            <p>{userData.email}</p>
        </div>
        <div   className='PFL-PI-person-info-direct-container'>
            <p className='PFL-PI-person-key-info'>{texts.user_power[language]}</p>
            <p>{userData.user_power === 4 ? userData.user_power + " - Admin (Max)" : userData.user_power}</p>
        </div>
        <div   className='PFL-PI-person-info-direct-container'>
            <p className='PFL-PI-person-key-info'>{texts.phone_number[language]}</p>
            <p>{userData.phone}</p>
        </div>
    </div>
    )
}

export default UserInfo