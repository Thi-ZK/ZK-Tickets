import React from 'react'
import axios from '../../../api/axios';
// import texts from '../../languages/Pages/Login.json';

function Preferences ({ userData }) {
    // Aliases
    const preferred_language = userData.preferred_language;
    const preferred_brightness_theme = userData.preferred_brightness_theme;

    // Meant For Updating Preferred Language
    const updated_preferred_language = (event) => {
        let chosen_language = event.target.getAttribute("language");
        console.log(chosen_language);
        // axios.post('users/update/current/preferred_language', { preferred_language: chosen_language }).then(( response ) => {
            
        //     if (response.data._id);
        // });
    }

    return (
    <div id="PFL-preferences-container" css-marker="PRE">
        <div className="PFL-PRE-content-line-container">
            <div id='PFL-PRE-languages-direct-container'>
                <h3>Preferred Language</h3>
                <div className='PFL-PRE-language-direct-container'>
                    <input onChange={updated_preferred_language} className="PFL-PRE-language-input" type="radio" name="pfl-language" language="spanish" id="PFL-PRE-spanish" defaultChecked={preferred_language === "spanish"}/>
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-spanish">Español</label>
                    <img alt="spain flag icon" src="./imgs/general/country_flag_icons/spain.png"/>
                </div>
                <div className='PFL-PRE-language-direct-container'>
                    <input onChange={updated_preferred_language} className="PFL-PRE-language-input" type="radio" name="pfl-language" language="german" id="PFL-PRE-german" defaultChecked={preferred_language === "german"}/>
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-german">Deutsch</label>
                    <img alt="germany flag icon" src="./imgs/general/country_flag_icons/germany.png"/>
                </div>
                <div className='PFL-PRE-language-direct-container'>
                    <input onChange={updated_preferred_language} className="PFL-PRE-language-input" type="radio" name="pfl-language" language="english" id="PFL-PRE-english" defaultChecked={preferred_language === "english"}/>
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-english">English</label>
                    <img alt="usa flag icon" src="./imgs/general/country_flag_icons/usa.png"/>
                </div>
                <div className='PFL-PRE-language-direct-container'>
                    <input onChange={updated_preferred_language} className="PFL-PRE-language-input" type="radio" name="pfl-language" language="portuguese" id="PFL-PRE-portuguese" defaultChecked={preferred_language === "portuguese"}/>
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-portuguese">Português</label>
                    <img alt="brazil flag icon" src="./imgs/general/country_flag_icons/brazil.png"/>
                </div>
            </div>
            <div id='PFL-PRE-brightness-themes-direct-container'>
                <h3>Preferred Brightness Theme</h3>
                <div className='PFL-PRE-brightness-theme-direct-container'>
                    <input className="PFL-PRE-brightness-theme-input" type="radio" name="pfl-brightness-theme" id="PFL-PRE-bright" defaultChecked={preferred_brightness_theme === "bright"}/>
                    <label className="PFL-PRE-brightness-theme-label" htmlFor="PFL-PRE-bright">Bright</label>
                    <img alt="bright sun icon" src="./imgs/headers/bright_sun.png"/>
                </div>
                <div className='PFL-PRE-brightness-theme-direct-container'>
                    <input className="PFL-PRE-brightness-theme-input" type="radio" name="pfl-brightness-theme" id="PFL-PRE-dark" defaultChecked={preferred_brightness_theme === "dark"}/>
                    <label className="PFL-PRE-brightness-theme-label" htmlFor="PFL-PRE-dark">Dark</label>
                    <img alt="dark sun icon" src="./imgs/headers/dark_sun.png"/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Preferences;