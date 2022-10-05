import React, { useState, useEffect } from "react";

import texts from '../../languages/Pages/HelpAndInfo.json';

function HelpAndInfo ({ language }) {
    // Meant For Smooth Appearence Effect Of Component Rendering
    const [helpAndInfoContainerStatus, updateHelpAndInfoContainerStatus] = useState("off");

    useEffect(() => {
        updateHelpAndInfoContainerStatus("on");
    }, []);

    return (
    <div id="help-and-info-container" css-marker="HAI">
        <div status={helpAndInfoContainerStatus} id="HAI-container-centrelizer">
            <div id="HAI-title-direct-container">
                <h1>{texts.help_and_informations[language]}</h1>
            </div>
            <div id='HAI-contact-email-container'>
                <p id='HAI-title'>{texts.have_question_or_need_help[language]}</p>
                <div id='HAI-contact-email-direct-container'>
                    <p>{texts.contact_email_below[language]}</p>
                    <a href='emailto:alyx.graham102@gmail.com' id='HAI-contact-email'>alyx.graham102@gmail.com</a>
                </div>
                <p>{texts.alternatively[language]}</p>
            </div>
        </div>
    </div>
    )
}

export default HelpAndInfo;