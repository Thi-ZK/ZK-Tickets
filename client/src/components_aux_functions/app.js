// Generates And Returns A Function That Updates The Ticket Groups Names With IDs (Gets Fresh Data From DB)
const generate_update_ticket_groups_function = (updateTicketGroups, axios) => {
    return () => {
        axios.get('/ticket_groups/get/piece/all_groups').then((ticket_groups) => { console.log(ticket_groups.data);
            updateTicketGroups(ticket_groups.data.data);
        })
    }
}

// Generates And Returns A Function That Updates The Users Names With IDs (Gets Fresh Data From DB)
const generate_update_user_names_and_ids_function = (updateUsers, axios) => {
    return () => {
        axios.get('/users/get/piece/all_users').then((users) => { console.log(users.data);
            updateUsers(users.data.data);
        })
    }
}

// Generates And Returns A Function That Updates The Authenticated User Data (Gets Fresh Data From DB)
const generate_update_user_data_function = (updateUserData, updateBrightnessTheme, updateLanguage, axios) => {
    return (should_update_lang_and_brightness_theme) => {
        axios.get('/users/get/single/current').then((res) => { console.log(res.data);
            window.__is_user_data_call_finished = true;

            if ( res.data.success ) {
                updateUserData(res.data.data);
    
                if ( should_update_lang_and_brightness_theme ) {
                    updateBrightnessTheme(res.data.data.preferred_brightness_theme);
                    updateLanguage(res.data.data.preferred_language);
                }
            }

            if ( window.__are_tickets_call_finished ) {
                set_loading_screen_status("off");
            }
        })
    }
}

// Generates And Returns A Function That Updates All Tickets Data (Gets Fresh Data From DB)
const generate_update_all_tickets_function = (updateTickets, axios) => {
    return () => {
        axios.get('/tickets/get/all').then((tickets) => { console.log(tickets.data);
            window.__are_tickets_call_finished = true;

            if ( tickets.data.success ) {
                updateTickets(tickets.data.data);
            }

            if ( window.__is_user_data_call_finished ) {
                set_loading_screen_status("off");
            }
        })
    }
}

// Handler For The Opening & Closing Of Header In Mobile
const mobile_header_appearence_toggler = () => {
    let left_header = document.querySelector("#left-header-container");

    if (left_header.getAttribute("mob-status") === "closed") {
        left_header.setAttribute("mob-status", "open");
    } else {
        left_header.setAttribute("mob-status", "closed");
    }
}

// Set Loading Screen Status (On or Off)
const set_loading_screen_status = (status) => {
    let loading_screen_elem = document.querySelector("#loading-screen");

    if ( loading_screen_elem ) {
        loading_screen_elem.setAttribute("status", status);
    }
}

module.exports = {
    generate_update_ticket_groups_function:      generate_update_ticket_groups_function,
    generate_update_user_names_and_ids_function: generate_update_user_names_and_ids_function,
    generate_update_user_data_function:          generate_update_user_data_function,
    generate_update_all_tickets_function:        generate_update_all_tickets_function,
    mobile_header_appearence_toggler:            mobile_header_appearence_toggler,
    set_loading_screen_status:                   set_loading_screen_status        
};