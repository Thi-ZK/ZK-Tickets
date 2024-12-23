import React, { useState, useEffect } from 'react';

import axios from '../../api/axios';

import texts from '../../languages/Pages/Login.json';
import AF    from '../../components_aux_functions/pages/login.js'; // Aux Functions

function Home({ all_population_data }) {
    // Aliases For Population Data
    const userData = all_population_data.userData;
    const language = all_population_data.language;

    // Meant For Displaying Or Hiding Login Error Message ("on" Or "off") (State Used Here Due To Language Dynamicity Need)
    const [errorMessage, updateErrorMessage] = useState("none");

    // Login Function. The Request To /login/auth Returns The User Data If Successful
    const attempt_login = (event) => {
        AF.set_error_message_appearence("off");
        AF.hide_recovery_password_modal();
        AF.prevent_default_and_disable_login_button(event);

        let email    = AF.get_email();
        let password = AF.get_password();
        
        if ( !email || !password ) {
            AF.set_error_message_appearence("on", updateErrorMessage, "what_is_your_plan"); // Text Matches Language File
            AF.enable_login_button(event);
            
            return;
        }
        
        AF.set_loading_icon_appearence("on");

        axios.post('/login/auth', { email: email, password: password }).then(( res ) => { console.log(res.data);
            AF.enable_login_button(event);
            AF.set_loading_icon_appearence("off");
            
            if ( res.data.success ) {
                AF.load_all_application_to_be_used_data(all_population_data);
                AF.set_error_message_appearence("off");
                AF.vanish_login_form();
                AF.clean_pass_and_email_inputs();
            } else {
                AF.set_error_message_appearence("on", updateErrorMessage, res.data.error);
            }
        });
    }

    // Password Recovery Feedback Message State (State Used Due To Language Dynamicity)
    const [passRecoveryFeedbackMsg, updatePassRecoveryFeedbackMsg] = useState("");

    // Lost Password Handler
    const recover_password = () => {
        let email = AF.get_recovery_password_email();

        if ( !email ) {
            return;
        }

        AF.set_recovery_password_loading_icon_appearence("on");

        axios.post('/login/password_recovery', { email: email }).then(( res ) => { console.log(res.data);
            AF.set_recovery_password_loading_icon_appearence("off");
            AF.clean_recovery_password_input();
            AF.display_recovery_password_submission_feedback(res.data.success, updatePassRecoveryFeedbackMsg);
        });
    }

    // Meant For Smooth Appearence Effect Of Component Rendering
    const [loginContainerStatus, updateLoginContainerStatus] = useState("off");

    useEffect(() => {
        updateLoginContainerStatus("on");
    }, []);

    return (
    <div style={{backgroundImage: 'url(/imgs/general/fantasy_ice_giant.jpg)'}} id='login-container' css-marmker="LOG">
        <div id='LOG-centralizer'>
            <form id='LOG-form-container' login-status={userData ? "logged-in" : "logged-out"} status={loginContainerStatus}>
                <div id='LOG-title-direct-container'>
                    <p>{texts.sign_in[language]}</p>
                </div>
                <div id='LOG-inputs-container'>
                    <div className='LOG-inputs-direct-container'>
                        <input
                            onFocus={() => AF.set_error_message_appearence("off")}
                            id='LOG-email'
                            placeholder='Email'
                            autoComplete="on" 
                            required>
                        </input>
                    </div>
                    <div className='LOG-inputs-direct-container'>
                        <input 
                            onFocus={() => AF.set_error_message_appearence("off")}
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
                    <button onClick={(event) => AF.switch_display_of_recovery_password_modal(event)}>{texts.forgot_password[language]}</button>
                </div>
                <div>
                    <div id='LOG-loading-gif-direct-container' status="off">
                        <img alt='loading mew' src='/imgs/general/loading_mew.gif'/>
                    </div>
                    <div id='LOG-error-display-direct-container' status='off'>
                        <p>{texts[errorMessage][language]}</p>
                    </div>
                    <div id='LOG-password-recovery-modal-direct-container' status="off">
                        <div id='LOG-password-recovery-modal-title-direct-container'>
                            <h4>{texts.recovery_password_title[language]}</h4>
                            <div>
                                <img status="off" id='LOG-password-recovery-modal-loading-icon' alt='loading blue circle' src='/imgs/general/loading_blue_icon.gif'/>
                                <img onClick={recover_password} id='LOG-password-recovery-modal-send-icon' alt='send blue icon' src='/imgs/general/send_icon.png'/>
                            </div>
                        </div>
                        <p status="off" id='LOG-password-recovery-modal-feedback-message'>{texts[passRecoveryFeedbackMsg][language]}</p>
                        <input required placeholder={texts.type_email_here[language]}></input>
                    </div>
                </div>
                <div id='LOG-new-account-request-link-direct-container'>
                        {texts.have_no_account_yet[language]}
                        <a href="mailto:alyx.graham102@gmail.com"><span>{texts.ask_one[language]}</span></a>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Home;