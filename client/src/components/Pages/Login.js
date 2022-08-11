import React, { useState } from 'react';
import axios               from '../../api/axios';
import texts               from '../../languages/Pages/Login.json';
import AF                  from '../../components_aux_functions/pages/login.js'; // Aux Functions

function Home({ allPopulationData }) {
    // Aliases For Population Data
    const update_all_tickets        = allPopulationData.update_all_tickets;
    const update_user_data          = allPopulationData.update_user_data;
    const update_user_names_and_ids = allPopulationData.update_user_names_and_ids;
    const update_ticket_groups      = allPopulationData.update_ticket_groups;
    const userData                  = allPopulationData.userData;
    const language                  = allPopulationData.language;

    // Login Function. The Request To /login/auth Returns The User Data If Successful
    const attempt_login = (event) => {
        set_error_message_appearence("off");
        event.target.disabled = true; // Prevent User From Clicking Many Times And Submit Tons Of Requests
        event.preventDefault();

        let email    = AF.get_email();
        let password = AF.get_password();
        
        if ( !email || !password ) {
            set_error_message_appearence("on", "what_is_your_plan"); // Text Matches Language File
            event.target.disabled = false;
            return;
        }
        
        AF.set_loading_icon_appearence("on");

        axios.post('/login/auth', {email: email, password: password}).then(( res ) => {console.log(res.data);
            event.target.disabled = false;
            AF.set_loading_icon_appearence("off");
            
            if ( res.data.success ) { // If User Logged In Successfully
                update_all_tickets();
                update_user_data(true);
                update_user_names_and_ids();
                update_ticket_groups();
                set_error_message_appearence("off", "");
                AF.vanish_login_form();
                AF.clean_pass_and_email_inputs();
            } else {
                set_error_message_appearence("on", res.data.error);
            }
        });
    }

    // Meant For Displaying Or Hiding Error Message ("on" Or "off") (State Used Here Due To Language Dynamicity Need)
    const [errorMessage, updateErrorMessage] = useState("none");
    
    const set_error_message_appearence = ( status, message ) => {
        document.querySelector("#LOG-error-display-direct-container").setAttribute("status", status);
        if ( message ) { updateErrorMessage(message); }
    }

    return (
    <div style={{backgroundImage: 'url(/imgs/login/planet_background.jpg)'}} id='login-container' css-marmker="LOG">
        <div id='LOG-centralizer'>
            <form id='LOG-form-container' login-status={userData ? "logged-in" : "logged-out"}>
                <div id='LOG-title-direct-container'>
                    <p>{texts.sign_in[language]}</p>
                </div>
                <div id='LOG-inputs-container'>
                    <div className='LOG-inputs-direct-container'>
                        <input
                            onFocus={() => {return set_error_message_appearence("off")}}
                            id='LOG-email'
                            placeholder='Email'
                            autoComplete="on" 
                            required>
                        </input>
                    </div>
                    <div className='LOG-inputs-direct-container'>
                        <input 
                            onFocus={() => {return set_error_message_appearence("off")}}
                            id='LOG-password'
                            type="password"
                            placeholder={texts.password[language]}
                            autoComplete="on"
                            required>
                        </input>
                    </div>
                </div>
                <div id='LOG-submit-button-direct-container'>
                    <button type="submit" onClick={attempt_login}>{texts.login_button[language]}</button>
                </div>
                <div id='LOG-forgot-password-button-direct-container'>
                    <button onClick={(event) => AF.prevent_default(event)}>{texts.forgot_password[language]}</button>
                </div>
                <div>
                    <div id='LOG-loading-gif-direct-container' status="off">
                        <img alt='user' src='/imgs/general/loading_mew.gif'/>
                    </div>
                    <div id='LOG-error-display-direct-container' status='off'>
                        <p>{texts[errorMessage][language]}</p>
                    </div>
                </div>
                <div id='LOG-new-account-request-button-direct-container'>
                    <button onClick={(event) => AF.prevent_default(event)}>{texts.have_no_account_yet[language]} <span>{texts.ask_one[language]}</span></button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Home;