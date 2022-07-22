// Responsible To Populate The Options From The Selections
// Create Options Map Object To Be Used To Populate The Selections
const generate_options_map_obj = ( usersNamesWithIds ) => {
    let priorities = ["Standard", "Very Low", "Low", "High", "Very High", "Urgent!"];
    let statuses = ["Open", "Blocked", "Homologation", "Concluded"];
    let users_names = Object.values(usersNamesWithIds || {});
    let options_map = {
        "Group": users_names,
        "Assigneds": users_names,
        "Priority": priorities,
        "Status": statuses
    };

    return options_map
}

module.exports = {
    generate_options_map_obj: generate_options_map_obj
};