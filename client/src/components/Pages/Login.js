import React, { useState } from 'react';
import axios from '../../api/axios';
import texts from '../../languages/Pages/Login.json';
import AF from '../../components_aux_functions/pages/login.js'; // Aux Functions

function Home({ allPopulationData }) {
    // Aliases For Population Data
    const update_all_tickets        = allPopulationData.update_all_tickets;
    const updateUserData            = allPopulationData.updateUserData;
    const update_user_names_and_ids = allPopulationData.update_user_names_and_ids;
    const userData                  = allPopulationData.userData;
    const language                  = allPopulationData.language;

    // Login Function. The Request To /login/auth Returns The User Data If Successful
    const attemptLogin = (event) => {
        event.target.disabled = true; // prevent user from clicking many times and submit tons of requests.
        event.preventDefault();

        let email = AF.get_email();
        let password = AF.get_password();
        
        if (!email || !password) {
            set_error_message_appearence("on", "what_is_your_plan"); // Text Matches Language File
            event.target.disabled = false;
            return;
        }
        
        AF.set_loading_icon_appearence("on");

        axios.post('/login/auth', {email: email, password: password}).then(( response ) => {
            event.target.disabled = false;
            AF.set_loading_icon_appearence("off");
            
            if (response.data._id) { // If User Logged In Successfully
                update_all_tickets();
                updateUserData(response.data);
                update_user_names_and_ids();
                set_error_message_appearence("off", "");
                AF.vanish_login_form();
                AF.clean_pass_and_email_inputs();
            } else {
                set_error_message_appearence("on", response.data);
            }
        });
    }

    // Meant For Displaying Or Hiding Error Message (Status Can Be "on" Or "off")
    const [errorMessage, updateErrorMessage] = useState("none");
    const set_error_message_appearence = ( status, message ) => {
        document.querySelector("#login-modal-error-display-container").setAttribute("status", status);
        if ( message ) { updateErrorMessage(message); }
    }

    return (
    <div style={{backgroundImage: 'url(/imgs/home/home.jpg)'}} id='home-main-container'>
        <div id='login-modal-centralizer'>
            <form id='login-modal-direct-container' className={userData ? "logged-in" : "logged-out"}>
                <div id='login-modal-title-container'>
                    <p>{texts.sign_in[language]}</p>
                </div>
                <div id='login-modal-inputs-container'>
                    <div className='login-modal-inputs-direct-container'>
                        <input
                            onFocus={() => {return set_error_message_appearence("off")}}
                            id='login-modal-email'
                            placeholder='Email'
                            autoComplete="on" 
                            required>
                        </input>
                    </div>
                    <div className='login-modal-inputs-direct-container'>
                        <input 
                            onFocus={() => {return set_error_message_appearence("off")}}
                            id='login-modal-password'
                            type="password"
                            placeholder={texts.password[language]}
                            autoComplete="on"
                            required>
                        </input>
                    </div>
                </div>
                <div id='login-modal-submit-button-container'>
                    <button type="submit" onClick={attemptLogin}>{texts.login_button[language]}</button>
                </div>
                <div id='login-modal-forgot-password-container'>
                    <button onClick={(event) => AF.prevent_default(event)}>{texts.forgot_password[language]}</button>
                </div>
                <div>
                    <div id='login-modal-loading-gif' status="off">
                        <img alt='user' src='/imgs/login/loading.gif'/>
                    </div>
                    <div id='login-modal-error-display-container' status='off'>
                        <p>{texts[errorMessage][language]}</p>
                    </div>
                </div>
                <div id='login-modal-new-account-request-container'>
                    <button onClick={(event) => AF.prevent_default(event)}>{texts.have_no_account_yet[language]} <span>{texts.ask_one[language]}</span></button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Home;