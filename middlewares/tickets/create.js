// Add New Group To Ticket Data Object & Database
const add_new_group_to_ticket_and_to_database = async (ticket_data, new_group_name, GroupModel, user_data) => {
    try {
        let group_provided = await GroupModel.findOne({ name: new_group_name }).select();
        let new_group_id   = null;
        
        if ( group_provided ) { // If New Provided Group Already Exists
            new_group_id = group_provided.id; 
        } else { 
            let last_group = await GroupModel.find().sort({_id:-1}).limit(1);
            new_group_id   = last_group[0].id + 1;

            await new GroupModel({ // Add New Group To Database
                name:         new_group_name,
                id:           new_group_id,
                creator_name: user_data.name,
                creator:      user_data.id,
                tickets:      []
            }).save();
        }

        ticket_data.groups.push(new_group_id);
        ticket_data.groups_names.push(new_group_name);
    } catch (err) { console.log(err); return err; }
}

// Add New Ticket ID To New Group Created Together Within
const update_new_group_with_created_ticket_id = async (GroupModel, new_group_name, ticket_id) => {
    try {
        await GroupModel.updateOne({ name: new_group_name }, { tickets: [ticket_id] });
    } catch (err) { console.log(err); return err; }
}

module.exports = {
    add_new_group_to_ticket_and_to_database: add_new_group_to_ticket_and_to_database,
    update_new_group_with_created_ticket_id: update_new_group_with_created_ticket_id
};