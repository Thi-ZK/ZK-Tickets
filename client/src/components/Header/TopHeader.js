import React, { useState} from "react";
import axios from '../../api/axios';
import { Link } from "react-router-dom";
import texts from '../../languages/Header/TopHeader.json';

const TopHeader = ({ allPopulationData }) => {
    // Aliases For Language Related
    const updateLanguage   = allPopulationData.updateLanguage;
    const language         = allPopulationData.language;
    const language_buttons = document.querySelectorAll("#TH-languages-direct-container button");

    // Aliases For User Related
    const userData       = allPopulationData.userData;
    const updateUserData = allPopulationData.updateUserData;

    // Meant For Dark / Bright Theme
    const [currentBrightnessTheme, setNewBrightnessTheme] = useState("dark");

    // Switch The Current Brightness
    const switch_brightness = () => {
        let theme = (currentBrightnessTheme === "dark") ? "bright" : "dark";
        setNewBrightnessTheme(theme);
        document.querySelector(".App").setAttribute("theme", theme);
    }

    // Destroy Session
    let destroy_session = () => {
        axios.get('/login/logout')
        .then(() => { updateUserData(undefined); }); // Cleaning existing user data
    }

    // Update Language
    const update_language = (ev, lang) => {
        for (let i = 0; i < language_buttons.length; i++) {
            language_buttons[i].setAttribute("status", "off");
        }

        ev.target.setAttribute("status", "on");
        updateLanguage(lang);
    }
    
    return (
    <header id="top-header-container" css-marker="TH">
        <div id="TH-login-and-brightness-direct-container">
            <img alt="logout icon" src={ userData ? "/imgs/headers/logout.png" : "/imgs/headers/login.png"}/> 
            <Link to="/login" onClick={ userData ? destroy_session : undefined }>
                <p>{ userData ? texts.logout[language] : texts.login[language] }</p>
            </Link> 
            <div id="TH-brightness-theme-direct-container">
                <img alt="brightness-theme"
                    src={ currentBrightnessTheme === "dark" ? "/imgs/headers/bright_sun.png" : "/imgs/headers/dark_sun.png"}
                />
                <span onClick={switch_brightness}>
                    {texts[currentBrightnessTheme === "dark" ? "bright" : "dark"][language]}
                </span>
            </div>
      </div>
      <div id="TH-languages-direct-container">
            <div className="TH-language-direct-container">
                <img src="./imgs/general/country_flag_icons/spain.png"/>
                <button onClick={(ev) => update_language(ev, 'spanish')}>Español</button>
            </div>
            <div className="TH-language-direct-container">
                <img src="./imgs/general/country_flag_icons/germany.png"/>
                <button onClick={(ev) => update_language(ev, 'german')}>Deutsch</button>
            </div>
            <div className="TH-language-direct-container">
                <img src="./imgs/general/country_flag_icons/usa.png"/>
                <button status="on" onClick={(ev) => update_language(ev, 'english')}>English</button>
            </div>
            <div className="TH-language-direct-container">
                <img src="./imgs/general/country_flag_icons/brazil.png"/>
                <button onClick={(ev) => update_language(ev, 'portuguese')}>Português</button>
            </div>
        </div>
    </header>
    )
}
  
export default TopHeader;