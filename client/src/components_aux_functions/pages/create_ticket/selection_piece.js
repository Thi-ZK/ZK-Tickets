// Responsible To Populate The Options From The Selections - Create Options Map Object To Be Used To Populate The Selections
const generate_options_map_obj = ( usersNamesWithIds ) => {
    let priorities = ["Standard", "Very Low", "Low", "High", "Very High", "Urgent!"];
    let statuses = ["Open", "Blocked", "Homologation", "Concluded"];
    let users_names = Object.values(usersNamesWithIds || {});
    let options_map = {
        "groups": users_names,
        "assigneds": users_names,
        "priority": priorities,
        "status": statuses
    };

    return options_map
}

// Custom Text Inputs Handler - Meant For Updating Visibility Status
const update_custom_text_input_appearence = (event) => {
    let new_custom_text_input_status = (event.target.className === "TC-SP-custom-radio-input") ? "on" : "off";
    document.querySelector(".TC-SP-custom-text-input").setAttribute("status", new_custom_text_input_status);
}

module.exports = {
    generate_options_map_obj: generate_options_map_obj,
    update_custom_text_input_appearence: update_custom_text_input_appearence
};