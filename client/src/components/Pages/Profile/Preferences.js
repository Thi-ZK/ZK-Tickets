import React from 'react'

function Preferences () {
    return (
    <div id="PFL-preferences-container" css-marker="PRE">
        <div className="PFL-PRE-content-line-container">
            <div id='PFL-PRE-languages-direct-container'>
                <h3>Preferred Language</h3>
                <div className='PFL-PRE-language-direct-container'>
                    <input className="PFL-PRE-language-input" type="radio" name="pfl-language" id="PFL-PRE-spanish" />
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-spanish">Español</label>
                    <img src="./imgs/general/country_flag_icons/spain.png"/>
                </div>
                <div className='PFL-PRE-language-direct-container'>
                    <input className="PFL-PRE-language-input" type="radio" name="pfl-language" id="PFL-PRE-german" />
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-german">Deutsch</label>
                    <img src="./imgs/general/country_flag_icons/germany.png"/>
                </div>
                <div className='PFL-PRE-language-direct-container'>
                    <input className="PFL-PRE-language-input" type="radio" name="pfl-language" id="PFL-PRE-english" />
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-english">English</label>
                    <img src="./imgs/general/country_flag_icons/usa.png"/>
                </div>
                <div className='PFL-PRE-language-direct-container'>
                    <input className="PFL-PRE-language-input" type="radio" name="pfl-language" id="PFL-PRE-portuguese" />
                    <label className="PFL-PRE-language-label" htmlFor="PFL-PRE-portuguese">Português</label>
                    <img src="./imgs/general/country_flag_icons/brazil.png"/>
                </div>
            </div>
            <div id='PFL-PRE-brightness-themes-direct-container'>
                <h3>Preferred Brightness Theme</h3>
                <div className='PFL-PRE-brightness-theme-direct-container'>
                    <input className="PFL-PRE-brightness-theme-input" type="radio" name="pfl-brightness-theme" id="PFL-PRE-bright" />
                    <label className="PFL-PRE-brightness-theme-label" htmlFor="PFL-PRE-bright">Bright</label>
                    <img src="./imgs/headers/bright_sun.png"/>
                </div>
                <div className='PFL-PRE-brightness-theme-direct-container'>
                    <input className="PFL-PRE-brightness-theme-input" type="radio" name="pfl-brightness-theme" id="PFL-PRE-dark" />
                    <label className="PFL-PRE-brightness-theme-label" htmlFor="PFL-PRE-dark">Dark</label>
                    <img src="./imgs/headers/dark_sun.png"/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Preferences;