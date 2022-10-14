import React    from "react";
import axios    from '../../api/axios';
import { Link } from "react-router-dom";
import texts    from '../../languages/Header/TopHeader.json';

const TopHeader = ({ all_population_data }) => {
    // Aliases For Language Related
    const updateLanguage   = all_population_data.updateLanguage;
    const language         = all_population_data.language;

    // Aliases For User Related
    const userData               = all_population_data.userData;
    const updateUserData         = all_population_data.updateUserData;
    const brightnessTheme        = all_population_data.brightnessTheme;
    const updateBrightnessTheme  = all_population_data.updateBrightnessTheme;

    // Switch The Current Brightness
    const switch_brightness = () => {
        updateBrightnessTheme((brightnessTheme === "dark") ? "bright" : "dark");
    }

    // Destroy Session
    let destroy_session = () => {
        axios.get('/login/logout').then((res) => { console.log(res.data);
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
                <p>{ userData ? texts.logout[language] : texts.login[language]}</p>
            </Link> 
            <div id="TH-brightness-theme-direct-container">
                <img alt="brightness-theme" src={ brightnessTheme === "dark" ? "/imgs/headers/bright_sun.png" : "/imgs/headers/dark_sun.png"}/>
                <span onClick={switch_brightness}>{texts[brightnessTheme === "dark" ? "bright" : "dark"][language]}</span>
            </div>
            {userData ?
                <div id="TH-logged-in-user-display-direct-container">
                    <img alt="logout icon" src="/imgs/headers/pink_ghost.gif"/> 
                    <Link to="/profile">
                        <p>{texts.user[language]}: <span>{userData.name}</span></p>
                    </Link>
                </div> : <></>
            }
      </div>
      <div id="TH-languages-direct-container">
            <div className="TH-language-direct-container">
                <img    alt="" src="./imgs/general/country_flag_icons/spain.png"/>
                <button status={language === "spanish" ? "active" : "not-active"}    onClick={(ev) => updateLanguage('spanish')}>Español</button>
            </div>
            <div className="TH-language-direct-container">
                <img    alt="" src="./imgs/general/country_flag_icons/germany.png"/>
                <button status={language === "german" ? "active" : "not-active"}     onClick={(ev) => updateLanguage('german')}>Deutsch</button>
            </div>
            <div className="TH-language-direct-container">
                <img    alt="" src="./imgs/general/country_flag_icons/usa.png"/>
                <button status={language === "english" ? "active" : "not-active"}    onClick={(ev) => updateLanguage('english')}>English</button>
            </div>
            <div className="TH-language-direct-container">
                <img    alt="" src="./imgs/general/country_flag_icons/brazil.png"/>
                <button status={language === "portuguese" ? "active" : "not-active"} onClick={(ev) => updateLanguage('portuguese')}>Português</button>
            </div>
        </div>
    </header>
    )
}
  
export default TopHeader;