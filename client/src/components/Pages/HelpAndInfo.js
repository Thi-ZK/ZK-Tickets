import React from 'react';
import texts from '../../languages/Pages/HelpAndInfo.json';

function HelpAndInfo ({ language }) {
  return (
    <div id="help-and-info-main-container">
        <div id="help-and-info-main-container-centrelizer">
            <div id="help-and-info-title-container">
                <h1>{texts.help_and_informations[language]}</h1>
            </div>
            <div id='help-and-info-contact-email-container'>
                <p id='help-and-info-tite'>{texts.have_question_or_need_help[language]}</p>
                <div id='help-and-info-email-direct-container'>
                    <p>{texts.contact_email_below[language]}</p>
                    <a href='emailto:alyx.graham102@gmail.com' id='help-and-info-main-contact-email'>alyx.graham102@gmail.com</a>
                </div>
                <p>{texts.alternatively[language]}</p>
            </div>
        </div>
    </div>
  )
}

export default HelpAndInfo;