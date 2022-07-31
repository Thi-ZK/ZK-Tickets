import React from "react";
import axios from '../../api/axios';
import { Link } from "react-router-dom";
import texts from '../../languages/Header/TopHeader.json';

const TopHeader = ({ allPopulationData }) => {
    // Aliases For Language Related
    const updateLanguage   = allPopulationData.updateLanguage;
    const language         = allPopulationData.language;

    // Aliases For User Related
    const userData               = allPopulationData.userData;
    const updateUserData         = allPopulationData.updateUserData;
    const currentBrightnessTheme = allPopulationData.currentBrightnessTheme;
    const updateBrightnessTheme  = allPopulationData.updateBrightnessTheme;

    // Switch The Current Brightness
    const switch_brightness = () => {
        let theme = (currentBrightnessTheme === "dark") ? "bright" : "dark";
        updateBrightnessTheme(theme);
    }

    // Destroy Session
    let destroy_session = () => {
        axios.get('/login/logout').then(() => { 
            updateUserData(undefined); // Cleaning Existing User Data
            updateLanguage("english");
            updateBrightnessTheme("bright"); 
        });
    }
    
    return (
    <header id="top-header-container" css-marker="TH">
        <div id="TH-login-and-brightness-direct-container">
            <img alt="logout icon" src={ userData ? "/imgs/headers/logout.png" : "/imgs/headers/login.png"}/> 
            <Link to="/login" onClick={ userData ? destroy_session : undefined }>
                <p>{ userData ? texts.logout[language] : texts.login[language] }</p>
            </Link> 
            <div id="TH-brightness-theme-direct-container">
                <img alt="brightness-theme"src={ currentBrightnessTheme === "dark" ? "/imgs/headers/bright_sun.png" : "/imgs/headers/dark_sun.png"}/>
                <span onClick={switch_brightness}>{texts[currentBrightnessTheme === "dark" ? "bright" : "dark"][language]}</span>
            </div>
      </div>
      <div id="TH-languages-direct-container">
            <div className="TH-language-direct-container">
                <img alt="" src="./imgs/general/country_flag_icons/spain.png"/>
                <button status={language === "spanish" ? "on" : "off"} onClick={(ev) => updateLanguage('spanish')}>Español</button>
            </div>
            <div className="TH-language-direct-container">
                <img alt="" src="./imgs/general/country_flag_icons/germany.png"/>
                <button status={language === "german" ? "on" : "off"} onClick={(ev) => updateLanguage('german')}>Deutsch</button>
            </div>
            <div className="TH-language-direct-container">
                <img alt="" src="./imgs/general/country_flag_icons/usa.png"/>
                <button status={language === "english" ? "on" : "off"} onClick={(ev) => updateLanguage('english')}>English</button>
            </div>
            <div className="TH-language-direct-container">
                <img alt="" src="./imgs/general/country_flag_icons/brazil.png"/>
                <button status={language === "portuguese" ? "on" : "off"} onClick={(ev) => updateLanguage('portuguese')}>Português</button>
            </div>
        </div>
    </header>
    )
}
  
export default TopHeader;